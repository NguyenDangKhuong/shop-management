#!/bin/bash
# Oracle Cloud ARM Instance Auto-Retry Script
# Keeps trying to create a VM.Standard.A1.Flex instance until capacity is available.
# Usage: ./scripts/oci-arm-retry.sh
# Stop:  Ctrl+C or kill the process

# ===== CONFIGURATION =====
COMPARTMENT_OCID="ocid1.tenancy.oc1..aaaaaaaae25fk4izn44cxtycyd253sdciqwgncpsbdjw6vmdmhx4qmzp5ycq"
SUBNET_OCID="ocid1.subnet.oc1.ap-singapore-1.aaaaaaaa3it4zkfv3dnr3xb5kii27s4jr2yktkohba7oce6hj7rhwryam3jq"
AVAILABILITY_DOMAIN=""  # Will be auto-detected
DISPLAY_NAME="heyyolo-free-vps"
SHAPE="VM.Standard.A1.Flex"
OCPUS=4
MEMORY_GB=24
BOOT_VOLUME_GB=200
SSH_PUBLIC_KEY="ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDOMHScq3VHqBszdiYdTdX5nCHhhFWfZYcr9jDqT20nbV8DPECNNJ1tD0vA5UnOjXHS5TnI/bj/ONmJ2aPrekR1mGdf3EiNkTb51yVWLhsJe7bQTLXIv4kwioxV+1YaHgt6nSkTC0Kw0g28D+L0Ps2/KCNhlSLLkNFQ8k7aovByOeLqbL3g4rxMJ9EbgJSyj5uZgXjMfs++U/kewWQgFnCTkNQPpzdiAvHl9u/mgA4B0Oy8gaVuUPNaNyhwkASiWVQ0sQJ9cEEIDyoS6yQpgfjgSSuuiV2SuBkBmcBXiXuacibgikf0stQrkVOc9U5pFFgYW0/IXWKxCzoaI5Qd0Bj3 ssh-key-2026-02-20"

# Image OCID will be set after lookup
IMAGE_OCID=""

# Retry interval in seconds (60 = every 1 minute)
RETRY_INTERVAL=60
# ==========================

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}🚀 Oracle ARM Instance Auto-Retry Script${NC}"
echo -e "${CYAN}===========================================${NC}"
echo ""

# Step 0: Look up Availability Domain if not set
if [ -z "$AVAILABILITY_DOMAIN" ]; then
    echo -e "${YELLOW}🔍 Looking up Availability Domain...${NC}"
    AVAILABILITY_DOMAIN=$(oci iam availability-domain list \
        --query 'data[0].name' \
        --raw-output 2>/dev/null)
    if [ -z "$AVAILABILITY_DOMAIN" ] || [ "$AVAILABILITY_DOMAIN" = "None" ]; then
        echo -e "${RED}❌ Could not find availability domain.${NC}"
        exit 1
    fi
    echo -e "${GREEN}✅ Found AD: ${AVAILABILITY_DOMAIN}${NC}"
fi

# Step 1: Look up Image OCID if not set
if [ -z "$IMAGE_OCID" ]; then
    echo -e "${YELLOW}🔍 Looking up Ubuntu 24.04 Minimal aarch64 image OCID...${NC}"
    IMAGE_OCID=$(oci compute image list \
        --compartment-id "$COMPARTMENT_OCID" \
        --shape "$SHAPE" \
        --operating-system "Canonical Ubuntu" \
        --operating-system-version "24.04 Minimal aarch64" \
        --sort-by TIMECREATED \
        --sort-order DESC \
        --limit 1 \
        --query 'data[0].id' \
        --raw-output 2>/dev/null)
    
    if [ -z "$IMAGE_OCID" ] || [ "$IMAGE_OCID" = "None" ]; then
        echo -e "${RED}❌ Could not find image. Trying broader search...${NC}"
        IMAGE_OCID=$(oci compute image list \
            --compartment-id "$COMPARTMENT_OCID" \
            --shape "$SHAPE" \
            --operating-system "Canonical Ubuntu" \
            --sort-by TIMECREATED \
            --sort-order DESC \
            --limit 1 \
            --query 'data[0].id' \
            --raw-output 2>/dev/null)
    fi

    if [ -z "$IMAGE_OCID" ] || [ "$IMAGE_OCID" = "None" ]; then
        echo -e "${RED}❌ Could not find any Ubuntu image for ARM. Please set IMAGE_OCID manually.${NC}"
        exit 1
    fi
    echo -e "${GREEN}✅ Found image: ${IMAGE_OCID}${NC}"
fi

echo ""
echo -e "${CYAN}Configuration:${NC}"
echo -e "  Shape:    ${SHAPE} (${OCPUS} OCPU, ${MEMORY_GB} GB RAM)"
echo -e "  Image:    ${IMAGE_OCID}"
echo -e "  Storage:  ${BOOT_VOLUME_GB} GB"
echo -e "  Interval: every ${RETRY_INTERVAL}s"
echo ""

ATTEMPT=0

while true; do
    ATTEMPT=$((ATTEMPT + 1))
    TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
    
    echo -e "${YELLOW}[${TIMESTAMP}] Attempt #${ATTEMPT} — Creating instance...${NC}"
    
    RESULT=$(oci compute instance launch \
        --compartment-id "$COMPARTMENT_OCID" \
        --availability-domain "$AVAILABILITY_DOMAIN" \
        --shape "$SHAPE" \
        --shape-config "{\"ocpus\": ${OCPUS}, \"memoryInGBs\": ${MEMORY_GB}}" \
        --subnet-id "$SUBNET_OCID" \
        --image-id "$IMAGE_OCID" \
        --assign-public-ip false \
        --display-name "$DISPLAY_NAME" \
        --boot-volume-size-in-gbs "$BOOT_VOLUME_GB" \
        --metadata "{\"ssh_authorized_keys\": \"${SSH_PUBLIC_KEY}\"}" \
        2>&1)
    
    # Check if successful
    if echo "$RESULT" | grep -q '"lifecycle-state"'; then
        echo ""
        echo -e "${GREEN}🎉🎉🎉 SUCCESS! Instance created! 🎉🎉🎉${NC}"
        echo ""
        
        # Extract instance details
        INSTANCE_ID=$(echo "$RESULT" | python3 -c "import sys,json; print(json.load(sys.stdin)['data']['id'])" 2>/dev/null)
        echo -e "${GREEN}Instance OCID: ${INSTANCE_ID}${NC}"
        echo -e "${GREEN}Check Oracle Console for public IP assignment.${NC}"
        
        # macOS notification
        osascript -e 'display notification "Oracle ARM instance created successfully!" with title "🎉 OCI Instance Ready!" sound name "Glass"' 2>/dev/null
        
        break
    fi
    
    # Check error type
    if echo "$RESULT" | grep -qi "out of capacity\|out of host capacity\|InternalError\|LimitExceeded"; then
        echo -e "${RED}  ❌ Out of capacity. Retrying in ${RETRY_INTERVAL}s...${NC}"
    elif echo "$RESULT" | grep -qi "TooManyRequests"; then
        echo -e "${RED}  ⚠️  Rate limited. Waiting 120s...${NC}"
        sleep 60  # Extra wait for rate limiting
    else
        echo -e "${RED}  ❌ Error: $(echo "$RESULT" | head -5)${NC}"
        echo -e "${RED}  Retrying in ${RETRY_INTERVAL}s...${NC}"
    fi
    
    sleep "$RETRY_INTERVAL"
done

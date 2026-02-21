# Cài OCI CLI trên máy Ubuntu

Script tự động retry tạo máy ARM free trên Oracle Cloud (VM.Standard.A1.Flex).

## 1. Cài OCI CLI

```bash
sudo apt update && sudo apt install -y python3 python3-pip curl
bash -c "$(curl -L https://raw.githubusercontent.com/oracle/oci-cli/master/scripts/install/install.sh)" -- --accept-all-defaults
echo 'export PATH="$HOME/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
oci --version
```

## 2. Cấu hình OCI

```bash
mkdir -p ~/.oci && chmod 700 ~/.oci
```

Copy file `oci-config-backup` vào `~/.oci/config`:

```bash
cp scripts/oci-config-backup ~/.oci/config
```

Copy file `oci_api_key.pem.backup` vào `~/.oci/oci_api_key.pem`:

```bash
cp scripts/oci_api_key.pem.backup ~/.oci/oci_api_key.pem
chmod 600 ~/.oci/config ~/.oci/oci_api_key.pem
```

Kiểm tra:

```bash
oci iam availability-domain list --query 'data[*].name' --output table
```

Nếu ra bảng `OvAi:AP-SINGAPORE-1-AD-1` là OK.

## 3. Chạy script

```bash
chmod +x scripts/oci-arm-retry.sh

# Chạy bằng screen để tắt terminal vẫn chạy tiếp
screen -S oci
bash scripts/oci-arm-retry.sh
# Nhấn Ctrl+A rồi D để thoát screen
# screen -r oci để vào lại xem log
```

Script sẽ retry mỗi 60 giây cho đến khi tạo được máy.

## 4. Sau khi tạo máy thành công

Vào [Oracle Console](https://cloud.oracle.com/) → Compute → Instances → assign Reserved Public IP cho máy.

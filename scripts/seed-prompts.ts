/**
 * Seed script: drop + re-insert shared prompts from PROMPT.md
 * Run: npx ts-node --compiler-options '{"module":"commonjs"}' -r tsconfig-paths/register scripts/seed-prompts.ts
 */
import fs from 'fs'
import mongoose from 'mongoose'
import path from 'path'

// Load .env.local
const envPath = path.resolve(__dirname, '../.env.local')
fs.readFileSync(envPath, 'utf-8').split('\n').forEach(line => {
    const [key, ...vals] = line.split('=')
    if (key && !key.startsWith('#')) process.env[key.trim()] = vals.join('=').trim()
})

const SUB_PROMPT = `You must replace [POSE] and [BACKGROUND] with a new unique combination each time this prompt is called. Never repeat the same combination twice. Choose naturally from these options and feel free to create new variations that match the style.

POSE options: standing straight with arms relaxed at sides, one hand resting on hip, one hand lightly touching collar, both hands adjusting hem of outfit, one hand holding hair behind ear, arms crossed casually under chest, one hand touching the mirror frame leaning slightly, hands clasped in front of waist, one hand on waist one hand relaxed, fingers lightly brushing the fabric at thigh level

BACKGROUND options: grey and white modern Vietnamese bedroom with large glass-door wardrobe closet displaying designer clothes shoes and handbags, minimalist cream toned room with full length mirror and wooden clothing rack, luxury apartment hallway with marble floor and soft wall sconces, bright white studio with large window and sheer curtains with simple floating shelf, modern walk-in closet with LED lit shelves filled with shoes bags and folded clothes, cozy beige bedroom with rattan chair potted plants and natural textures, sleek grey bathroom with large vanity mirror and marble countertop

Pick one POSE and one BACKGROUND randomly and insert them naturally into the main prompt. The result must read as one seamless paragraph with no brackets or placeholder markers remaining.

IMPORTANT: Output ONLY the final completed prompt text. Do not include any thinking, explanation, reasoning, commentary, notes, or additional text. Return nothing but the raw prompt ready to use.`

const BODY_INTEGRITY = 'The model has exactly two arms and two hands at all times — strict anatomical consistency, no extra limbs or duplicate body parts.'
const SLOW_MOTION = 'All movements are slow gentle and deliberate — no sudden fast motions.'
const OUTFIT_COVERAGE = 'CRITICAL RULE — The outfit MUST match reference image 1 exactly in length and coverage. If the top in the reference covers the belly then the video outfit MUST also fully cover the belly and midsection at all times with ZERO skin showing between the top hem and the waistband. NEVER crop shorten or raise the top. NEVER expose the navel or midriff unless the reference image explicitly shows it. This is the highest priority instruction.'
const OUTFIT_DETAILS = 'She must be wearing the identical outfit from reference image 1 preserving every detail including exact color exact pattern exact prints exact fabric texture exact neckline exact sleeve length exact hem length exact pants or skirt length exact fit exact silhouette and all decorative details such as bows ribbons ties buttons lace trim embroidery belts and any accessories as shown in the product photo. Do not alter modify or reinterpret any part of the clothing.'

// === TOP (ÁO) ===
const TOP_COVERAGE = 'CRITICAL RULE — The garment MUST match reference image 1 exactly in every measurement. The neckline opening, sleeve length, and hem position must be identical to the reference photo. NEVER shorten or crop the garment. NEVER change the neckline depth or sleeve style. The garment must drape and fit exactly as shown in the reference. This is the highest priority instruction.'
const TOP_DETAILS = 'She must be wearing the identical garment from reference image 1 preserving every detail including exact color exact pattern exact prints exact fabric texture exact neckline exact collar shape exact sleeve length exact sleeve style exact hem length exact fit and all decorative details such as bows ribbons ties buttons lace trim embroidery and any accessories as shown in the product photo. Do not alter modify or reinterpret any part of the garment.'

// === BOTTOM (QUẦN/VÁY) ===
const BOTTOM_COVERAGE = 'CRITICAL RULE — The garment MUST match reference image 1 exactly in length and fit. If the pants or skirt in the reference reaches the ankle then the video MUST show the same length. NEVER shorten the garment. Keep the waist fit and hem length identical to the reference. This is the highest priority instruction.'
const BOTTOM_DETAILS = 'She must be wearing the identical garment from reference image 1 preserving every detail including exact color exact pattern exact prints exact fabric texture exact waistband style exact leg width exact hem length exact fit exact silhouette and all decorative details such as pockets zippers buttons belt loops pleats slits and any accessories as shown in the product photo. Do not alter modify or reinterpret any part of the garment.'

const FASHION_PROMPTS = [
    {
        title: 'Set áo quần — Mirror selfie che mặt',
        type: 'describe',
        order: 1,
        subPrompt: SUB_PROMPT,
        content: `A highly detailed cinematic video of the fashion model shown in reference image 2. ${OUTFIT_COVERAGE} ${OUTFIT_DETAILS} She has luminous snow-white porcelain skin, Douyin goddess aesthetic, long silky black hair with soft natural waves, wearing stylish feminine thin gold-framed round glasses. She has a slender figure with extremely long slender legs. ${BODY_INTEGRITY} She is standing [POSE] in front of a full-length mirror in a [BACKGROUND]. Soft golden morning sunlight streaming through sheer white curtains creating warm natural light and gentle shadows. ${SLOW_MOTION} She is holding an orange iPhone 17 Pro Max up in front of her face covering her face completely while recording a mirror selfie video so only the phone and her body outfit are visible not her face. The phone camera angle moves naturally closer to show the outfit fabric texture and details then slowly pulls back to reveal her full body silhouette and long legs like a real person filming themselves. She speaks naturally in Vietnamese describing the outfit she is wearing with a warm friendly tone like a real KOL selling fashion on livestream. No text no captions no animals. Ultra-realistic natural handheld phone movement. Shallow depth of field with model in sharp focus. Fashion editorial cinematic color grading`
    },
    {
        title: 'Set áo quần — Tay chạm show vải che mặt',
        type: 'describe',
        order: 2,
        subPrompt: SUB_PROMPT,
        content: `A highly detailed cinematic video of the fashion model shown in reference image 2. ${OUTFIT_COVERAGE} ${OUTFIT_DETAILS} She has luminous snow-white porcelain skin, Douyin goddess aesthetic, long silky black hair with soft natural waves, wearing stylish feminine thin gold-framed round glasses. She has a slender figure with extremely long slender legs. ${BODY_INTEGRITY} She is standing [POSE] in front of a full-length mirror in a [BACKGROUND]. Soft golden morning sunlight streaming through sheer white curtains creating warm natural light. ${SLOW_MOTION} She is holding an orange iPhone 17 Pro Max up in front of her face covering her face completely while recording herself so only the phone and her body outfit are visible not her face. Her free hand gently touches the fabric at her waist showing the smooth quality material then slides down to lightly adjust the hem showing the fit and texture of the outfit. She pinches the fabric slightly between her fingers highlighting the softness and drape of the material. She speaks naturally in Vietnamese without greeting or saying hello just directly describing the fabric quality and how the outfit fits her body with a confident casual tone. No text no captions no animals. Ultra-realistic natural handheld phone movement. Shallow depth of field. Fashion editorial cinematic color grading`
    },
    {
        title: 'Set áo quần — Nghiêng nhẹ show dáng che mặt',
        type: 'describe',
        order: 3,
        subPrompt: SUB_PROMPT,
        content: `A highly detailed cinematic video of the fashion model shown in reference image 2. ${OUTFIT_COVERAGE} ${OUTFIT_DETAILS} She has luminous snow-white porcelain skin, Douyin goddess aesthetic, long silky black hair with soft natural waves, wearing stylish feminine thin gold-framed round glasses. She has a slender figure with extremely long slender legs. ${BODY_INTEGRITY} She is standing [POSE] in front of a full-length mirror in a [BACKGROUND]. Soft golden morning sunlight streaming through sheer white curtains creating warm natural light and gentle shadows. ${SLOW_MOTION} She is holding an orange iPhone 17 Pro Max up in front of her face covering her face completely while recording so only the phone and her body outfit are visible not her face. She subtly shifts her weight and sways her body gently to the left showing the outfit from a slight side angle then back to center then gently to the right revealing the other side. Her free hand rests naturally on her hip then moves to touch her collar. She speaks naturally in Vietnamese without greeting or saying hello just casually commenting on the outfit details and how it looks from different angles with a sweet relaxed voice. No text no captions no animals. Ultra-realistic natural handheld phone movement. Shallow depth of field with model in sharp focus. Fashion editorial cinematic color grading`
    }
]

// === TOP (ÁO) PROMPTS ===
const TOP_PROMPTS = [
    {
        title: 'Áo — Mirror selfie che mặt',
        type: 'describe',
        order: 4,
        subPrompt: SUB_PROMPT,
        content: `A highly detailed cinematic fashion video of the model shown in reference image 2. ${TOP_COVERAGE} ${TOP_DETAILS} She has a Douyin goddess aesthetic, long silky black hair with soft natural waves, wearing stylish feminine thin gold-framed round glasses. ${BODY_INTEGRITY} She is standing [POSE] in front of a full-length mirror in a [BACKGROUND]. Soft golden morning sunlight streaming through sheer white curtains creating warm natural light and gentle shadows. ${SLOW_MOTION} She is holding an orange iPhone 17 Pro Max up in front of her face covering her face completely while recording a mirror selfie video so only the phone and the outfit are visible not her face. The phone camera angle moves naturally closer to show the garment fabric texture neckline details sleeve design collar shape and fit then slowly pulls back to reveal the full outfit styling. She speaks naturally in Vietnamese describing the garment she is wearing focusing on the fabric quality neckline design sleeve details and overall fit with a warm friendly tone like a real fashion KOL on livestream. No text no captions no animals. Ultra-realistic natural handheld phone movement. Shallow depth of field with outfit in sharp focus. Fashion editorial cinematic color grading`
    },
    {
        title: 'Áo — Tay chạm show vải che mặt',
        type: 'describe',
        order: 5,
        subPrompt: SUB_PROMPT,
        content: `A highly detailed cinematic fashion video of the model shown in reference image 2. ${TOP_COVERAGE} ${TOP_DETAILS} She has a Douyin goddess aesthetic, long silky black hair with soft natural waves, wearing stylish feminine thin gold-framed round glasses. ${BODY_INTEGRITY} She is standing [POSE] in front of a full-length mirror in a [BACKGROUND]. Soft golden morning sunlight streaming through sheer white curtains creating warm natural light. ${SLOW_MOTION} She is holding an orange iPhone 17 Pro Max up in front of her face covering her face completely while recording herself so only the phone and the garment are visible not her face. Her free hand gently touches the collar showing the neckline shape and stitching quality then slides to the sleeve pinching the fabric slightly between her fingers highlighting the softness and texture of the material then moves to adjust the hem of the garment showing how it drapes naturally. She speaks naturally in Vietnamese without greeting or saying hello just directly describing the fabric quality the collar design and how the garment fits with a confident casual tone. No text no captions no animals. Ultra-realistic natural handheld phone movement. Shallow depth of field. Fashion editorial cinematic color grading`
    },
    {
        title: 'Áo — Nghiêng nhẹ show dáng che mặt',
        type: 'describe',
        order: 6,
        subPrompt: SUB_PROMPT,
        content: `A highly detailed cinematic fashion video of the model shown in reference image 2. ${TOP_COVERAGE} ${TOP_DETAILS} She has a Douyin goddess aesthetic, long silky black hair with soft natural waves, wearing stylish feminine thin gold-framed round glasses. ${BODY_INTEGRITY} She is standing [POSE] in front of a full-length mirror in a [BACKGROUND]. Soft golden morning sunlight streaming through sheer white curtains creating warm natural light and gentle shadows. ${SLOW_MOTION} She is holding an orange iPhone 17 Pro Max up in front of her face covering her face completely while recording so only the phone and the outfit are visible not her face. She subtly shifts her weight and turns gently to the left showing the garment from a slight side angle revealing the sleeve shape and seam details then back to center then gently to the right showing the back silhouette of the garment. Her free hand rests naturally then moves to adjust the collar. She speaks naturally in Vietnamese without greeting or saying hello just casually commenting on the garment design the sleeve details and how it looks from different angles with a sweet relaxed voice. No text no captions no animals. Ultra-realistic natural handheld phone movement. Shallow depth of field with outfit in sharp focus. Fashion editorial cinematic color grading`
    }
]

// === BOTTOM (QUẦN/VÁY) PROMPTS ===
const BOTTOM_PROMPTS = [
    {
        title: 'Quần/Váy — Mirror selfie che mặt',
        type: 'describe',
        order: 7,
        subPrompt: SUB_PROMPT,
        content: `A highly detailed cinematic video of the fashion model shown in reference image 2. ${BOTTOM_COVERAGE} ${BOTTOM_DETAILS} She has luminous snow-white porcelain skin, Douyin goddess aesthetic, long silky black hair with soft natural waves, wearing stylish feminine thin gold-framed round glasses. She has a slender figure with extremely long slender legs. ${BODY_INTEGRITY} She is standing [POSE] in front of a full-length mirror in a [BACKGROUND]. Soft golden morning sunlight streaming through sheer white curtains creating warm natural light and gentle shadows. ${SLOW_MOTION} She is holding an orange iPhone 17 Pro Max up in front of her face covering her face completely while recording a mirror selfie video so only the phone and her body are visible not her face. The phone camera angle moves naturally to frame her lower body showing the waist fit the leg silhouette the fabric drape and the hem length then slowly tilts down to show the full length of the pants or skirt and her long legs then pulls back to reveal her full body. She speaks naturally in Vietnamese describing the bottom she is wearing focusing on the fit the fabric quality the waist design and how it flatters her legs with a warm friendly tone like a real KOL selling fashion on livestream. No text no captions no animals. Ultra-realistic natural handheld phone movement. Shallow depth of field with model in sharp focus. Fashion editorial cinematic color grading`
    },
    {
        title: 'Quần/Váy — Tay chạm show vải che mặt',
        type: 'describe',
        order: 8,
        subPrompt: SUB_PROMPT,
        content: `A highly detailed cinematic video of the fashion model shown in reference image 2. ${BOTTOM_COVERAGE} ${BOTTOM_DETAILS} She has luminous snow-white porcelain skin, Douyin goddess aesthetic, long silky black hair with soft natural waves, wearing stylish feminine thin gold-framed round glasses. She has a slender figure with extremely long slender legs. ${BODY_INTEGRITY} She is standing [POSE] in front of a full-length mirror in a [BACKGROUND]. Soft golden morning sunlight streaming through sheer white curtains creating warm natural light. ${SLOW_MOTION} She is holding an orange iPhone 17 Pro Max up in front of her face covering her face completely while recording herself so only the phone and her body are visible not her face. Her free hand gently touches the fabric at her thigh showing the smooth quality material then slides down along the leg to show the fit and drape of the fabric. She pinches the fabric slightly at the knee area highlighting the softness and texture then moves her hand to the waistband showing the fit and closure details. She speaks naturally in Vietnamese without greeting or saying hello just directly describing the fabric quality the waist fit and how the bottom drapes on her legs with a confident casual tone. No text no captions no animals. Ultra-realistic natural handheld phone movement. Shallow depth of field. Fashion editorial cinematic color grading`
    },
    {
        title: 'Quần/Váy — Nghiêng nhẹ show dáng che mặt',
        type: 'describe',
        order: 9,
        subPrompt: SUB_PROMPT,
        content: `A highly detailed cinematic video of the fashion model shown in reference image 2. ${BOTTOM_COVERAGE} ${BOTTOM_DETAILS} She has luminous snow-white porcelain skin, Douyin goddess aesthetic, long silky black hair with soft natural waves, wearing stylish feminine thin gold-framed round glasses. She has a slender figure with extremely long slender legs. ${BODY_INTEGRITY} She is standing [POSE] in front of a full-length mirror in a [BACKGROUND]. Soft golden morning sunlight streaming through sheer white curtains creating warm natural light and gentle shadows. ${SLOW_MOTION} She is holding an orange iPhone 17 Pro Max up in front of her face covering her face completely while recording so only the phone and her body are visible not her face. She subtly shifts her weight and sways her hips gently to the left showing the bottom from a slight side angle revealing the leg line and side seam then back to center then gently to the right showing the back pocket details and rear silhouette. Her free hand rests naturally on her thigh then moves to smooth the fabric along the hip. She speaks naturally in Vietnamese without greeting or saying hello just casually commenting on the bottom fit the leg shape and how it looks from different angles with a sweet relaxed voice. No text no captions no animals. Ultra-realistic natural handheld phone movement. Shallow depth of field with model in sharp focus. Fashion editorial cinematic color grading`
    }
]

const PRODUCT_FIDELITY = 'CRITICAL RULE — The lamp shown in the video MUST be identical to reference image 1 in every detail. Preserve the exact shape exact proportions exact stand design exact base shape exact arm angle exact material finish and exact color of the product. The lamp must have the same matte black metal stand with round weighted base adjustable ball joint arm and circular projection head as shown in reference image 1. Do NOT alter resize reshape or reinterpret any part of the product. This is the highest priority instruction.'

const LAMP_SUB_PROMPT = `You must replace [SETTING] and [ACTION] with a new unique combination each time this prompt is called. Never repeat the same combination twice. Choose naturally from these options and feel free to create new variations that match the style.

SETTING options: minimalist bedside table in a modern dark-toned bedroom, wooden shelf in a cozy studio apartment with exposed brick wall, sleek white desk in a clean aesthetic workspace, marble console table in a luxury apartment hallway, low coffee table in a dimly lit living room with soft cushions, floating shelf mounted on a dark grey feature wall, round side table next to a plush velvet armchair

ACTION options: a hand slowly reaches in and turns the lamp on revealing the warm sunset glow gradually filling the wall, the camera slowly orbits around the lamp showing the build quality from multiple angles, a hand gently adjusts the lamp angle tilting the projection beam to a new position on the wall, the camera starts on the warm sunset circle projected on the wall then slowly pulls back to reveal the lamp, fingers lightly trace along the metal stand showing the smooth matte finish, a hand carefully places the lamp on the surface and plugs in the cord then the warm light blooms on the wall, the camera moves from a top-down view slowly descending to eye level revealing the full sunset projection

Pick one SETTING and one ACTION randomly and insert them naturally into the main prompt. The result must read as one seamless paragraph with no brackets or placeholder markers remaining.

IMPORTANT: Output ONLY the final completed prompt text. Do not include any thinking, explanation, reasoning, commentary, notes, or additional text. Return nothing but the raw prompt ready to use.`

const LAMP_SLOW = 'All camera movements and hand movements are slow smooth and deliberate — no sudden fast motions.'

const LAMP_PROMPTS = [
    {
        title: 'Đèn Hoàng Hôn 1 — Bật đèn reveal ánh sáng',
        type: 'describe',
        order: 10,
        subPrompt: LAMP_SUB_PROMPT,
        content: `A highly detailed cinematic product video showcasing the sunset projection lamp from reference image 1. ${PRODUCT_FIDELITY} The lamp is placed on [SETTING]. The room is dimly lit with soft ambient shadows. ${LAMP_SLOW} [ACTION]. The warm golden-orange sunset circle is projected on the wall behind creating a perfectly round gradient that transitions from deep amber at the center to soft warm orange at the edges exactly like a real sunset. The light casts a beautiful warm atmospheric glow across the entire room highlighting the product and its surroundings. The camera captures the lamp from a low angle emphasizing its sleek compact design and the premium matte black metal finish of the stand and base. Close-up shots show the quality of the metal material the smooth ball joint mechanism and the clean power cord. A voice speaks naturally in Vietnamese describing the lamp its warm cozy light effect how it transforms any room into a romantic sunset atmosphere and its quality build. No text no captions no animals. Ultra-realistic cinematic lighting with warm color temperature. Shallow depth of field with product in sharp focus. Premium product photography color grading`
    },
    {
        title: 'Đèn Hoàng Hôn 2 — Close-up chất liệu & chi tiết',
        type: 'describe',
        order: 11,
        subPrompt: LAMP_SUB_PROMPT,
        content: `A highly detailed cinematic product video showcasing the sunset projection lamp from reference image 1. ${PRODUCT_FIDELITY} The lamp is placed on [SETTING]. ${LAMP_SLOW} The camera starts with an extreme close-up of the matte black metal base showing the smooth premium finish and weighted stability then slowly glides up along the adjustable metal arm revealing the ball joint connector and the circular projection head. [ACTION]. The warm sunset projection fills the wall behind with a perfectly round golden-orange gradient circle creating dreamy atmospheric lighting. The camera pulls back smoothly to show the full lamp in context with the warm glow illuminating the surrounding furniture and decor. A hand gently tilts the lamp head to a new angle and the sunset projection moves smoothly across the wall demonstrating the adjustable design. A voice speaks naturally in Vietnamese highlighting the premium metal build quality the adjustable angle feature the warm relaxing light and how this lamp is perfect for bedroom decoration or creating a cozy atmosphere for photos and videos. No text no captions no animals. Ultra-realistic macro lens detail shots transitioning to wider establishing shots. Warm cinematic color grading with rich amber tones`
    },
    {
        title: 'Đèn Hoàng Hôn 3 — Không gian & mood lighting',
        type: 'describe',
        order: 12,
        subPrompt: LAMP_SUB_PROMPT,
        content: `A highly detailed cinematic product video showcasing the sunset projection lamp from reference image 1. ${PRODUCT_FIDELITY} The video opens on a dark room with [SETTING]. ${LAMP_SLOW} [ACTION]. The warm golden-orange sunset circle blooms beautifully on the wall creating a stunning focal point that transforms the entire room atmosphere from cold and plain to warm romantic and inviting. The camera slowly pans across the room showing how the sunset glow wraps around objects casting long warm shadows and creating depth. The projection is a perfectly round gradient transitioning from deep rich amber in the center to soft warm orange at the edges. The camera returns to the lamp showing its compact sleek silhouette against the warm backlight emphasizing the premium matte black metal finish the stable round base and the minimalist modern design. A hand enters frame and gently rotates the lamp projection head showing the light beam moving smoothly across the wall ceiling and corner of the room. A voice speaks naturally in Vietnamese describing how this one small lamp completely changes the mood of any space perfect for relaxing reading taking aesthetic photos or creating a romantic evening atmosphere. No text no captions no animals. Ultra-realistic cinematic warm lighting. Shallow depth of field. Lifestyle product videography color grading with rich golden tones`
    }
]

const PROMPTS = [...FASHION_PROMPTS, ...TOP_PROMPTS, ...BOTTOM_PROMPTS, ...LAMP_PROMPTS]

async function seed() {
    const username = process.env.NEXT_PUBLIC_MONGO_USER_NAME_DEV
    const password = process.env.NEXT_PUBLIC_MONGO_PASSWORD_DEV
    const cluster = process.env.NEXT_PUBLIC_MONGO_CLUSTER_URL
    const dbName = process.env.NEXT_PUBLIC_MONGO_DB_NAME

    if (!username || !password || !cluster) {
        console.error('❌ Missing MONGO env vars in .env.local')
        process.exit(1)
    }

    const mongoUrl = `mongodb+srv://${username}:${password}@${cluster}/?retryWrites=true&w=majority`
    await mongoose.connect(mongoUrl, { dbName } as any)
    console.log('✅ Connected to MongoDB')

    const PromptModel = (await import('../src/models/Prompt')).default

    // Upsert: match by title → update content if exists, insert if new
    // This preserves _id for existing prompts (important for AutoFlow references)
    let inserted = 0
    let updated = 0
    for (const prompt of PROMPTS) {
        const existing = await PromptModel.findOne({
            title: prompt.title,
            $or: [{ accountId: { $exists: false } }, { accountId: null }, { accountId: '' }]
        })
        if (existing) {
            await PromptModel.findByIdAndUpdate(existing._id, {
                content: prompt.content,
                subPrompt: prompt.subPrompt,
                type: prompt.type,
                order: prompt.order
            })
            updated++
        } else {
            await PromptModel.create(prompt)
            inserted++
        }
    }
    console.log(`✅ Seeded: ${inserted} new, ${updated} updated (${PROMPTS.length} total)`)

    await mongoose.disconnect()
    console.log('✅ Done')
}

seed().catch(err => {
    console.error('❌ Seed failed:', err)
    process.exit(1)
})

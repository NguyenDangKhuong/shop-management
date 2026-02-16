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

const OUTFIT = 'preserving every detail including exact color exact pattern exact prints exact fabric texture exact neckline exact sleeve length exact hem length exact pants or skirt length exact fit exact silhouette and all decorative details such as bows ribbons ties buttons lace trim embroidery belts and any accessories as shown in the product photo. Do not alter modify or reinterpret any part of the clothing.'

const PROMPTS = [
    {
        title: 'Prompt 1 — Mirror selfie cam gần xa',
        type: 'describe',
        order: 1,
        subPrompt: SUB_PROMPT,
        content: `A highly detailed cinematic video of the fashion model shown in reference image 2. She has luminous snow-white porcelain skin, Douyin goddess aesthetic, long silky black hair with soft natural waves, wearing stylish feminine thin gold-framed round glasses. She has an elegant hourglass figure with extremely long slender legs. She must be wearing the identical outfit from reference image 1 ${OUTFIT} She is standing [POSE] in front of a full-length mirror in a [BACKGROUND]. Soft golden morning sunlight streaming through sheer white curtains creating warm natural light and gentle shadows. She is holding an orange iPhone 17 Pro Max recording a mirror selfie video. The phone camera angle moves naturally closer to show the outfit fabric texture and details then slowly pulls back to reveal her full body silhouette and long legs like a real person filming themselves. She speaks naturally in Vietnamese describing the outfit she is wearing with a warm friendly tone like a real KOL selling fashion on livestream. No text no captions no animals. Ultra-realistic natural handheld phone movement. Shallow depth of field with model in sharp focus. Fashion editorial cinematic color grading`
    },
    {
        title: 'Prompt 2 — Tay chạm show vải (không chào)',
        type: 'describe',
        order: 2,
        subPrompt: SUB_PROMPT,
        content: `A highly detailed cinematic video of the fashion model shown in reference image 2. She has luminous snow-white porcelain skin, Douyin goddess aesthetic, long silky black hair with soft natural waves, wearing stylish feminine thin gold-framed round glasses. She has an elegant hourglass figure with extremely long slender legs. She must be wearing the identical outfit from reference image 1 ${OUTFIT} She is standing [POSE] in front of a full-length mirror in a [BACKGROUND]. Soft golden morning sunlight streaming through sheer white curtains creating warm natural light. She is holding an orange iPhone 17 Pro Max in one hand recording herself. Her free hand gently touches the fabric at her waist showing the smooth quality material then slides down to lightly adjust the hem showing the fit and texture of the outfit. She pinches the fabric slightly between her fingers highlighting the softness and drape of the material. She speaks naturally in Vietnamese without greeting or saying hello just directly describing the fabric quality and how the outfit fits her body with a confident casual tone. No text no captions no animals. Ultra-realistic natural handheld phone movement. Shallow depth of field. Fashion editorial cinematic color grading`
    },
    {
        title: 'Prompt 3 — Nghiêng nhẹ show dáng (không chào)',
        type: 'describe',
        order: 3,
        subPrompt: SUB_PROMPT,
        content: `A highly detailed cinematic video of the fashion model shown in reference image 2. She has luminous snow-white porcelain skin, Douyin goddess aesthetic, long silky black hair with soft natural waves, wearing stylish feminine thin gold-framed round glasses. She has an elegant hourglass figure with extremely long slender legs. She must be wearing the identical outfit from reference image 1 ${OUTFIT} She is standing [POSE] in front of a full-length mirror in a [BACKGROUND]. Soft golden morning sunlight streaming through sheer white curtains creating warm natural light and gentle shadows. She is holding an orange iPhone 17 Pro Max recording. She subtly shifts her weight and sways her body gently to the left showing the outfit from a slight side angle then back to center then gently to the right revealing the other side. One hand rests naturally on her hip then moves to touch her collar. She speaks naturally in Vietnamese without greeting or saying hello just casually commenting on the outfit details and how it looks from different angles with a sweet relaxed voice. No text no captions no animals. Ultra-realistic natural handheld phone movement. Shallow depth of field with model in sharp focus. Fashion editorial cinematic color grading`
    },
    {
        title: 'Prompt 4 — Mirror selfie che mặt, có thoại',
        type: 'describe',
        order: 4,
        subPrompt: SUB_PROMPT,
        content: `A highly detailed cinematic video of the fashion model shown in reference image 2. She has luminous snow-white porcelain skin, Douyin goddess aesthetic, long silky black hair with soft natural waves, wearing stylish feminine thin gold-framed round glasses. She has an elegant hourglass figure with extremely long slender legs. She must be wearing the identical outfit from reference image 1 ${OUTFIT} She is standing [POSE] in front of a full-length mirror in a [BACKGROUND]. Soft golden morning sunlight streaming through sheer white curtains creating warm natural light and gentle shadows. She is holding an orange iPhone 17 Pro Max up in front of her face covering her face completely while recording a mirror selfie video so only the phone and her body outfit are visible not her face. The phone camera angle moves naturally closer to show the outfit fabric texture and details then slowly pulls back to reveal her full body silhouette and long legs like a real person filming themselves. She speaks naturally in Vietnamese describing the outfit she is wearing with a warm friendly tone like a real KOL selling fashion on livestream. No text no captions no animals. Ultra-realistic natural handheld phone movement. Shallow depth of field with model in sharp focus. Fashion editorial cinematic color grading`
    },
    {
        title: 'Prompt 5 — Tay chạm show vải che mặt, có thoại',
        type: 'describe',
        order: 5,
        subPrompt: SUB_PROMPT,
        content: `A highly detailed cinematic video of the fashion model shown in reference image 2. She has luminous snow-white porcelain skin, Douyin goddess aesthetic, long silky black hair with soft natural waves, wearing stylish feminine thin gold-framed round glasses. She has an elegant hourglass figure with extremely long slender legs. She must be wearing the identical outfit from reference image 1 ${OUTFIT} She is standing [POSE] in front of a full-length mirror in a [BACKGROUND]. Soft golden morning sunlight streaming through sheer white curtains creating warm natural light. She is holding an orange iPhone 17 Pro Max up in front of her face covering her face completely while recording herself so only the phone and her body outfit are visible not her face. Her free hand gently touches the fabric at her waist showing the smooth quality material then slides down to lightly adjust the hem showing the fit and texture of the outfit. She pinches the fabric slightly between her fingers highlighting the softness and drape of the material. She speaks naturally in Vietnamese without greeting or saying hello just directly describing the fabric quality and how the outfit fits her body with a confident casual tone. No text no captions no animals. Ultra-realistic natural handheld phone movement. Shallow depth of field. Fashion editorial cinematic color grading`
    },
    {
        title: 'Prompt 6 — Nghiêng nhẹ show dáng che mặt, có thoại',
        type: 'describe',
        order: 6,
        subPrompt: SUB_PROMPT,
        content: `A highly detailed cinematic video of the fashion model shown in reference image 2. She has luminous snow-white porcelain skin, Douyin goddess aesthetic, long silky black hair with soft natural waves, wearing stylish feminine thin gold-framed round glasses. She has an elegant hourglass figure with extremely long slender legs. She must be wearing the identical outfit from reference image 1 ${OUTFIT} She is standing [POSE] in front of a full-length mirror in a [BACKGROUND]. Soft golden morning sunlight streaming through sheer white curtains creating warm natural light and gentle shadows. She is holding an orange iPhone 17 Pro Max up in front of her face covering her face completely while recording so only the phone and her body outfit are visible not her face. She subtly shifts her weight and sways her body gently to the left showing the outfit from a slight side angle then back to center then gently to the right revealing the other side. Her free hand rests naturally on her hip then moves to touch her collar. She speaks naturally in Vietnamese without greeting or saying hello just casually commenting on the outfit details and how it looks from different angles with a sweet relaxed voice. No text no captions no animals. Ultra-realistic natural handheld phone movement. Shallow depth of field with model in sharp focus. Fashion editorial cinematic color grading`
    }
]

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

    // Drop old shared prompts (those without accountId) and re-seed
    await PromptModel.deleteMany({ $or: [{ accountId: { $exists: false } }, { accountId: null }, { accountId: '' }] })
    console.log('🗑️  Cleared old shared prompts')

    await PromptModel.insertMany(PROMPTS)
    console.log(`✅ Seeded ${PROMPTS.length} shared prompts`)

    await mongoose.disconnect()
    console.log('✅ Done')
}

seed().catch(err => {
    console.error('❌ Seed failed:', err)
    process.exit(1)
})

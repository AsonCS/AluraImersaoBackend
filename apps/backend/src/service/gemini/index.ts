import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(
    process.env.KEY_API_GOOGLE_GEMINI!
)
const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash'
})

export default async function generateDescription(
    buffer: Buffer
): Promise<string> {
    const prompt = `
        Generate a short alt-text and a description for the image

        output just a json string: { "description": "[description here]", "image_alt": "[short alt-text here]" }
    `

    try {
        const image = {
            inlineData: {
                data: buffer.toString('base64'),
                mimeType: 'image/png'
            }
        }
        const res = await model.generateContent([prompt, image])
        let text = res.response.text() || 'Not available'
        text = text.replace('```json', '')
        text = text.replace('```', '')
        text = text.trim()
        return text
    } catch (e: any) {
        console.error('alt-text', e.message, e)
        return 'Error on generating alt-text'
    }
}

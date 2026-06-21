import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = process.env.GEMINI_API_KEY ?? ''

let genAI: GoogleGenerativeAI

function getGenAI() {
  if (!genAI) {
    genAI = new GoogleGenerativeAI(apiKey)
  }
  return genAI
}

export function getGeminiModel(model: string = 'gemini-2.5-flash') {
  return getGenAI().getGenerativeModel({ model })
}

export function getGeminiVisionModel() {
  return getGenAI().getGenerativeModel({
    model: 'gemini-2.5-flash',
    generationConfig: {
      temperature: 0.2,
      topP: 0.95,
    },
  })
}

export function getGeminiJsonModel() {
  return getGenAI().getGenerativeModel({
    model: 'gemini-2.5-flash',
    generationConfig: {
      temperature: 0.4,
      topP: 0.95,
      responseMimeType: 'application/json',
    },
  })
}

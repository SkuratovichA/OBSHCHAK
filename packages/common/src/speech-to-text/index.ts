import axios from 'axios'
import FormData from 'form-data'
import { OPENAI_STT_MODEL, OPENAI_STT_URL } from '../config'

export const speechToText = async (
  audioBlob: ArrayBuffer,
  apiKey: string,
): Promise<string | undefined> => {
  const formData = new FormData()
  formData.append('file', audioBlob, 'audio.wav')
  formData.append('model', OPENAI_STT_MODEL)
  formData.append(
    'prompt',
    `English language, English speech, kitchen appliances, galbe, oven, coup de feu, `,
  )

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'multipart/form-data',
  }

  let transcribedText: string | undefined
  try {
    const response = await axios.post<{ text: string }>(OPENAI_STT_URL, formData, {
      headers,
    })
    transcribedText = response.data?.text
  } catch (err: unknown) {
    console.error('Error transcribing audio:', err)
    throw err
  }

  return transcribedText
}

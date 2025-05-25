import axios from "axios"

export const generateMCQs = async (segments: string[]) => {
  const res = await axios.post("http://localhost:8000/generate-questions", { segments })
  return res.data.mcqs
}
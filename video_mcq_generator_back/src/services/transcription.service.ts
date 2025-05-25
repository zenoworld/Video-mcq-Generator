import axios from "axios"

export const transcribeVideo = async (videoPath: string) => {
  const res = await axios.post("http://localhost:8000/transcribe", { videoPath })
  return res.data
}
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Upload } from "lucide-react"
import { BASE_URL } from "@/utils/config"
import axios from "axios"

const VideoUploader = () => {
  const [file, setFile] = useState<File | null>(null)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState("")
  const [isError, setIsError] = useState(false);

  type TranscriptSegment = { start_time: string; end_time: string; text: string }
  type Mcq = { question: string; options: string[]; answer: string }

  const [transcript, setTranscript] = useState<TranscriptSegment[]>([])
  const [mcqs, setMcqs] = useState<Mcq[]>([])


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (selected && selected.type === "video/mp4") {
      setFile(selected)
      setStatus("")
    } else {
      setFile(null)
      setStatus("Only MP4 files are supported.")
    }
  }

  const handleUpload = async () => {
    if (!file) return
    setStatus("Uploading...")
    setProgress(0)

    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await axios.post(`${BASE_URL}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            setProgress(percent)
          }
        },
      })

      setIsError(false)
      setStatus("Uploaded successfully!") 
      const { transcript, mcqs } = response.data
      setTranscript(transcript)
      setMcqs(mcqs)
      console.log(response.data) 
    }
     catch (error) {
      console.error(error)
      setIsError(true);
      setStatus("Upload failed.")
    }
  }

  return (
    <div className="w-3/4 max-h-screen mt-4 flex flex-col items-center justify-center">
      <div
        className="flex flex-col items-start gap-4 p-6 rounded-xl border-2 border-gray-200  max-w-xl w-full shadow-2xl  bg-gray-100">
        <h2
          className="text-xl font-semibold">
          Upload Lecture Video
        </h2>

        <label
          htmlFor="video-upload"
          className="block font-medium"
        >
          Select MP4 Video
        </label>
        <input
          id="video-upload"
          type="file"
          accept="video/mp4"
          onChange={handleFileChange}
          className="block pl-2 py-2 border-2 rounded-sm border-gray-200 text-gray-500"
          title="Choose an MP4 video file to upload"
          placeholder="Select a video file"
        />

        <Button
          onClick={handleUpload}
          disabled={!file}
          className="bg-amber-300 text-black cursor-pointer">
          <Upload className="mr-2 h-4 w-4" />
          Upload
        </Button>

        {
          progress > 0
          &&
          <Progress value={progress} className="w-full" />
        }

        {status && (
          <p className={`text-sm ${isError ? "text-red-500" : "text-green-700"}`}>
            {status}
          </p>
        )}

      </div>

      <div className="max-w-xl w-full max-h-96 overflow-y-auto mt-4 mb-4 p-4 rounded bg-gray-100 shadow-2xl">
        {
          transcript.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold">Transcript:</h2>
              <ul>
                {
                  transcript.map((segment, idx) => (
                    <li key={idx} className="mb-2">
                      <strong>{segment.start_time} - {segment.end_time}:</strong> {segment.text}
                    </li>
                  ))
                }
              </ul>
            </div>
          )
        }

        {
          mcqs.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mt-6">Generated Questions:</h2>
              <ol className="list-decimal pl-5">
                {
                mcqs.map((q, idx) => (
                  <li key={idx} className="mb-4">

                    <p>
                      <strong>{q.question}</strong>
                    </p>

                    <ul className="list-disc pl-6">
                      {
                        q.options.map((opt, i) => (
                          <li key={i}>
                            {opt}
                          </li>
                        ))
                      }
                    </ul>

                    <p className="text-green-600">
                      Answer: {q.answer}
                    </p>

                  </li>
                ))}
              </ol>
            </div>
          )
        }
      </div>






    </div>

  )
}

export default VideoUploader

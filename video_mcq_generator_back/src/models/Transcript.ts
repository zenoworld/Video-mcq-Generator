import mongoose from "mongoose"

const TranscriptSchema = new mongoose.Schema(
    {
        videoId: mongoose.Schema.Types.ObjectId,
        transcript: String,
        segments: [String],
    },
    { timestamps: true }
)

export default mongoose.model('Transcript' , TranscriptSchema)

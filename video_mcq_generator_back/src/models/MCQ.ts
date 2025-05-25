import mongoose from "mongoose"

const MCQSchema = new mongoose.Schema(
    {
        videoId: mongoose.Schema.Types.ObjectId,
        mcqs: [
            {
                question: String,
                options: [String],
                answer: String,
            },
        ],
    },
    { timestamps: true }
)

export default mongoose.model("MCQ", MCQSchema)
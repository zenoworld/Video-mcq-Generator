import mongoose from "mongoose"

const VideoSchema = new mongoose.Schema(
    {
        filename: {
            String
        },
        path: {
            String
        },
    },
    { timestamps: true }
)

export default mongoose.model("Video", VideoSchema)

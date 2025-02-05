import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    note_title: {
      type: String,
      required: true,
    },
    note_content: {
      type: String,
      required: true,
    },
    note_status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "USER",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const NOTES =
  mongoose.models?.NOTES || mongoose.model("NOTES", noteSchema);

import mongoose, { Document, Schema } from "mongoose";

// Define the Teacher interface
export interface ITeacher extends Document {
  firstName: string;
  lastName: string;
  etablissement: string;
  image?: string; // Optional
  tags: string[];
  upvotes: string[];
  comments: {
    user: mongoose.Schema.Types.ObjectId; // Reference to User
    commentText: string;
    createdAt: Date;
  }[];
  shares: number;
  approve: boolean;
  createdAt: Date;
}

// Define the Teacher schema
const teacherSchema = new Schema<ITeacher>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  etablissement: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  tags: {
    type: [String],
    required: true,
  },
  upvotes: {
    type: [String], // Change to an array of strings
    default: [],
  },
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      commentText: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  shares: {
    type: Number,
    default: 0,
  },
  approve: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Teacher model
const Teacher = mongoose.models.Teacher || mongoose.model<ITeacher>("Teacher", teacherSchema);

export default Teacher;

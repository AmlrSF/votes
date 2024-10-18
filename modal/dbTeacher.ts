import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  etablismment: {
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
    type: Number,
    default: 0,
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


teacherSchema.index({ firstName: 1, lastName: 1, tags: 1 });

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;
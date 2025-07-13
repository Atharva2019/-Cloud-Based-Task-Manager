import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
  userId: String,
});

export default mongoose.model("Task", taskSchema);

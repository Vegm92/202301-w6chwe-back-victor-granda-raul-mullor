import mongoose from "mongoose";

const robotSchema = new mongoose.Schema({
  name: String,
  image: String,
  speed: Number,
  endurance: Number,
  creationDate: Date,
  chip: { type: String, required: true, unique: true },
});

const Robot = mongoose.model("Robot", robotSchema);
export default Robot;

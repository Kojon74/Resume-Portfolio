import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const projectSchema = new Schema({
  name: String,
  expType: String,
  img: String,
  tags: Array<String>,
  desc: String,
  details: Array<String>,
  github: String,
});

const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;

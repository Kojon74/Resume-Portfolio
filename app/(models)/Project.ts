import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI as string);
mongoose.Promise = global.Promise;

const projectSchema = new Schema({
  name: String,
  expType: new Schema({ type: String, expName: String, expURL: String }),
  startDate: Date,
  endDate: Date,
  noEndDate: Boolean,
  media: [String],
  summary: String,
  achievements: [String],
  github: String,
  link: String,
  projTypes: [String],
  languages: [String],
  libs: [String],
});

const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;

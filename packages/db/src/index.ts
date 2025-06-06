import mongoose from "mongoose";

// Define mongoose schemas
const userSchema = new mongoose.Schema({
  username: { type: String },
  email: String,
  role : String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  cart : [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }]
});

const adminSchema = new mongoose.Schema({
  username: String,
  email: String,
  role : String,
  password: String,
  createdCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Admin =
  mongoose.models.Admin || mongoose.model("Admin", adminSchema);
export const Course =
  mongoose.models.Course || mongoose.model("Course", courseSchema);

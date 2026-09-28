import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  enrolledCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courses",
    },
  ],
  photourl: {
    type: String,
    default:
      "https://ik.imagekit.io/pgt5y5hyw/default-avatar-icon-of-social-media-user-vector.jpg",
  },
  verified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: "student",
    enum: ["student", "instructor", "admin"],
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const userModel = mongoose.model("users", userSchema);
export default userModel;
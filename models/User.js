const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      max: 200,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 50,
      select: false,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      max: 100,
      trim: true,
    },
    firstName: {
      type: String,
      max: 120,
      default: "",
    },
    lastName: {
      type: String,
      max: 120,
      default: "",
    },
    dob: {
      type: Date,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    userPublicId: {
      type: String,
      default: "",
    },
    blogPosts: {
      type: [{ type: Schema.Types.ObjectId }],
      default: [],
      ref: "Post",
    },
    active: {
      type: Boolean,
      default: false,
    },
    activeToken: String,
    activeExpires: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      next();
    }
  } catch (err) {
    console.log(err);
  }
});

userSchema.pre("updateOne", async function (next) {
  const docToUpdate = await this.model.findOne(this.getQuery());

  try {
    if (docToUpdate.password !== this._update.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this._update.password, salt);
      this._update.password = hashedPassword;
      next();
    }
  } catch (err) {
    console.log(err);
  }
});

userSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    console.log(err);
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;

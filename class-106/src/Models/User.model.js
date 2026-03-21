const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

/* =========================
   Profile Subdocument Schema
   =========================
   Stores user profile related info.
   _id is disabled because this is embedded inside User.
*/
const ProfileSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      default: "https://ik.imagekit.io/Bharat/default-user-profile-icon.avif",
      trim: true
    }
  },
  { _id: false }
);


/* =========================
   Main User Schema
   =========================
   Defines structure of user document in MongoDB.
*/
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"]
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false // hides password from queries by default
    },

    bio: {
      type: String,
      default: "",
      maxlength: 500
    },

    profile: {
      type: ProfileSchema,
      default: () => ({})
    }
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt
    versionKey: false // removes __v field
  }
);


/* =========================
   Indexes
   =========================
   Improves query performance and ensures uniqueness.
*/
UserSchema.index({ email: 1 });
UserSchema.index({ username: 1 });


/* =========================
   Password Hash Middleware
   =========================
   Automatically hashes password before saving to DB.
*/
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});


/* =========================
   Instance Method
   =========================
   Compares entered password with stored hashed password.
*/
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};


/* =========================
   JSON Transformation
   =========================
   Removes sensitive fields when sending user data.
*/
UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};


/* =========================
   Export Model
   =========================
   Makes User model available across application.
*/
module.exports = mongoose.model("User", UserSchema);
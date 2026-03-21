// =====================================================
// 1. Import Dependencies
// =====================================================
const mongoose = require("mongoose");

/*
Loads Mongoose ODM.

Purpose:
✔ Define schemas
✔ Validate documents
✔ Interact with MongoDB collections
✔ Create indexes and middleware
*/


// =====================================================
// 2. Define Follow Schema
// =====================================================
const followSchema = new mongoose.Schema(
  {
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Follower is required"],
      index: true
    },

    following: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Following user is required"],
      index: true
    }
  },
  {
    timestamps: true,   // adds createdAt & updatedAt automatically
    versionKey: false   // removes __v field
  }
);

/*
This schema represents a follow relationship between two users.

Structure:
follower  → who performs the follow
following → who gets followed

Features:
✔ ObjectId references User collection
✔ Required validation messages
✔ Indexed fields for faster search
✔ Automatic timestamps
✔ Cleaner documents without version key
*/


// =====================================================
// 3. Prevent Duplicate Follow Records
// =====================================================
followSchema.index(
  { follower: 1, following: 1 },
  { unique: true }
);

/*
Creates a compound unique index.

Database guarantees:
✔ Same user cannot follow same account twice
✔ Fast lookup for follower → following pair
✔ Enforces data integrity at DB level
*/


// =====================================================
// 4. Business Rule: Prevent Self Follow
// =====================================================
followSchema.pre("validate", function (next) {
  if (!this.follower || !this.following) return next();

  if (this.follower.equals(this.following)) {
    return next(new Error("User cannot follow themselves"));
  }

  next();
});

/*
Runs before validation & save.

Purpose:
✔ Prevent user from following themselves
✔ Uses ObjectId.equals() for safe comparison
✔ Stops invalid data before database write
*/


// =====================================================
// 5. Static Helper Methods (Professional Practice)
// =====================================================

// Follow a user safely
followSchema.statics.followUser = async function (followerId, followingId) {
  return this.create({
    follower: followerId,
    following: followingId
  });
};

/*
Reusable method to create a follow record.

Benefits:
✔ Centralized logic
✔ Cleaner controllers
✔ Prevents duplicate logic across app
*/


// Unfollow a user
followSchema.statics.unfollowUser = async function (followerId, followingId) {
  return this.deleteOne({
    follower: followerId,
    following: followingId
  });
};

/*
Deletes follow relationship.

Benefits:
✔ Simple unfollow action
✔ Clean service-level usage
*/


// Count followers of a user
followSchema.statics.countFollowers = function (userId) {
  return this.countDocuments({ following: userId });
};

/*
Returns number of followers.

Use case:
✔ Profile stats
✔ Popularity metrics
*/


// Count how many users someone follows
followSchema.statics.countFollowing = function (userId) {
  return this.countDocuments({ follower: userId });
};

/*
Returns number of accounts user follows.

Use case:
✔ Social stats
✔ Dashboard info
*/


// Check if a user follows another
followSchema.statics.isFollowing = async function (followerId, followingId) {
  const result = await this.exists({
    follower: followerId,
    following: followingId
  });
  return !!result;
};

/*
Returns boolean follow status.

Benefits:
✔ Fast existence check
✔ Efficient UI logic
*/


// =====================================================
// 6. Create Model
// =====================================================
const Follow = mongoose.model("Follow", followSchema);

/*
Creates MongoDB collection: "follows"

Provides built-in methods:
✔ create()
✔ find()
✔ deleteOne()
✔ countDocuments()
✔ exists()
✔ custom static methods
*/


// =====================================================
// 7. Export Model
// =====================================================
module.exports = Follow;

/*
Exports model for use in:

✔ Controllers
✔ Services
✔ Routes
✔ Business logic layers
*/
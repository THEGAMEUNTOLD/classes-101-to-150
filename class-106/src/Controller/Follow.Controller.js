// ======================================================
// 1. Core Dependencies
// ======================================================
const mongoose = require("mongoose");
const User = require("../Models/User.model");

/*
Imports database tools and User model.

mongoose → MongoDB ODM
User     → User collection schema
*/


// ======================================================
// 2. Helper: Validate MongoDB ObjectId
// ======================================================
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

/*
Ensures provided ID is a valid MongoDB ObjectId.
Prevents database errors and invalid queries.
*/


// ======================================================
// 3. Follow User
// ======================================================
exports.followUser = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const myId = req.user.id;
    const targetUserId = req.params.userId;

    if (!isValidObjectId(targetUserId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID"
      });
    }

    if (myId === targetUserId) {
      return res.status(400).json({
        success: false,
        message: "You cannot follow yourself"
      });
    }

    const me = await User.findById(myId).session(session);
    const targetUser = await User.findById(targetUserId).session(session);

    if (!me || !targetUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (me.following.includes(targetUserId)) {
      return res.status(409).json({
        success: false,
        message: "Already following this user"
      });
    }

    me.following.push(targetUserId);
    targetUser.followers.push(myId);

    await me.save({ session });
    await targetUser.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      success: true,
      message: "User followed successfully"
    });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

/*
Creates follow relationship between two users.

Transaction ensures:
✔ both users updated
✔ no partial updates
✔ database consistency
*/


// ======================================================
// 4. Unfollow User
// ======================================================
exports.unfollowUser = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const myId = req.user.id;
    const targetUserId = req.params.userId;

    if (!isValidObjectId(targetUserId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID"
      });
    }

    const me = await User.findById(myId).session(session);
    const targetUser = await User.findById(targetUserId).session(session);

    if (!me || !targetUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    me.following = me.following.filter(
      (id) => id.toString() !== targetUserId
    );

    targetUser.followers = targetUser.followers.filter(
      (id) => id.toString() !== myId
    );

    await me.save({ session });
    await targetUser.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      success: true,
      message: "User unfollowed successfully"
    });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

/*
Removes follow relationship safely.
Works even if user was not following.
*/


// ======================================================
// 5. Get Followers of a User
// ======================================================
exports.getFollowers = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!isValidObjectId(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID"
      });
    }

    const user = await User.findById(userId)
      .populate("followers", "username email profile")
      .lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      followers: user.followers,
      total: user.followers.length
    });

  } catch (error) {
    next(error);
  }
};

/*
Returns list of followers for target user.
Only public profile fields are returned.
*/


// ======================================================
// 6. Get Users Followed by a User
// ======================================================
exports.getFollowing = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!isValidObjectId(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID"
      });
    }

    const user = await User.findById(userId)
      .populate("following", "username email profile")
      .lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      following: user.following,
      total: user.following.length
    });

  } catch (error) {
    next(error);
  }
};

/*
Returns list of users that target user follows.
*/
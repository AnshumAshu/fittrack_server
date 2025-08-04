// const { User } = require("../models");
// const { signToken } = require("../utils/auth");

// module.exports = {
//   // get a single user by id or username
//   async getSingleUser({ user = null, params }, res) {
//     const foundUser = await User.findOne({
//       $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
//     })
//       .select("-__v")
//       .populate("cardio")
//       .populate("resistance")

//     if (!foundUser) {
//       return res.status(400).json({ message: 'Cannot find a user with this id!' });
//     }

//     res.json(foundUser);
//   },

//   // create a user, sign a token, and send it back to sign up page
//   async createUser({ body }, res) {
//     const user = await User.create(body);

//     if (!user) {
//       return res.status(400).json({ message: "Something is wrong!" });
//     }
//     const token = signToken(user);
//     res.json({ token, user });
//   },

//   // login a user, sign a token, and send it back to login page
//   async login({ body }, res) {
//     const user = await User.findOne({
//       $or: [{ username: body.username }, { email: body.email }],
//     });
//     if (!user) {
//       return res.status(400).json({ message: "Can't find this user" });
//     }

//     const correctPw = await user.isCorrectPassword(body.password);

//     if (!correctPw) {
//       return res.status(400).json({ message: "Wrong password!" });
//     }
//     const token = signToken(user);
//     res.json({ token, user });
//   },
// };





const { User } = require("../models");
const { signToken } = require("../utils/auth");

module.exports = {
  // get a single user by id or username
  async getSingleUser({ user = null, params }, res) {
    const foundUser = await User.findOne({
      $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
    })
      .select("-__v")
      .populate("cardio")
      .populate("resistance")
      .populate("diet"); // Populate diet data as well

    if (!foundUser) {
      return res.status(400).json({ message: "Cannot find a user with this id!" });
    }

    res.json(foundUser);
  },

  // create a user, sign a token, and send it back to sign up page
  async createUser({ body }, res) {
    const user = await User.create(body);

    if (!user) {
      return res.status(400).json({ message: "Something is wrong!" });
    }
    const token = signToken(user);
    res.json({ token, user });
  },

  // login a user, sign a token, and send it back to login page
  async login({ body }, res) {
    const user = await User.findOne({
      $or: [{ username: body.username }, { email: body.email }],
    });
    if (!user) {
      return res.status(400).json({ message: "Can't find this user" });
    }

    const correctPw = await user.isCorrectPassword(body.password);

    if (!correctPw) {
      return res.status(400).json({ message: "Wrong password!" });
    }
    const token = signToken(user);
    res.json({ token, user });
  },

  // Update user's diet (if required)
  async updateUserDiet({ params, body }, res) {
    const foundUser = await User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { diet: body.dietId } },
      { new: true }
    )
      .populate("cardio")
      .populate("resistance")
      .populate("diet"); // Populate updated diet data

    if (!foundUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.json(foundUser);
  },

  // Delete a user's diet (if required)
  async deleteUserDiet({ params }, res) {
    const foundUser = await User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { diet: params.dietId } },
      { new: true }
    )
      .populate("cardio")
      .populate("resistance")
      .populate("diet"); // Populate updated diet data

    if (!foundUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.json(foundUser);
  },
};


// const { User } = require("../models");
// const { signToken } = require("../utils/auth");

// module.exports = {
//   // ✅ Get a single user by ID or username
//   async getSingleUser({ user = null, params }, res) {
//     try {
//       const foundUser = await User.findOne({
//         $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
//       })
//         .select("-__v")
//         .populate("cardio")
//         .populate("resistance")
//         .populate("diet");

//       if (!foundUser) {
//         return res.status(400).json({ message: "Cannot find a user with this id!" });
//       }

//       res.json(foundUser);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Server error" });
//     }
//   },

//   // ✅ Create a user with duplicate key check and token return
//   async createUser({ body }, res) {
//     try {
//       const user = await User.create(body);

//       if (!user) {
//         return res.status(400).json({ message: "Something is wrong!" });
//       }

//       const token = signToken(user);
//       res.status(201).json({ token, user });
//     } catch (err) {
//       if (err.code === 11000) {
//         // MongoDB duplicate key error
//         return res.status(409).json({ message: "Username or email already exists" });
//       }

//       console.error(err);
//       res.status(500).json({ message: "Server error" });
//     }
//   },

//   // ✅ Login a user with password check
//   async login({ body }, res) {
//     try {
//       const user = await User.findOne({
//         $or: [{ username: body.username }, { email: body.email }],
//       });

//       if (!user) {
//         return res.status(400).json({ message: "Can't find this user" });
//       }

//       const correctPw = await user.isCorrectPassword(body.password);

//       if (!correctPw) {
//         return res.status(400).json({ message: "Wrong password!" });
//       }

//       const token = signToken(user);
//       res.json({ token, user });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Login error" });
//     }
//   },

//   // ✅ Update user's diet
//   async updateUserDiet({ params, body }, res) {
//     try {
//       const foundUser = await User.findOneAndUpdate(
//         { _id: params.userId },
//         { $push: { diet: body.dietId } },
//         { new: true }
//       )
//         .populate("cardio")
//         .populate("resistance")
//         .populate("diet");

//       if (!foundUser) {
//         return res.status(404).json({ message: "User not found!" });
//       }

//       res.json(foundUser);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Error updating diet" });
//     }
//   },

//   // ✅ Delete a user's diet
//   async deleteUserDiet({ params }, res) {
//     try {
//       const foundUser = await User.findOneAndUpdate(
//         { _id: params.userId },
//         { $pull: { diet: params.dietId } },
//         { new: true }
//       )
//         .populate("cardio")
//         .populate("resistance")
//         .populate("diet");

//       if (!foundUser) {
//         return res.status(404).json({ message: "User not found!" });
//       }

//       res.json(foundUser);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Error deleting diet" });
//     }
//   }
// };

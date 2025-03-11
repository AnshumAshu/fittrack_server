// const { Resistance, User } = require("../models");

// module.exports = {
//   // create Resistance
//   createResistance({ body }, res) {
//     Resistance.create(body)
//       .then((dbResistanceData) => {
//         return User.findOneAndUpdate(
//           { _id: body.userId },
//           { $push: { resistance: dbResistanceData._id } },
//           { new: true }
//         )
//       })
//       .then((dbUserData) => {
//         if (!dbUserData) {
//           return res.status(404).json({ message: "Resistance created but no user with this id!" });
//         }
//         res.json({ message: "Resistance successfully created!" });
//       })
//       .catch((err) => res.status(500).json(err));
//   },

//   // get one Resistance by id
//   getResistanceById({ params }, res) {
//     Resistance.findOne({ _id: params.id })
//       .then((dbResistanceData) => {
//         if (!dbResistanceData) {
//           return res.status(404).json({ message: "No resistance data found with this id!" });
//         }
//         res.json(dbResistanceData);
//       })
//       .catch((err) => res.status(500).json(err));
//   },

//   // delete resistance data
//   deleteResistance({ params }, res) {
//     Resistance.findOneAndDelete({ _id: params.id })
//       .then((dbResistanceData) => {
//         if (!dbResistanceData) {
//           res.status(404).json({ message: "No resistance data found with this id!" });
//           return;
//         }
//         // remove resistance on user data
//         return User.findOneAndUpdate(
//           { resistance: params.id },
//           { $pull: { resistance: params.id } },
//           { new: true }
//         )
//       })
//       .then((dbUserData) => {
//         if (!dbUserData) {
//           return res.status(404).json({ message: "Resistance deleted but no user with this id!" });
//         }
//         res.json({ message: "Resistance successfully deleted!" });
//       })
//       .catch((err) => res.status(500).json(err));
//   },
// };




const { Resistance, User } = require("../models");

module.exports = {
  // Create Resistance
  createResistance({ body }, res) {
    Resistance.create(body)
      .then((dbResistanceData) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { resistance: dbResistanceData._id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "Resistance created but no user with this id!" });
        }
        res.json({ message: "Resistance successfully created!" });
      })
      .catch((err) => res.status(500).json(err));
  },

  // Get One Resistance by ID
  getResistanceById({ params }, res) {
    Resistance.findOne({ _id: params.id })
      .then((dbResistanceData) => {
        if (!dbResistanceData) {
          return res.status(404).json({ message: "No resistance data found with this id!" });
        }
        res.json(dbResistanceData);
      })
      .catch((err) => res.status(500).json(err));
  },

  // 🚀 Get All Resistance for a User (NEW FUNCTION)
  getAllResistance({ user }, res) {
    Resistance.find({ userId: user._id }) // Fetch only for logged-in user
      .then((resistance) => res.json(resistance))
      .catch((err) => res.status(500).json(err));
  },

  // Delete Resistance
  deleteResistance({ params }, res) {
    Resistance.findOneAndDelete({ _id: params.id })
      .then((dbResistanceData) => {
        if (!dbResistanceData) {
          return res.status(404).json({ message: "No resistance data found with this id!" });
        }
        // Remove resistance reference in User model
        return User.findOneAndUpdate(
          { resistance: params.id },
          { $pull: { resistance: params.id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "Resistance deleted but no user with this id!" });
        }
        res.json({ message: "Resistance successfully deleted!" });
      })
      .catch((err) => res.status(500).json(err));
  },
};

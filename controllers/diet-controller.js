// const { Diet, User } = require("../models");

// module.exports = {
//   // create Diet
//   createDiet({ body }, res) {
//     //console.log(body)
//     Diet.create(body)
//       .then((dbDietData) => {
//         return User.findOneAndUpdate(
//           { _id: body.userId },
//           { $push: { diet: dbDietData._id } },
//           { new: true }
//         );
//       })
//       .then((dbUserData) => {
//         if (!dbUserData) {
//           return res.status(404).json({ message: "Diet created but no user with this id!" });
//         }
//         res.json({ message: "Diet successfully created!" });
//       })
//       .catch((err) => res.status(500).json(err));
//   },

//   // get one Diet by id
//   getDietById({ params }, res) {
//     Diet.findOne({ _id: params.id })
//       .then((dbDietData) => {
//         if (!dbDietData) {
//           return res.status(404).json({ message: "No diet data found with this id!" });
//         }
//         res.json(dbDietData);
//       })
//       .catch((err) => res.status(500).json(err));
//   },

//   // delete diet data
//   deleteDiet({ params }, res) {
//     Diet.findOneAndDelete({ _id: params.id })
//       .then((dbDietData) => {
//         if (!dbDietData) {
//           res.status(404).json({ message: "No diet data found with this id!" });
//           return;
//         }
//         // remove diet on user data
//         return User.findOneAndUpdate(
//           { diet: params.id },
//           { $pull: { diet: params.id } },
//           { new: true }
//         );
//       })
//       .then((dbUserData) => {
//         if (!dbUserData) {
//           return res.status(404).json({ message: "Diet deleted but no user with this id!" });
//         }
//         res.json({ message: "Diet successfully deleted!" });
//       })
//       .catch((err) => res.status(500).json(err));
//   },
// };





const { Diet, User } = require("../models");

module.exports = {
  // Create Diet
  createDiet({ body }, res) {
    Diet.create(body)
      .then((dbDietData) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { diet: dbDietData._id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "Diet created but no user with this id!" });
        }
        res.json({ message: "Diet successfully created!" });
      })
      .catch((err) => res.status(500).json(err));
  },

  // Get One Diet by ID
  getDietById({ params }, res) {
    Diet.findOne({ _id: params.id })
      .then((dbDietData) => {
        if (!dbDietData) {
          return res.status(404).json({ message: "No diet data found with this id!" });
        }
        res.json(dbDietData);
      })
      .catch((err) => res.status(500).json(err));
  },

  // 🚀 Get All Diets for a User (NEW FUNCTION)
  getAllDiet({ user }, res) {
    Diet.find({ userId: user._id }) // Fetch only for logged-in user
      .then((diets) => res.json(diets))
      .catch((err) => res.status(500).json(err));
  },

  // Delete Diet
  deleteDiet({ params }, res) {
    Diet.findOneAndDelete({ _id: params.id })
      .then((dbDietData) => {
        if (!dbDietData) {
          return res.status(404).json({ message: "No diet data found with this id!" });
        }
        // Remove diet reference in User model
        return User.findOneAndUpdate(
          { diet: params.id },
          { $pull: { diet: params.id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "Diet deleted but no user with this id!" });
        }
        res.json({ message: "Diet successfully deleted!" });
      })
      .catch((err) => res.status(500).json(err));
  },
};

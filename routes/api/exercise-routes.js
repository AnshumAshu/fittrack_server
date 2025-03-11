// const router = require("express").Router();
// const {
//   createResistance,
//   getResistanceById,
//   deleteResistance,
// } = require("../../controllers/resistance-controller");
// const {
//   createCardio,
//   getCardioById,
//   deleteCardio,
// } = require("../../controllers/cardio-controller");
// // import middleware
// const { authMiddleware } = require('../../utils/auth');
// // on insominia: 
// // choose Auth bearer, add response-body attribute and edit tag
// // change request to the login api
// // change filter to $. to find token
// router.use(authMiddleware);
// // /api/exercise/cardio
// router.route("/cardio").post(createCardio);
// // /api/exercise/cardio/:id
// router.route("/cardio/:id").get(getCardioById).delete(deleteCardio);
// // /api/exercise/resistance
// router.route("/resistance").post(createResistance);
// // /api/exercise/resistance/:id
// router.route("/resistance/:id").get(getResistanceById).delete(deleteResistance);
// module.exports = router;





const router = require("express").Router();
const {
  createResistance,
  getResistanceById,
  deleteResistance,
} = require("../../controllers/resistance-controller");

const {
  createCardio,
  getCardioById,
  deleteCardio,
} = require("../../controllers/cardio-controller");

const {
  createDiet,
  getDietById,
  deleteDiet,
} = require("../../controllers/diet-controller");

// import middleware
const { authMiddleware } = require('../../utils/auth');

// Use authentication middleware
router.use(authMiddleware);

// /api/exercise/cardio
router.route("/cardio").post(createCardio);

// /api/exercise/cardio/:id
router.route("/cardio/:id").get(getCardioById).delete(deleteCardio);

// /api/exercise/resistance
router.route("/resistance").post(createResistance);

// /api/exercise/resistance/:id
router.route("/resistance/:id").get(getResistanceById).delete(deleteResistance);

// /api/diet
router.route("/diet").post(createDiet);

// /api/diet/:id
router.route("/diet/:id").get(getDietById).delete(deleteDiet);

module.exports = router;






const express = require("express");
const axios = require("axios");
require("dotenv").config();  // Load environment variables from .env file

const router = express.Router();

// POST route to handle nutrition data
router.post("/", async (req, res) => {
  const food = req.body.food;  // The food item sent from the frontend

  // Check if food parameter is provided
  if (!food) {
    return res.status(400).json({ error: "Food item is required" });
  }

  try {
    // Use the API from API Ninja (Nutrition API)
    const response = await axios.get(
      `https://api.api-ninjas.com/v1/nutrition?query=${food}`,  // API Ninja endpoint for nutrition data
      {
        headers: {
          "X-Api-Key": process.env.API_NINJA_KEY,  // Use the API key from the environment variable
        },
      }
    );

    // Send the response data back to the frontend
    res.json(response.data);
  } catch (error) {
    console.error(error);

    // Send detailed error response if something goes wrong
    res.status(500).json({
      error: "Error fetching nutrition data from API.",
      message: error.message,
    });
  }
});

module.exports = router;

// // const express = require("express");
// // const path = require("path");
// // const routes = require("./routes");
// // const db = require("./config/connection");

// // const PORT = process.env.PORT || 3001;
// // const app = express();

// // app.use(express.urlencoded({ extended: true }));
// // app.use(express.json());

// // // Serve up static assets
// // if (process.env.NODE_ENV === "production") {
// //   app.use(express.static(path.join(__dirname, "../client/build")));
// // }

// // // app.get('*', (req, res) => {
// // //   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// // // });

// // app.use(routes);

// // db.once("open", () => {
// //   app.listen(PORT, () => {
// //     console.log(`API server running on port ${PORT}!`);
// //   });
// // });








const express = require("express");
const path = require("path");
const routes = require("./routes");
const nutritionRoutes = require("./routes/api/nutrition");  // Import the nutrition routes
const db = require("./config/connection");
const cors = require("cors");  // Import cors

const PORT = process.env.PORT || 3001;
const app = express();

// Enable CORS for all origins (or you can customize it to allow only specific origins)
app.use(cors());  // Enable CORS

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

// Use the nutrition routes for nutrition data
app.use("/api/nutrition", nutritionRoutes);  // This will route API calls to /api/nutrition

// Catch-all handler for any other routes
app.use(routes);

// Database connection and server start
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});




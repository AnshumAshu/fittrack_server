// const mongoose = require("mongoose");

// mongoose.set("strictQuery", false);

// mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://ashu1234:ashu1234@cluster0.w6svr.mongodb.net/f", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }, err => {
//   if (err) throw err;
//   console.log('Connected to MongoDB!')
// }

// );

// module.exports = mongoose.connection;





const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://ashu1234:ashu1234@cluster0.w6svr.mongodb.net/f");
    console.log('Connected to MongoDB!');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit the process with a failure code
  }
};

connectDB();

module.exports = mongoose.connection;




// const mongoose = require("mongoose");

// mongoose.set("strictQuery", false);

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://ashu1234:ashu1234@cluster0.w6svr.mongodb.net/f");
//     console.log('Connected to MongoDB!');
//   } catch (err) {
//     console.error('Error connecting to MongoDB:', err);
//   }
// };

// connectDB();

// module.exports = mongoose.connection;

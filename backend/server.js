const express = require("express");
const PORT = process.env.PORT || 5000;
const dotenv = require("dotenv").config();
const colors = require("colors");
// const router = require('./routes/notesRoutes');
const notesRoutes = require("./routes/notesRoutes");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorHandler");

// connect to database
connectDB();
// dotenv.config();
const app = express();
app.use(express.json());

// const notes = require('./data/notes');

// for the user
app.use("/api/users", userRoutes);

// Routes for notes
app.use("/api/notes", notesRoutes);
// error handler
// app.use(notFound)
app.use(errorHandler);

// ....deployment...

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", " build", "index.html")
    );
  });
} else {
  app.get("/", (req, res) => {
    res.status(200).json({ message: "welcome to Kunal Note Handler App" });
  });
}

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/frontend/build")));

//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
//   );
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running..");
//   });
// }

// ....deployment.....

app.listen(PORT, () => console.log(`welcome to this port of ${PORT}`));

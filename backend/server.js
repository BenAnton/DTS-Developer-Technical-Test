const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./routes/Todo");

const app = express();
const PORT = process.env.PORT || 5001;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/todos", taskRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017/tododb")
  .then(() => {
    console.log("MongoDb connected");
    app.listen(PORT, () =>
      console.log(`The server is running on port: ${PORT}`)
    );
  })
  .catch((err) => console.error(err));

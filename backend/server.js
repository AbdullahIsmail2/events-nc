const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const eventRoutes = require("./routes/eventRoutes");

dotenv.config();

const app = express();

const corsOptions = {
  origin: "https://events-nc-9rcw.vercel.app/",
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
};

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

app.use("/api/events", eventRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

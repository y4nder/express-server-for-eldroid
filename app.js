const express = require("express");
require("dotenv").config();
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const authRoutes = require("./routes/auth");
const validateHeader = require("./middleware/validateHeader");

const app = express();
app.use(express.json());
app.use(cors());

app.use(validateHeader);
app.use("/auth", authRoutes);
app.use("/api", userRoutes);

app.listen(process.env.PORT, () => {
    console.log("listening on port 3000");
});

app.get("/", async (req, res) => {
    res.send("test api");
});

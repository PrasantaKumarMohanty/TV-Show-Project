const bodyParser = require("body-parser");
const express = require("express");
const cors = require('cors');
const allController = require("./controller/AllController.js");
const app = express();
app.use(cors());

const port = 4000;
const router = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.post("/api/login", allController.login);
app.get("/api/search", allController.search);
app.listen(port, () => console.log(`http://localhost:${port}`));

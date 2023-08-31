const { default: axios } = require("axios");
const jwt = require("jsonwebtoken");

const userData = [
  { email: "admin@gmail.com", password: "admin123" },
  { email: "manager@gmail.com", password: "manager123" },
  { email: "pm@gmail.com", password: "pm123456" },
];

exports.login = async (req, res) => {
  try {
    let emailCheck = await userData.find(
      (e) => e.email == req.body.email
    );
    if (!emailCheck) {
      return res.status(400).json("Email does not exist.");
    }
    let passwordCheck = await userData.find(
      (e) => e.password == req.body.password
    );
    if (!passwordCheck) {
      console.log("first");
      return res.status(400).json("Wrong Password ! Try again");
    }
    docs = await userData.find((e) => e.email == req.body.email);
    var token = jwt.sign(docs, "MyNamePrasant");
    res.json(token);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.search = async (req, res) => {
  try {
    // verfy the user
    let token = req.headers.authorization.split(" ")[1];
    let verify = jwt.verify(token, "MyNamePrasant");

    if (verify) {
      let serachData = await axios.get(
        `https://api.tvmaze.com/search/shows?q=${req.query.q}`
      );
      return res.json(serachData.data);
    } else return res.json("No data Found");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// api example
// get request
// http://localhost:4000/api/search?q=girls
// post request
// http://localhost:4000/api/login
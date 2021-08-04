const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const urls = require("./db/urls");

// Setup a Node/Express app.
const app = express();

// info: morgan is used console logging.
app.use(morgan("tiny"));

// info: bodyParser is used to receive and parse data from the client.
app.use(bodyParser.json());

// info: making a static client root folder.
app.use(express.static("./public"));

app.get("/:name", async (req, res) => {
  const puny = await urls.find(req.params.name);
  if (puny) {
    res.redirect(puny.url);
  } else {
    res.redirect(`/404.html?name=${req.params.name}`);
  }
});

app.post("/api/hg4", async (req, res) => {
  console.log(req.body);
  try {
    const url = await urls.create(req.body);
    res.json(url);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
});

// info: process.env.PORT is used by the deployment service we will use when we deploy.
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

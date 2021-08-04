const monk = require("monk");

const connectionURL = process.env.MONGODB_URI || "localhost/hg4_db";

const db = monk(connectionURL);

module.exports = db;

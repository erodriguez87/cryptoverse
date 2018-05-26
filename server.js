const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const PORT = process.env.PORT || 8000;

const app = express();
const db = require('./models');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Handlebars =========================
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes ==============================
require("./routes/html-routes.js")(app);
// require("./routes/user-api-routes.js")(app);
// require("./routes/crypto-api-routes.js")(app);

// Sequelize Sync ======================
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
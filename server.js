// dependencies
var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var jsonParser = bodyParser.json()

var PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(jsonParser);

app.use(express.static('app/public'));

require("./app/routes/apiRoutes")(app);
require("./app/routes/htmlRoutes")(app);

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });
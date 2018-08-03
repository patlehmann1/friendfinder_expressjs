var friendData = require("../app/data/friends.js");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
      res.json(friendData);
    });
  
    app.post("/api/friends", function(req, res) {
        friendData.push(req.body);
    });
};
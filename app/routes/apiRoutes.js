var friends = require("../data/friends");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json()

console.log(friends);

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
      res.json(friends);
    });
  
    app.post("/api/friends", jsonParser, function(req, res) {
        // console.log(req.body); 
        // console.log(friendData);
        // friendData.push(req.body); 
        // console.log(friendData);   
        var bestMatch = {
			name: "",
			age: "",
			friendDifference: Infinity
		};

		var userData 	= req.body;
		var userScores 	= userData.scores;

		var totalDifference;

		for  (var i=0; i< friends.length; i++) {

			console.log(friends[i].name);
			totalDifference = 0;

			for (var j=0; j< friends[i].scores.length; j++){
				totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));
				if (totalDifference <= bestMatch.friendDifference){

					bestMatch.name = friends[i].name;
					bestMatch.age = friends[i].age;
					bestMatch.friendDifference = totalDifference;
					console.log(bestMatch.name);
				}
			}
		}

		friends.push(userData);

		res.json(bestMatch);

	});   
};
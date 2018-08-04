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
			friendDifference: 1000
		};

		// Here we take the result of the user's survey POST and parse it.
		var userData 	= req.body;
		var userName 	= userData.name;
		var userAge	= userData.age;
		var userScores 	= userData.scores;

		var totalDifference = 0;

		// Loop through all the friend possibilities in the database. 
		for  (var i=0; i< friends.length; i++) {

			console.log(friends[i].name);
			totalDifference = 0;

			// Loop through all the scores of each friend
			for (var j=0; j< friends[i].scores[j]; j++){

				// We calculate the difference between the scores and sum them into the totalDifference
				totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

				// If the sum of differences is less then the differences of the current "best match"
				if (totalDifference <= bestMatch.friendDifference){

					// Reset the bestMatch to be the new friend. 
					bestMatch.name = friends[i].name;
					bestMatch.photo = friends[i].age;
					bestMatch.friendDifference = totalDifference;
				}
			}
		}

		// Finally save the user's data to the database (this has to happen AFTER the check. otherwise,
		// the database will always return that the user is the user's best friend).
		friends.push(userData);

		// Return a JSON with the user's bestMatch. This will be used by the HTML in the next page. 
		res.json(bestMatch);

	});   
};
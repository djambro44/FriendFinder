//dependencies
var path = require("path");

var friends = require("../data/friends.js");

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        //get user input
        var userInput = req.body;
        console.log(req.body);

        //make user scores into integers
        for (i = 0; i < userInput.scores.length; i++) {
            userInput.scores[i] = parseInt(userInput.scores[i]);
        }

        // //make the first friend a match and then check if any other scores are better
        // var bestFriend = 0;

        // //make a loop that seperates 

        // //for loop to go through friends 0 -5
        // for (i=0; i<friends.length; i++){
        //     var selectedFriend = friends[i];
        //     //for loop that goes through each answer of selected frind
        //     for (j=0; j<friends[i].scores.length; j++){
        //         var selectedFriendScore = friends[i].score[j];
        //     } 
        //     //function to calculate difference
        //     function findDifference(){
        //         //store as total difference for that friend
        //         var diff = Math.abs(selectedFriendScore - userInput.scores);
        //     }
        // }


        var bestFriendIndex = 0;
        //total difference possible
        var minimumDifference = 40;

        // in this for-loop, start off with a zero difference and compare the user and the friend scores, one at a time
        //  whatever the difference is, add to the total difference
        for (var i = 0; i < friends.length; i++) {
            var totalDifference = 0;
            for (var j = 0; j < friends[i].scores.length; j++) {
                var difference = Math.abs(userInput.scores[j] - friends[i].scores[j]);
                totalDifference += difference;
            }

            // if there is a new minimum, change the best friend index and set the new minimum for next iteration comparisons
            if (totalDifference < minimumDifference) {
                bestFriendIndex = i;
                minimumDifference = totalDifference;
            }
        }

        // after finding match, add user to friend array
        friends.push(userInput);

        // send back to browser the best friend match
        res.json(friends[bestFriendIndex]);
    });
};

     

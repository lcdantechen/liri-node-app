var keys = require('./keys.js');
var consumerKey = keys.twitterKeys.consumer_key;
var consumerSecret = keys.twitterKeys.consumer_secret;
var tokenKey = keys.twitterKeys.access_token_key;
var tokenSecret = keys.twitterKeys.access_token_secret;
var fs = require('fs');

var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');

var input = process.argv[2];
var nodeArgs = process.argv;
var songName = "";
var movieName = "";


var client = new Twitter({
	consumer_key: consumerKey,
  consumer_secret: consumerSecret,
  access_token_key: tokenKey,
  access_token_secret: tokenSecret
});
var params = {
	screen_name: 'dantechen77',
	count: 20

};

//generate post
/*client.post('statuses/update', {status:'I Love Vi'}, function(error, tweet, response){
	
	console.log(tweet);
	console.log(response);
})*/

// get post from Twitter

if (input === "my-tweets") {
		client.get('statuses/user_timeline', params, function(error, tweets, response){
		  if (!error) {

				  	for (i=0; i<tweets.length; i++) {
				      console.log("Tweet Created at" + "\n "+ tweets[i].created_at);
				      console.log("My tweet is" + "\n"+ tweets[i].text);
				  	}
		    }
		});
} //get song info from spotify

else if (input === "spotify-this-song") {

	      for (var i=3; i<nodeArgs.length; i++){

							// Build a string with the songName.
							songName = songName + "" + nodeArgs[i];
						};
		    console.log("You like" + "" + songName);
				spotify.search({ type: 'track', query: songName }, function(err, data) {
				    if ( err ) {
				        console.log('Error occurred: ' + err);
				        return;
				    } else if (data.tracks.total === 0) {
				    	console.log('No result found.');
				    } else {
				    	
						    for (var i=0; i<data.tracks.items.length; i++) {
						    console.log("\n ");
                console.log('The'+ i + "match is" )
		            console.log("The Artist is" + " "+data.tracks.items[i].artists[0].name)
						    console.log("Preview Link to review it" + " "+data.tracks.items[i].album.external_urls.spotify)
						    console.log("The album is called" + " "+data.tracks.items[i].album.name)
						   }
						 }
				});
 } 

 else if (input === "movie-this") {

         for (var i=3; i<nodeArgs.length; i++){

							// Build a string with the songName.
							movieName = movieName + nodeArgs[i] + " ";
						};
		      console.log("You like" + " " + movieName);
		      //request from OMDB
		      request('http://www.omdbapi.com/?t='+ movieName + '&y=&plot=short&tomatoes=true&r=json', function (error, response, body) {
					  if (!error && response.statusCode == 200) {
					    /*console.log(body);
*/					    var movieObject = JSON.parse(body);
					    
					    console.log("Title:"+ " "+ movieObject.Title)
					    console.log("Year:"+ " "+ movieObject.Year)
					    console.log("IMDB Rating:"+ " " + movieObject.imdbRating)
					    console.log("Country:" + " " + movieObject.Country)
					    console.log("Language:" + " "+ movieObject.Language)
					    console.log("Plot:" + " " + movieObject.Plot)
					    console.log("Actors:" + " " + movieObject.Actors)
					    console.log("tomatoRating" + " " + movieObject.tomatoRating)
					    console.log("tomatoURL" + " " + movieObject.tomatoURL)
					    
					  }
					})


 } 
 else if (input === "do-what-it-says") {
      fs.readFile("random.txt", 'utf8', function(error, data){
				  if (error){
				  	console.log("there is an error");
				  } else{
				      console.log(data);
				      var result = data.split(',');
				      console.log(result);
				      process.argv[2] = result[0];
				      process.argv[3] = result[1];
				      
				  }
		   });
 }
 else {
		console.log("please input the correct info");
 };











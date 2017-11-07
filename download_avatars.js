var request = require('request');
// file used to prtoect git token
var secret = require('./secret');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');
//function that defines the connection
function getRepoContributors(repoOwner, repoName, cb) {
  console.log(secret);
  const options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + secret.GITHUB_TOKEN
    }
  };
  //used to parse the body object downloaded from github
  request(options, (err, res, body)=> {
    cb(err, JSON.parse(body));
  });
}
// introduce user input on the command line with argv.
// if falsey statement used as a guard if user does not input 2 arguments
getRepoContributors(process.argv[2], process.argv[3], (err, result)=> {
  if (!process.argv[2] || !process.argv[3]){
    console.log("Give me 2 arguments")
  }
  console.log("Errors:", err);
  console.log("Result:", result);
  //downloads images at contributor.avatar_url and saves them based on contributor login id
  result.forEach((contributor)=> {
    console.log(contributor);
    downloadImageByURL(contributor.avatar_url, `./avatar-photos/${contributor.login}.jpg`);

  });

});
//function which sets up the stream to pipe the images into the designated filepath
function downloadImageByURL(url, filepath){
  const stream = fs.createWriteStream(filepath);
  request({url})
  .pipe(stream);
  console.log("download complete");
}

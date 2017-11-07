var request = require('request');
var secret = require('./secret');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  console.log(secret);
  const options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + secret.GITHUB_TOKEN
    }
  };

  request(options, (err, res, body)=> {
    cb(err, JSON.parse(body));
  });
}

getRepoContributors(process.argv[2], process.argv[3], (err, result)=> {
  if (!process.argv[2] || !process.argv[3]){
    console.log("Give me 2 arguments");
    return;
  }
  console.log("Errors:", err);
  console.log("Result:", result);

  result.forEach((contributor)=> {
    console.log(contributor);
    downloadImageByURL(contributor.avatar_url, `./avatar-photos/${contributor.login}.jpg`);

  });

});





function downloadImageByURL(url, filepath){
  const stream = fs.createWriteStream(filepath);
  request({url})
  .pipe(stream);
  console.log("download complete");
}

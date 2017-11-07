var request = require('request');
var secret = require('./secret');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  console.log(secret);
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + secret.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    cb(err, JSON.parse(body));
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);

  result.forEach(function(contributor) {
    console.log(contributor.avatar_url);
  });
});



function downloadImageByURL(url, filepath){
  console.log(url);
  request.get(url)
    .on('error', function (err) {                                   // Note 2
      throw err;
    })
  .on('response', function (response) {                           // Note 3
    console.log('Response Status Code: ', response.statusCode);
  })
  .pipe(fs.createWriteStream(filepath));
  console.log("download complete");
}
return downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466" ,"./kvirani.jpg");


// }


// request.get('https://sytantris.github.io/http-examples/future.jpg')               // Note 1
//        .on('error', function (err) {                                   // Note 2
//          throw err;
//        })
//        .on('response', function (response) {                           // Note 3
//          console.log('Response Status Code: ', response.statusCode);
//        })
//        .pipe(fs.createWriteStream('./future.jpg'));
//        console.log("download complete") ;

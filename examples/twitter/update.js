var inspect = require('eyes').inspector({ maxLength : 65536 });
var commander = require('commander');
var awssum = require('awssum');
var oauth = awssum.load('oauth');
var twitterService = awssum.load('twitter/twitter');

var env = process.env;
var consumerKey = process.env.TWITTER_CONSUMER_KEY;
var consumerSecret = process.env.TWITTER_CONSUMER_SECRET;
var token = process.env.TWITTER_TOKEN;
var tokenSecret = process.env.TWITTER_TOKEN_SECRET;
// don't need the verifier

var twitter = new twitterService.Twitter(consumerKey, consumerSecret);
twitter.setToken(token);
twitter.setTokenSecret(tokenSecret);

console.log( 'ConsumerKey    :', twitter.consumerKey()                          );
console.log( 'ConsumerSecret :', twitter.consumerSecret().substr(0, 3) + '...'  );
console.log( 'Token          :', twitter.token()                                );
console.log( 'TokenSecret    :', twitter.tokenSecret().substr(0, 3) + '...'     );

var data = {
    status : 'Test automated status update from AwsSum : https://github.com/appsattic/node-awssum/',
};

twitter.Update(data, function(err, data) {
    console.log('\ncalling statuses/update - expecting success');
    inspect(err, 'Err');
    inspect(data, 'Data');
});
var inspect = require('eyes').inspector();
var amazon = require("amazon/amazon");
var snsService = require("amazon/sns");

var env = process.env;
var accessKeyId = process.env.ACCESS_KEY_ID;
var secretAccessKey = process.env.SECRET_ACCESS_KEY;
var awsAccountId = process.env.AWS_ACCOUNT_ID;

var sns = new snsService.Sns(accessKeyId, secretAccessKey, awsAccountId, amazon.US_EAST_1);

console.log( 'Region :', sns.region() );
console.log( 'EndPoint :',  sns.host() );
console.log( 'AccessKeyId :', sns.accessKeyId() );
// console.log( 'SecretAccessKey :', sns.secretAccessKey() );
console.log( 'AwsAccountId :', sns.awsAccountId() );

sns.CreateTopic({ Name : 'my-topic' }, function(err, data) {
    console.log("\nCreating (my-topic) - expecting success");
    inspect(err, 'Error');
    inspect(data, 'Data');
});

sns.CreateTopic({}, function(err, data) {
    console.log("\nCreating (undefined) - expecting failure");
    inspect(err, 'Error');
    inspect(data, 'Data');
});

sns.CreateTopic(function(err, data) {
    console.log("\nCreating (undefined) - expecting failure");
    inspect(err, 'Error');
    inspect(data, 'Data');
});

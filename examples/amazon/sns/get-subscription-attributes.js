var fmt = require('fmt');
var awssum = require('awssum');
var amazon = awssum.load('amazon/amazon');
var Sns = awssum.load('amazon/sns').Sns;

var env             = process.env;
var accessKeyId     = env.ACCESS_KEY_ID;
var secretAccessKey = env.SECRET_ACCESS_KEY;
var awsAccountId    = env.AWS_ACCOUNT_ID;

var sns = new Sns({
    'accessKeyId'     : accessKeyId,
    'secretAccessKey' : secretAccessKey,
    // 'awsAccountId'    : awsAccountId, // optional
    'region'          : amazon.US_EAST_1
});

fmt.field('Region', sns.region() );
fmt.field('EndPoint', sns.host() );
fmt.field('AccessKeyId', sns.accessKeyId().substr(0, 3) + '...' );
fmt.field('SecretAccessKey', sns.secretAccessKey().substr(0, 3) + '...' );
fmt.field('AwsAccountId', sns.awsAccountId() );

// firstly, get all of the subscriptions
sns.ListSubscriptions(function(err, data) {
    fmt.msg("listing all subscriptions - expecting success");
    fmt.dump(err, 'Error');
    fmt.dump(data, 'Data');

    // now call the GetSubscriptionAttributes()
    if ( ! err ) {
        var subscriptions = data.Body.ListSubscriptionsResponse.ListSubscriptionsResult.Subscriptions.member;
        var subscriptionArn = subscriptions[0].SubscriptionArn;
        sns.GetSubscriptionAttributes({ 'SubscriptionArn' : subscriptionArn }, function(err, data) {
            fmt.msg("GetSubscriptionAttributes - expecting success");
            fmt.dump(err, 'Error');
            fmt.dump(data, 'Data');
        });
    }

});

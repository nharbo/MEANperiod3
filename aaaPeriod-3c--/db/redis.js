var redis = require('redis');

var _client = redis.createClient(18992, "pub-redis-18992.us-east-1-4.6.ec2.redislabs.com", {no_ready_check: true});
_client.auth('nicolai', function (err) { //nicolai = password
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to Redis!")
    }
});

exports.client = _client;
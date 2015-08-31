var messages = [];
var objectId = 1;

var defaultCorsHeaders = {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
    "access-control-allow-headers": "content-type, accept",
    "access-control-max-age": 10, // Seconds.
    "Content-Type": "application/json"

    // See the note below about CORS headers.
    // Tell the client we are sending them JSON.
    // You will need to change this if you are sending something
    // other than plain text, like JSON or HTML.

};



var sendResponse = function(statusCode, data, response) {
    response.writeHead(statusCode, defaultCorsHeaders);
    response.end(data);
};


var collectData = function(request, callback) {
    var data = "";

    request.on("data", function(chunk) {
        data += chunk;
    });

    request.on("end", function() {
        callback(JSON.parse(data)); //the data will be in json format
    });
};


var actions = {
    "GET": function(request, response) {
        sendResponse(200, JSON.stringify({
            results: messages
        }), response);
    },

//For post, you have to collect the data.
    "POST": function(request, response) {

        //statusCode = 201;
        collectData(request, function(message) {
            message.objectId = ++objectId;
            messages.push(message);
            sendResponse(201, JSON.stringify({
                results: messages
            }), response);
        });
    },
    "OPTIONS": function(request, response) {
        sendResponse(200, null, response);
    }
};

module.exports.actions = actions;
module.exports.collectData = collectData;
module.exports.sendResponse = sendResponse;
module.exports.defaultCorsHeaders = defaultCorsHeaders;
module.exports.objectId = objectId;
module.exports.messages = messages;
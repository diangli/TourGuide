var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:address', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    var address=encodeURIComponent(req.params.address);
    var name = req.params.stock;
    var data = "";
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    const https = require('https');

    apiurl="https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key=AIzaSyDBMobuO8lyXMgictZsZf0dOd2kH7-Tpxs";
    const request = https.get(apiurl,function(response) {
        var size = 0;
        var chunks = [];
        response.on('data', function(chunk){
            size += chunk.length;
            chunks.push(chunk);
        });
        response.on('end', function(){
            data = Buffer.concat(chunks, size).toString('utf8');
            console.log(data);
            res.end(data);
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
    request.end(name);
});

module.exports = router;


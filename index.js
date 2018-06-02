const express = require('express');

var app = express();


app.use('/', express.static('web-client'));

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies


app.get('/rest/v1/',function(request, response) {
    response.setHeader('Content-Type', 'application/json');
    response.send({
        'course' : 'tsest'
    });
});


app.listen(3000, function(){
    console.log('tessssst');
});
const express = require('express');

var app = express();
const MongoClient = require('mongodb').MongoClient;
const jwt_secret = '9q9u9ZsaOd9pTUKjKQFHLxDGT19XiUXS';

var jwt    = require('jsonwebtoken');
var MongoId = require('mongodb').ObjectID;
var db;

app.use('/', express.static('web-client'));

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies


app.use('/rest/v1/',function(request,response,next){
    jwt.verify(request.get('JWT'), jwt_secret, function(error, decoded) {      
      if (error) {
        response.status(401).send('Unauthorized access');    
      } else {
        db.collection("users").findOne({'_id': new MongoId(decoded._id)}, function(error, user) {
          if (error){
            throw error;
          }else{
            if(user){
              next();
            }else{
              response.status(401).send({'error' : 'Credentials are wrong.'});
            }
          }
        });
      }
    });  
  })


app.post('/login', function(request, response){
    var user = request.body;
  
    db.collection("users").findOne({'username': user.username, 'password': user.password}, function(error, user) {
      if (error){
        throw error;
      }else{
        if(user){
          var token = jwt.sign(user, jwt_secret, {
            expiresIn: 20000 
          });
      
          response.send({
            success: true,
            message: 'Authenticated',
            token: token
          })
        }else{
          response.status(401).send({'error' : 'Credentials are wrong.'});
        }
      }
    });
  });

  /* Users CRUD */
  app.get('/rest/v1/users_count', function(request, response){
    db.collection('users').find().toArray((err, users) => {
      if (err) return console.log(err);
      response.setHeader('Content-Type', 'application/json');
      response.send({'user_count':users.length});
    })
  });
  app.get('/rest/v1/users', function(request, response){
    db.collection('users').find().toArray((err, users) => {
      if (err) return console.log(err);
      response.setHeader('Content-Type', 'application/json');
      response.send(users);
    })
  });
  // Add user
  app.post('/rest/v1/user/add_user', function(request, response){
    db.collection('users').save(request.body, (err, result) => {
      if (err) return console.log(err);
      response.send('OK');
    })
  });

  app.put('/rest/v1/user/edit', function(request, response){
    users = request.body;
    db.collection('users').findOneAndUpdate( {_id: new MongoId(users._id) }, {
      $set: {full_name: users.full_name, username: users.username, email: users.email}
    }, (err, result) => {
      if (err) return res.send(err);
      response.send('OK');
    })
  });

  app.delete('/rest/v1/user/delete/:id', function(request, response){
    db.collection('users').findOneAndDelete({_id: new MongoId(request.params.id)}, (err, result) => {
      if (err) return res.send(500, err)
      response.send('OK');
    })
  });


 /* Groups CRUD */
  app.get('/rest/v1/groups_count', function(request, response){
      db.collection('groups').find().toArray((err, groups) => {
        if (err) return console.log(err);
        response.setHeader('Content-Type', 'application/json');
        response.send({'groups_count':groups.length});
      })
  });
  app.get('/rest/v1/groups', function(request, response){
    db.collection('groups').find().toArray((err, groups) => {
      if (err) return console.log(err);
      response.setHeader('Content-Type', 'application/json');
      response.send(groups);
    })
  });
  app.post('/rest/v1/groups/add_group', function(request, response){
    db.collection('groups').save(request.body, (err, result) => {
      if (err) return console.log(err);
      response.send('OK');
    })
  });

  app.put('/rest/v1/groups/edit', function(request, response){
    groups = request.body;
    db.collection('groups').findOneAndUpdate( {_id: new MongoId(groups._id) }, {
      $set: {name: groups.name, type: groups.type, status: groups.status}
    }, (err, result) => {
      if (err) return res.send(err);
      response.send('OK');
    })
  });

  app.delete('/rest/v1/groups/delete/:id', function(request, response){
    db.collection('groups').findOneAndDelete({_id: new MongoId(request.params.id)}, (err, result) => {
      if (err) return res.send(500, err)
      response.send('OK');
    })
  });


MongoClient.connect('mongodb://localhost:27017/cards-app', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => console.log('localhost:3000!'))
})

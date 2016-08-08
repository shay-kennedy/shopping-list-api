var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var Storage = function(newUser) {
    //this.username = newUser;
    this.items = [];
    this.id = 0;
};

Storage.prototype.add = function(name) {
    var item = {name: name, id: this.id};
    this.items.push(item);
    this.id += 1;
    return item;
};

// Storage.prototype.update = function() {
    
// };


var storage = new Storage();
storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');


var app = express();
app.use(express.static('public'));

app.get('/items', function(request, response) {
    response.json(storage.items);
});

app.post('/items', jsonParser, function(request, response) {
    if (!request.body) {
        return response.sendStatus(400);
    }
    console.log(request.body);
    //if body has no name prevent it from being added
    if(request.body.name == undefined) {
        return response.sendStatus(405);
    }
    var item = storage.add(request.body.name);
    console.log("ITEM", item);
    response.status(201).json(item);
});

app.post('/items/:id', jsonParser, function(request, response) {
    if (!request.body) {
        return response.sendStatus(400);
    }
    var idName = request.params.id;
    for(var i = 0; i < storage.items.length; i++){
        if(idName == storage.items[i].id){
            //  405 = Method Not Allowed
    return response.sendStatus(405);
        }
    }    

    //
    response.sendStatus(405);
});

// app.get('/users/:username', jsonParser, function(request, response){
//     if (!request.body) {
//         return response.sendStatus(400);
//     }    
    
//     var newUsername = request.params.username;
//     var storage = new Storage(newUsername);
//     storage.add('Broadefastaa beans');
//     storage.add('Tomatatwttoes');
//     storage.add('Peppatewawwters');
    
//     response.status(201).json(storage);

// });

app.delete('/items/:id', jsonParser, function(request, response) {
    if (!request.body) {
        return response.sendStatus(400);
    }

    var idName = request.params.id;

    for (var index in storage.items){
      if (storage.items[index].id == idName) {
        var indexToDelete = storage.items.indexOf(storage.items[index]);
        storage.items.splice(indexToDelete, 1);
          response.status(200).json(storage.items);
          return;
      }  
    }
    return response.sendStatus(404);

});

app.delete('/items', jsonParser, function(request, response) {
    if (!request.body) {
        return response.sendStatus(400);
    }
    
    return response.sendStatus(405);
});


app.put('/items/:id', jsonParser, function(request, response) {
    if (!request.body) {
        return response.sendStatus(400);
    }
    console.log('req', request.body, request.params);
    if(request.body.name == undefined) {
        return response.sendStatus(405);
    }
    if(!request.body.name && !request.body.id){
         return response.sendStatus(405);
    }
    var idName = request.params.id;
    var idBody = request.body.id;
    // extract id from 2 places
    // body a.k.a. response
    // url a.k.a. request
    if(idBody !== undefined){
     if(idBody !== idName){
         return response.sendStatus(405);
     }
    }
    for (var index in storage.items){
      if (storage.items[index].id == idName) {
          storage.items[index].name = request.body.name;
          response.status(201).json(storage.items[index]);
          return;
      }
    }
    return response.sendStatus(404);    
    // var item = storage.add(request.body.name);
    // response.status(201).json(item);
});

app.put('/items', jsonParser, function(request, response) {
    if (!request.body) {
        return response.sendStatus(400);
    }
    
    return response.sendStatus(405);
});

app.listen(process.env.PORT, process.env.IP);
exports.app = app;
exports.storage = storage;
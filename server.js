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

    var item = storage.add(request.body.name);
    response.status(201).json(item);
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
          response.status(201).json(storage.items);
          return;
      }  
    }
    return response.sendStatus(404);

});


app.put('/items/:id', jsonParser, function(request, response) {
    if (!request.body) {
        return response.sendStatus(400);
    }
    
    var idName = request.params.id;

    for (var index in storage.items){
      if (storage.items[index].id == idName) {
          storage.items[idName].name = request.body.name;
          response.status(201).json;
          return;
      }
    }

    var item = storage.add(request.body.name);
    response.status(201).json(item);
});

app.listen(process.env.PORT, process.env.IP);
var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var Storage = function() {
    this.items = [];
    this.id = 0;
};

Storage.prototype.add = function(name) {
    var item = {name: name, id: this.id};
    this.items.push(item);
    this.id += 1;
    return item;
};

// Storage.prototype.remove = function(idName) {
//     // Need to match the item clicked on to the item in the list array
//     // Once item matches, will need to remove that item
//     // Then return remaining array
//     var i = this.items.length;
//     for (var i = 0; i < this.items.length; i++) {
//         if (this.items[i].id === idName)
//             this.items.splice(i, 1);
//     }
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

    var item = storage.add(request.body.name);
    response.status(201).json(item);
});

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
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongojs = require("mongojs");
var db = mongojs("sampleDB",["serviceClientsCol"]);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get("/serviceClients",function(req,res){
	db.serviceClientsCol.find(function(err,docs){
		res.json(docs);
	});
});


//Insert into the database
app.post("/serviceClients",function(req,res){
	var svc = req.body;
	console.log(svc);
	
	
	db.serviceClientsCol.insert(req.body, function(err,doc){
		res.json(doc);
	});
});

//Delete the entry from db
app.delete("/serviceClients/:id",function(req,res){
	var id = req.params.id;
	db.serviceClientsCol.remove({_id : mongojs.ObjectId(id)},
	function(err , doc){
		res.json(doc);
	});
});

//Edit one record
app.get("/serviceClients/:id",function(req,res){
	var id = req.params.id;
	db.serviceClientsCol.findOne({_id : mongojs.ObjectId(id)},
	function(err,doc){
		res.json(doc);
	});
});

//Update
app.put("/serviceClients/:id/:name",function(req,res){
	var id = req.params.id;
	var name = req.params.name;
	db.serviceClientsCol.findAndModify({query:{_id: mongojs.ObjectId(id)},
							  update: {name: name}},
		function (err, doc) {
			res.json(doc);
	});
});

app.listen(3000);


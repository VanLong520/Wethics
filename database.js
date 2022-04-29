//test connect to database

const { Double } = require('mongodb');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://vanlong521:ceDiR3eo3SlU843O@cluster0.9rmar.mongodb.net/Wethics?retryWrites=true&w=majority"
var mongo = new MongoClient (url, {useNewUrlParser : true});
mongo.connect((err, db) => {
    if (err) throw err;

    console.log("connexion réussie");
    var dbo = db.db ("Wethics")
    var obj = {lastname:"NGO"}
    dbo.collection("Users").find().toArray((err, objs) => {
        if (err) throw err;
        console.log(objs);
        db.close();
    });
});
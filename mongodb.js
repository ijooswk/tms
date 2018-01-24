var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/tms";

// Initialize connection once


function getAll() {
    MongoClient.connect(url, function(err, database) {
        if(err) console.log('error!', err);
        var mydb = database.db('tms');
        mydb.collection("translation").find({}, function(err, docs) {
            docs.each(function(err, doc) {
              if(doc) {
                console.log(doc);
              }
              else {
                //res.end();
              }
            });
        });
      });
    
}

function insertMany (str){
    MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        const myDb = client.db('tms');
        //var query = { address: "Park Lane 38" };
        let data = JSON.stringify(str);
        console.data(data);
        myDb.collection('translation', function(err, collection) {
            if (err) console.log(err);
            collection.insertMany(str, function(err, res){
        });
        client.close();
      });
    });
}

function insertArray (nArr){
    MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        const myDb = client.db('tms');
        
        var title = nArr[0];
        
        myDb.collection('translation', function(err, collection) {
            console.log('length is ', nArr.length);
            for(var i=1; i<nArr.length; i++){
                var str = {
                    Screenname: nArr[i][1],
                    Section: nArr[i][2],
                    English: nArr[i][3],
                    Spanish: nArr[i][4],
                    Catalan: nArr[i][5],
                    Thai: nArr[i][6],
                };
                console.log(i,"data: ", str);
                collection.insertOne(str, function(err, res){
                    if (err) err;
                });    
            }
        client.close();
      });
    });
}

module.exports = {
    insertMany,
    insertArray,
    getAll
}
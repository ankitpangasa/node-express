const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url, (err, client) => {
    assert.equal(err,null);
    console.log('Connected correctly to server');

    const db = client.db(dbname);
    const collection = db.collection('dishes');

    var myobj = [
        { name: 'Peter123', address: '343Lowstreet 4'},
        { name: 'John', address: 'Highway 71'},
        { name: 'Peter', address: 'Lowstreet 4'}
    ]

    collection.insertMany(myobj, (err, result) => {
        assert.equal(err,null);
        var user = 'Bob'
        console.log(`inserted correctly in ${dbname}`);
        console.log(result.ops);

        collection.find({}).toArray((err, docs) => {
            assert.equal(err,null);
            console.log("Found:\n");
            console.log(docs);
        });

        collection.findOne({},(err, docs) => {
            assert.equal(err,null);
            console.log("Found:\n");
            console.log(docs);

            db.dropCollection('dishes', (err,result) => {
                assert.equal(err,null);
                console.log("collection dropped");
                console.log(db.collections().name)
                client.close();
            });
        });
    });

});


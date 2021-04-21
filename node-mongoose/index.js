const mongoose = require('mongoose');

const Dishes = require('./models/dishes');
const url = "mongodb://localhost:27017/conFusion"

mongoose.connect(url).then(() => {
    var newDish = new Dishes({name: "Uthapizza", description: "test"});
    Dishes.remove({})
    .then(() => {
        return newDish.save();
    })
    .then((dish) => {
        console.log("inserting dish " + dish);
        return Dishes.find({});
    })
    .then((dishes) => {
        console.log(dishes);
        return Dishes.remove({});
    })
    .then(() => {
        return mongoose.connection.close();
    })
    .catch((error) => {
        console.log("Encountered exception " + error);
    })
})
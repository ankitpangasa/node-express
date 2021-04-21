const mongoose = require('mongoose');

const Dishes = require('./models/dishes');
const url = "mongodb://localhost:27017/conFusion"

mongoose.connect(url).then(() => {
    Dishes.create({name: "Uthapizza", description: "test"})
    .then((dish) => {
        console.log("inserting dish " + dish);
        return Dishes.findByIdAndUpdate(dish._id, 
            {
                $set: {description: "Updated description"},
            },
            {
                new: true
            }
        )
    })
    .then((dish) => {
        console.log("Updating dish " + dish);
        dish.comments.push({
            rating: 5,
            comment: 'I\'m getting a sinking feeling!',
            author: 'Leonardo di Carpaccio'
        })
        return dish.save();
    })
    .then((dish) => {
        console.log("Removing dish " + dish);
        return Dishes.remove({});
    })
    .then(() => {
        return mongoose.connection.close();
    })
    .catch((error) => {
        console.log("Encountered exception " + error);
    })
})
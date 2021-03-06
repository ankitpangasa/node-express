const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commmentSchema = new Schema(
    {
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        comment: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    });

const dishSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        },
        comments: [commmentSchema]
    },{
        timestamps: true
    });

var Dishes = mongoose.model('Dish', dishSchema);
module.exports = Dishes;
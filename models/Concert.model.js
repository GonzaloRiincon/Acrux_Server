const { Schema, model } = require("mongoose");

const concertSchema = new Schema(
    {
        artist: {
            type: String,
        },
        city: {
            type: String,
        },
        date: {
            type: String,
        },
        time: {
            type: String,
        },
        price: {
            type: Number,
        },
    },
    {
        timestamps: true
    }
);

const Concert = model("Concert", concertSchema)

module.exports = Concert
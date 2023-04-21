const { Schema, model } = require("mongoose");

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name required'],
            maxlength: [25, 'The name should have maximun 25 characters']
        },
        price: {
            type: String,
            required: [true, 'Price required']
        },
        description: {
            type: String,
            maxlength: [100, 'The desciption should have maximun 100 characters']
        },
    },
    {
        timestamps: true
    }
);

const Product = model("Product", productSchema)

module.exports = Product
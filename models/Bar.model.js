const { Schema, model } = require("mongoose");

const barSchema = new Schema(
    {
        products: {
            type: [{
                productInfo: {
                    ref: 'Product',
                    type: Schema.Types.ObjectId
                },
                cuantity: {
                    type: String,
                    required: [true, 'Cuantity required']
                }
            }],
            validate: {
                validator: function (arr) {
                    return arr.length >= 1;
                },
                message: 'Should have at least 1 product'
            }
        },

    },
    {
        timestamps: true
    }
)

// He creado un método para que cuando se compre un producto, haga que la cantidad de ese mismo producto disminuya en uno.
// Tiene que pasar varios "filtros" para evitar fallos del sistema. En caso de que no se encuentre ese producto en esta barra,
// devuelve un error, y en caso de que la cantidad del producto sea 0, salta otro error de que no quedan más unidades de dicho producto.
// En caso de que pase esos "filtros", significa que se puede comprar, y por lo tanto la cantidad se ve reducida por el número de unidades
// que el mismo usuario quiere de dicho producto (cantidad anterior - cantidad a comprar)

barSchema.methods.purchaseProduct = function (productId, units) {
    const bar = this;
    const productIndex = bar.products.findIndex(product => product.productInfo.equals(productId));
    if (productIndex === -1) {
        return Promise.reject(new Error(`Product with ID ${productId} not found in bar`));
    }
    const product = bar.products[productIndex];
    if (product.cuantity === '0') {
        return Promise.reject(new Error(`Product with ID ${productId} is out of stock`));
    }
    product.cuantity = String(parseInt(product.cuantity) - units);
    return bar.save();
}

const Bar = model("Bar", barSchema)

module.exports = Bar
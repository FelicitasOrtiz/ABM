const fs = require('fs');
const { userInfo } = require('os');
var products = JSON.parse(fs.readFileSync(__dirname + '/../database/products.json'));


const productsController = {

    create: function(req, res, next){
        res.render('create');
    },
    store: function(req, res, next){
        console.log(req.body)
        products.push(req.body);
        var productsJSON = JSON.stringify(products);
        fs.writeFileSync(__dirname + '/../database/products.json', productsJSON);
        res.send('Producto creado');
    },

    edit: function(req, res, next){
        var idProduct = req.params.id;
        var productFound;
        for(var i = 0; i < products.length; i++){
            if(products[i].id == idProduct){
                productFound = products[i];
                break;
            }
        }    
        if(productFound){
            res.render('edit', {productFound});
        } else {
            res.send('Producto no encontrado');
        }

    },
    update: function(req, res, next){
        var idProduct = req.params.id;
        
        var editProduct = products.map(function(product){
            if(product.id == idProduct){
                let productEditado = req.body;
                productEditado.id = idProduct;
                return productEditado;
            }
            return product;
        })
        editProductJSON = JSON.stringify(editProduct);
        fs.writeFileSync(__dirname + '/../database/products.json', editProductJSON);
        res.redirect('/edit/' + idProduct);
    },
    destroy: function(req, res, next){
        var idProduct = req.params.id;
        var productsDestroy = products.filter(function(product){
            if(product.id == idProduct) {
                return true
            }
        });
        if(productsDestroy.length === 0) {
            res.send('el producto no existe');
        } else {
            var updateProducts = products.filter(function(product) { if(product.id != idProduct) return true });
            fs.writeFileSync(__dirname + '/../database/products.json', JSON.stringify(updateProducts));
            res.send('producto eliminado');
        }
    }

}

module.exports = productsController;
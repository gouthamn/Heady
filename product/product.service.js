var productModel = require('./product.model');
var categoryService = require('../category/category.service');

exports.create = async (payload) => {
    await categoryService.validateCategoryDetails(payload.categories);
    return productModel.create(payload);
};

exports.fetchProductsForCategories = (categories) => {
    return new Promise((resolve, reject) => {
        productModel.find({categories : {$in : categories}}).lean().then(results => {
            resolve(results);
        }).catch(err => {
            reject(err);
        })
    });
}

exports.update = async (payload) => {
    await categoryService.validateCategoryDetails(payload.categories);
    return productModel.updateOne({_id : payload.productId}, payload, {runValidators : true}).exec();
}
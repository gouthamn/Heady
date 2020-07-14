var categoryService = require('./category.service');
var productService = require('../product/product.service');

exports.createCategory = async (req, res) => {
    try {
        await categoryService.createCategory(req.body);
        res.status(200).json({
            success: true
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err
        });
    }
}

let childmap = {}
populateChildren = (category) => {
    let children = category.childCategories;
    if (children && children.length > 0) {
        category.childCategories = children.map(function (obj) {
            return childmap[obj];
        })
        for (let child of category.childCategories) {
            populateChildren(child);
        }
    }
}

exports.fetchCategories = async (req, res) => {
    try {
        const result = await categoryService.fetch();
        for (let category of result) {
            childmap[category._id] = category
        }
        const rootCategories = result.filter(function (obj) {
            if (!obj.parent) {
                return true
            }
        });
        let output = [];
        for (let category of rootCategories) {
            populateChildren(category);
            output.push(category);
        }
        res.status(200).json({
            success: true,
            data: output
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err
        });
    }
}

exports.fetchProductsByCategory = async (req, res) => {
    try {
        let categories = await categoryService.fetchCategoryDescendants(req.query.category);
        categories.push(req.query.category);
        const products = await productService.fetchProductsForCategories(categories);
        res.status(200).json({
            success: true,
            data: products
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err
        });
    }
}
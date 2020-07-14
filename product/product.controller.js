var productService = require('./product.service');

exports.createProduct = async (req, res) => {
    try {
        await productService.create(req.body);
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

exports.updateProduct = async (req, res) => {
    try {
        await productService.update(req.body);
        res.status(200).json({
            success: true
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err
        });
    }
}
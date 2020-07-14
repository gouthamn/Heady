var categoryModel = require('./category.model');

exports.createCategory = async (payload) => {
    let data = payload;
    if (data.parentCategories && data.parentCategories.length > 0) {
        data.parent = data.parentCategories[data.parentCategories.length - 1];
    }
    return new Promise((resolve, reject) => {
        categoryModel.create(data, function (err, result) {
            if (err) {
                reject(err);
            }
            else {
                categoryModel.findByIdAndUpdate(data.parent, { $push : { childCategories: result._id.toString() } }).exec();
                resolve(result);
            }
        });
    });
};

exports.validateCategoryDetails = (categories) => {
    return new Promise((resolve, reject) => {
        categoryModel.find({_id : {$in : categories}}, function(err, results) {
            if(err) {
                reject(err);
            }
            else {
                resolve(results);
            }
        });
    });
}

exports.fetchCategoryDescendants = (category) => {
    return new Promise((resolve, reject) => {
        categoryModel.find({parentCategories : category}).select({_id : 1}).lean().then(results => {
            results = results.map((obj) => obj._id.toString());
            resolve(results);
        }).catch(err => {
            reject(err);
        })
    });
}

exports.fetch = () => {
    return categoryModel.find().select({ _id: 1, childCategories : 1, name : 1, parent : 1 }).lean();
}
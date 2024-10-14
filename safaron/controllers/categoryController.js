const Category = require('../models/categoryModel');

exports.index = async(req, res) => {
    const categories = await Category.findAll();
    res.render('categories/list', {categories})
}

exports.showCreateForm = (req, res) => {
    res.render('categories/create')
}

exports.create = async (req, res) => {
    const { name } = req.body;
    await Category.create(name);
    res.redirect('/categories')
}

exports.showEditForm = async(req, res) => {
    const category = await Category.findById(req.params.id);
    res.render('categories/edit', {category})
}

exports.update = async(req, res) => {
    const { name } = req.body;
    await Category.update(req.params.id, name);
    res.redirect('/categories')
}

exports.delete = async (req, res) => {
    await Category.delete(req.params.id);
    res.redirect('/categories')
}
const Author = require('../models/authorModel');

exports.index = async(req, res) => {
    const authors = await Author.findAll();
    res.render('authors/list', {authors})
}

exports.showCreateForm = (req, res) => {
    res.render('authors/create')
}

exports.create = async (req, res) => {
    const { name, email } = req.body;
    await Author.create(name, email);
    res.redirect('/authors')
}

exports.showEditForm = async(req, res) => {
    const author = await Author.findById(req.params.id);
    res.render('authors/edit', {author})
}

exports.update = async(req, res) => {
    const { name, email } = req.body;
    await Author.update(req.params.id, name, email);
    res.redirect('/authors')
}

exports.delete = async (req, res) => {
    await Author.delete(req.params.id);
    res.redirect('/authors')
}
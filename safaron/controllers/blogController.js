const Blog = require('../models/blogModel');
const Author = require('../models/authorModel');
const Category = require('../models/categoryModel');
const multer = require('multer');
const path = require('path');
const utils = require('../utils/main.js');

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
}).single('photo');

exports.list = async (req, res) => {
    try {
        const blogs = await Blog.findAll();
        res.render('blogs/list', {blogs})
    } catch (error) {
        console.error('Error from list blog: ', error);
        res.status(500).send('Internal Server Error');
    }
}

exports.showCreateForm = async (req, res) => {
    try {
        const authors = await Author.findAll();
        const categories = await Category.findAll();
        res.render('blogs/create', {authors, categories})
    } catch (error) {
        console.error('Error from show create form blog: ', error);
        res.status(500).send('Internal Server Error');   
    }
}

exports.create = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error('Error from create blog: ', err);
            return res.status(500).send('Error uploading photo');
        }
        const { author_id, category_id, title, content } = req.body;
        const photo = req.file ? req.file.filename : null;
        try{
            await Blog.create(author_id, category_id, title, content, photo);
            res.redirect('/admin/blogs');
        } catch (error){
            console.error('Error from create blog: ', error);
            res.status(500).send('Internal Server Error');
        }
    })
}

exports.showEditForm = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        const authors = await Author.findAll();
        const categories = await Category.findAll();
        res.render('blogs/edit', {blog, authors, categories})
    } catch (error) {
        console.error('Error from show edit form blog: ', error);
        res.status(500).send('Internal Server Error');
    }
}

exports.update = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error('Error from update blog: ', err);
            return res.status(500).send('Error uploading photo');
        }
        const { author_id, category_id, title, content } = req.body;
        const photo = req.file ? req.file.filename : null;
        try{
            await Blog.update(req.params.id, author_id, category_id, title, content, photo);
            res.redirect('/admin/blogs');
        } catch (error){
            console.error('Error from update blog: ', error);
            res.status(500).send('Internal Server Error');
        }
    })
}

exports.delete = async (req, res) => {
    try {
        await Blog.delete(req.params.id);
        res.redirect('/admin/blogs');
    } catch (error) {
        console.error('Error delete blog: ', error);
        res.status(500).send('Server Error');
    }
}


//for frontend

exports.index = async (req, res) => {
    try {
        const blogs = await Blog.findAll();
        res.render('blogs/index', {blogs, truncateText: utils.truncateText})
    } catch (error) {
        console.error('Error from index blog: ', error);
        res.status(500).send('Internal Server Error');
    }
}

exports.show = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        res.render('blogs/show', {blog})
    } catch (error) {
        console.error('Error from show blog: ', error);
        res.status(500).send('Internal Server Error');
    }
}
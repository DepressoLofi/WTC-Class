const express = require('express');
const blogController = require('../controllers/blogController');

const router = express.Router();

router.get('/admin/blogs', blogController.list);
router.get('/blogs/create', blogController.showCreateForm);
router.post('/blogs', blogController.create);
router.get('/blogs/edit/:id', blogController.showEditForm);
router.post('/blogs/edit/:id', blogController.update);
router.post('/blogs/delete/:id', blogController.delete);

router.get('/blogs', blogController.index);
router.get('/blogs/:id', blogController.show);

module.exports = router;
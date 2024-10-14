const express = require('express');
const authorController = require('../controllers/authorController');

const router = express.Router();

router.get('/authors', authorController.index);
router.get('/authors/create', authorController.showCreateForm);
router.post('/authors', authorController.create);
router.get('/authors/edit/:id', authorController.showEditForm);
router.post('/authors/edit/:id', authorController.update);
router.post('/authors/delete/:id', authorController.delete);

module.exports = router;
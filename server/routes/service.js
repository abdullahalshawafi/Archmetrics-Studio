const router = require('express').Router();
const {
  getAllServices,
  getSingleService,
  createService,
  editService,
  deleteService,
} = require('../controllers/serviceController');
const { isAuth } = require('../middleware/authMiddleware');

router.get('/', getAllServices);

router.get('/:slug', getSingleService);

router.post('/create', isAuth, createService);

router.put('/edit/:slug', isAuth, editService);

router.delete('/delete/:slug', isAuth, deleteService);

module.exports = router;

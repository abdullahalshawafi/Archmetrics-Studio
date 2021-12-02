const router = require("express").Router();
const {
    getAllServices,
    getSingleService,
    createService,
    editService,
    deleteService
} = require("../controllers/serviceController");

router.get('/', getAllServices);

router.get('/:slug', getSingleService);

router.post('/create', createService);

router.put('/edit/:slug', editService);

router.delete('/delete/:slug', deleteService);

module.exports = router;
const router = require("express").Router();
const {
    getAllServices,
    getSingleService,
    createService,
    editService,
    deleteService
} = require("../controllers/serviceController");

router.get('/', getAllServices);

router.get('/:id', getSingleService);

router.post('/create', createService);

router.put('/edit/:id', editService);

router.delete('/delete/:id', deleteService);

module.exports = router;
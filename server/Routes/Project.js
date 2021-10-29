const router = require("express").Router();
const {
    getAllProjects,
    getSingleProject,
    createProject,
    editProject,
    deleteProject
} = require("../controllers/projectController");

router.get('/', getAllProjects);

router.get('/:id', getSingleProject);

router.post('/create', createProject);

router.put('/edit/:id', editProject);

router.delete('/delete/:id', deleteProject);

module.exports = router;
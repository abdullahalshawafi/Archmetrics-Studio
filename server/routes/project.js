const router = require("express").Router();
const {
    getAllProjects,
    getSingleProject,
    createProject,
    editProject,
    deleteProject
} = require("../controllers/projectController");

router.get('/', getAllProjects);

router.get('/:slug', getSingleProject);

router.post('/create', createProject);

router.put('/edit/:slug', editProject);

router.delete('/delete/:slug', deleteProject);

module.exports = router;
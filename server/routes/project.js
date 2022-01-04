const router = require("express").Router();
const {
    getAllProjects,
    getSingleProject,
    createProject,
    editProject,
    deleteProject
} = require("../controllers/projectController");
const { isAuth } = require("../middleware/authMiddleware");

router.get('/', getAllProjects);

router.get('/:slug', getSingleProject);

router.post('/create', isAuth, createProject);

router.put('/edit/:slug', isAuth, editProject);

router.delete('/delete/:slug', isAuth, deleteProject);

module.exports = router;
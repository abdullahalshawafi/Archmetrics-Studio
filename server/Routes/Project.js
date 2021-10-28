const router = require("express").Router();
const Project = require("../models/Project");

router.post('/', async (req, res) => {
    try {
        const project = await Project.create(req.body);
        await project.save();
        res.sendStatus(200);
    } catch (err) {
        res.json({ error: err });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        res.json({ project });
    } catch (err) {
        res.json({ error: err });
    }
});

router.put('/:id', async (req, res) => {
    try {
        await Project.findByIdAndUpdate(req.params.id, req.body);
        res.sendStatus(200);
    } catch (err) {
        res.json({ error: err });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Project.findByIdAndRemove(req.params.id);
        res.sendStatus(200);
    } catch (err) {
        res.json({ error: err });
    }
});

module.exports = router;
const Project = require('../models/Project');
const projectValidations = require('../validations/projectValidations');

const trimInputFields = fields => {
    for (const field in fields) {
        if (Object.hasOwnProperty.call(fields, field) && typeof fields[field] === "string") {
            fields[field] = fields[field].trim();
        }
    }
}

module.exports = {
    getAllProjects: async (req, res) => {
        try {
            const projects = await Project.find({});
            res.status(200).json({ projects });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ error: "An error has occurred please try again" });
        }
    },

    getSingleProject: async (req, res) => {
        try {
            const project = await Project.findById(req.params.id);
            res.status(200).json(project);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ error: "An error has occurred please try again" });
        }
    },

    createProject: async (req, res) => {
        try {
            trimInputFields(req.body);

            const { error } = projectValidations.validate(req.body);

            if (error) {
                const errorMessages = error.details.map(err => err.message);
                return res.status(400).json({ errorMessages });
            }

            const newProject = await new Project(req.body);
            await newProject.save();
            res.sendStatus(200);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ error: "An error has occurred please try again" });
        }
    },

    editProject: async (req, res) => {
        try {
            trimInputFields(req.body);

            const { error } = projectValidations.validate(req.body);

            if (error) {
                const errorMessages = error.details.map(err => err.message);
                return res.status(400).json({ errorMessages });
            }

            await Project.findByIdAndUpdate(req.params.id, req.body);
            res.sendStatus(200);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ error: "An error has occurred please try again" });
        }
    },

    deleteProject: async (req, res) => {
        try {
            await Project.findByIdAndRemove(req.params.id);
            res.sendStatus(200);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ error: "An error has occurred please try again" });
        }
    }
};
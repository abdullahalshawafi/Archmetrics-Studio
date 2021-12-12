const Service = require('../models/Service');
const Project = require('../models/Project');
const projectValidations = require('../validations/projectValidations');
const trimInputFields = require('../helpers/trimInputFields');
const {UploadtoGCP} = require('./imageController')
module.exports = {
    getAllProjects: async (req, res) => {
        try {
            const projects = await Project.find({}, "-_id -__v -description -services");
            res.status(200).json({ projects });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ error: "An error has occurred please try again" });
        }
    },

    getSingleProject: async (req, res) => {
        try {
            const project = await Project.findOne({ slug: req.params.slug }, "-_id -__v").populate("services", "-_id title slug");
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

            const slug = req.body.title.toLowerCase().split(' ').join('-');

            const project = await Project.findOne({ slug });

            if (project) {
                return res.status(400).json({ error: "This project already exists" });
            }

            const reqServices = req.body.services;

            delete req.body.services;

            let images=req.body.images

            images.forEach((img)=>{
                UploadtoGCP(img)
            })
            images = images.map((img)=>{
                return 'https://storage.googleapis.com/archmetrics/'+img
            })

            const {title,description,link,services} = req.body

            const newProject = await Project.create({ title,description,link,services,images, slug });
            newProject.services = [];

            const servicesdb = await Service.find({ slug: { "$in": reqServices } });

            servicesdb.forEach(async service => {
                newProject.services.push(service._id);
                await Service.findByIdAndUpdate(service._id, { "$push": { projects: newProject._id } });
            });

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

            const slug = req.body.title.toLowerCase().split(' ').join('-');

            const project = await Project.findOne({ slug });

            if (project && req.params.slug !== slug) {
                return res.status(400).json({ error: "This project already exists" });
            }

            const reqServices = req.body.services;

            delete req.body.services;

            const updatedProject = await Project.findOneAndUpdate({ slug: req.params.slug }, { ...req.body, slug }, { new: true });
            updatedProject.services = [];

            const services = await Service.find({ slug: { "$in": reqServices } }).populate("projects", "_id");

            services.forEach(async service => {
                updatedProject.services.push(service._id);
                if (service.projects.indexOf(updatedProject._id) === -1) {
                    await Service.findByIdAndUpdate(service._id, { "$push": { projects: updatedProject._id } });
                    console.log(service.projects.indexOf(updatedProject._id) == -1);
                }
            });

            await updatedProject.save();

            res.sendStatus(200);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ error: "An error has occurred please try again" });
        }
    },

    deleteProject: async (req, res) => {
        try {
            await Project.findOneAndRemove({ slug: req.params.slug });
            res.sendStatus(200);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ error: "An error has occurred please try again" });
        }
    }
};
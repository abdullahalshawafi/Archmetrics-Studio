const trimInputFields = require('../helpers/trimInputFields');
const Project = require('../models/Project');
const Service = require('../models/Service');
const { uploadToGCP, deleteFile } = require('./imageController');

module.exports = {
    getAllServices: async (req, res) => {
        try {
            const services = await Service.find({}, "-_id -__v -description -projects").sort({ title: 'asc' });

            res.status(200).json({ services });

        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ error: "An error has occurred please try again" });
        }
    },

    getSingleService: async (req, res) => {
        try {
            const service = await Service.findOne({ slug: req.params.slug }, "-_id -__v").populate("projects", "-_id -__v -services", null, { sort: { date: 'desc' } });
            if (service) {
                res.status(200).json({ service });
            } else {
                res.sendStatus(404);
            }
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ error: "An error has occurred please try again" });
        }
    },

    createService: async (req, res) => {
        try {
            trimInputFields(req.body);

            const slug = req.body.title.toLowerCase().split(' ').join('-');

            const service = await Service.findOne({ slug });

            if (service) {
                return res.status(400).json({ error: "This service already exists" });
            }

            // Upload cover image to cloud storage
            uploadToGCP(req.body.cover);
            req.body.cover = 'https://storage.googleapis.com/archmetrics/' + req.body.cover;

            await Service.create({ ...req.body, slug });

            res.sendStatus(200);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ error: "An error has occurred please try again" });
        }
    },

    editService: async (req, res) => {
        try {
            trimInputFields(req.body);

            const slug = req.body.title.toLowerCase().split(' ').join('-');

            let service = await Service.findOne({ slug });

            if (service && req.params.slug !== slug) {
                return res.status(400).json({ error: "This service already exists" });
            }

            if (service && service.cover !== 'https://storage.googleapis.com/archmetrics/' + req.body.cover) {
                uploadToGCP(req.body.cover);
                deleteFile(service.cover)
                req.body.cover = 'https://storage.googleapis.com/archmetrics/' + req.body.cover;
            }

            await Service.findOneAndUpdate({ slug: req.params.slug }, { ...req.body, slug });

            res.sendStatus(200);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ error: "An error has occurred please try again" });
        }
    },

    deleteService: async (req, res) => {
        try {
            const { _id, cover, projects } = await Service.findOneAndRemove({ slug: req.params.slug });

            deleteFile(cover);

            projects.forEach(async service => {
                const updatedProject = await Project.findById(service._id);
                updatedProject.projects = updatedProject.services.filter(serviceId => !serviceId.equals(_id));
                await updatedProject.save();
            });

            res.sendStatus(200);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ error: "An error has occurred please try again" });
        }
    }
};
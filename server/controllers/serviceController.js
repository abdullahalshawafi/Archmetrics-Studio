const Service = require('../models/Service');

module.exports = {
    getAllServices: async (req, res) => {
        try {
            const services = await Service.find({}, "-_id -__v -description -projects");

            res.status(200).json({ services });

        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ error: "An error has occurred please try again" });
        }
    },

    getSingleService: async (req, res) => {
        try {
            const service = await Service.findById(req.params.id, "-_id -__v -summary").populate("projects", "-_id -__v -projects");
            res.status(200).json(service);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ error: "An error has occurred please try again" });
        }
    },

    createService: async (req, res) => {
        try {
            const { title } = req.body
            const slug = title.toLowerCase().split(' ').join('-');

            const service = await Service.findOne({ slug });

            if (service) {
                return res.status(400).json({ error: "This service already exists" });
            }

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
            const { title } = req.body
            const slug = title.toLowerCase().split(' ').join('-');

            const service = await Service.findByIdAndUpdate(req.params.id, { ...req.body, slug }, { new: true });
            res.status(200).json({ service });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ error: "An error has occurred please try again" });
        }
    },

    deleteService: async (req, res) => {
        try {
            await Service.findByIdAndRemove(req.params.id);
            res.sendStatus(200);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ error: "An error has occurred please try again" });
        }
    }
};
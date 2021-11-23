const Services = require('../models/Services');


module.exports = {
    getAllServices: async (req, res) => {
        try {
            const services = await Services.find({});
            
            const ServicesTitle = services.map((service) => {
                return service.title
            })
            
            res.status(200).json({ ServicesTitle });

        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ error: "An error has occurred please try again" });
        }
    },

    getSingleService: async (req, res) => {
        try {
            const service = await Services.findById(req.params.id);
            res.status(200).json(service);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ error: "An error has occurred please try again" });
        }
    },

    createService: async (req, res) => {
        try {
            const {title ,summary,description , images} = req.body
            const NoSlugTitle = title.split(' ').join('-');
            
            
            await Services.create({title:NoSlugTitle ,summary,description , images});

            res.sendStatus(200);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ error: "An error has occurred please try again" });
        }
    },

    editService: async (req, res) => {
        try {
            
            
            await Services.findByIdAndUpdate(req.params.id, req.body);
            res.sendStatus(200);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ error: "An error has occurred please try again" });
        }
    },

    deleteService: async (req, res) => {
        try {
            await Services.findByIdAndRemove(req.params.id);
            res.sendStatus(200);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ error: "An error has occurred please try again" });
        }
    }
};
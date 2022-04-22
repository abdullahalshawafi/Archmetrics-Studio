const Service = require("../models/Service");
const Project = require("../models/Project");
const trimInputFields = require("../helpers/trimInputFields");
const { uploadToGCP, deleteFile } = require("./imageController");

module.exports = {
  getAllProjects: async (req, res) => {
    try {
      const projects = await Project.find(
        {},
        "-_id -__v -description -services"
      ).sort({ year: -1, title: 1 });
      res.status(200).json({ projects });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: "An error has occurred please try again" });
    }
  },

  getSingleProject: async (req, res) => {
    try {
      const project = await Project.findOne(
        { slug: req.params.slug },
        "-_id -__v"
      ).populate("services", "-_id title slug", null, {
        sort: { title: "asc" },
      });
      res.status(200).json({ project });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: "An error has occurred please try again" });
    }
  },

  createProject: async (req, res) => {
    try {
      trimInputFields(req.body);

      // Sort body images alphabetically (excluding the date part in the image name)
      req.body.images.sort((a, b) => {
        if (a.slice(25) < b.slice(25)) {
          return -1;
        }
        if (a.slice(25) > b.slice(25)) {
          return 1;
        }
        return 0;
      });

      // Generate a slug for the project
      const slug = req.body.title.toLowerCase().split(" ").join("-");

      // Check if the project already exists
      const project = await Project.findOne({ slug });

      if (project) {
        return res.status(400).json({ error: "This project already exists" });
      }

      const reqServices = req.body.services;
      delete req.body.services;

      // Upload project's cover image and gallery images to cloud storage
      uploadToGCP(req.body.cover);
      req.body.cover = process.env.CLOUD_STORAGE_PATH + req.body.cover;
      req.body.images = req.body.images.map((img) => {
        uploadToGCP(img);
        return process.env.CLOUD_STORAGE_PATH + img;
      });

      // Create a new project
      const newProject = await Project.create({ ...req.body, slug });

      // Initialize the services of the project to an empty array
      newProject.services = [];

      // Get from the services collection, the services that are used in the new project
      const projectServices = await Service.find({
        slug: { $in: reqServices },
      });

      // For each service, add it to the project's services array and add the project to the service's projects array
      projectServices.forEach(async (service) => {
        newProject.services.push(service._id);
        await Service.findByIdAndUpdate(service._id, {
          $push: { projects: newProject._id },
        });
      });

      // Finally, save the project
      await newProject.save();

      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: "An error has occurred please try again" });
    }
  },

  editProject: async (req, res) => {
    try {
      trimInputFields(req.body);

      const slug = req.body.title.toLowerCase().split(" ").join("-");

      let project = await Project.findOne({ slug }).populate(
        "images",
        "-_id -__v"
      );

      if (project && req.params.slug !== slug) {
        return res.status(400).json({ error: "This project already exists" });
      }

      if (project && project.cover !== req.body.cover) {
        uploadToGCP(req.body.cover);
        deleteFile(project.cover);
        req.body.cover = process.env.CLOUD_STORAGE_PATH + req.body.cover;
      }

      if (!project) {
        project = await Project.findOne({ slug: req.params.slug }).populate(
          "images",
          "-_id -__v"
        );
      }

      let images = req.body.images;

      project.images.forEach((image) => {
        deleteFile(image);
      });

      // Sort images alphabetically (excluding the date part in the image name)
      images.sort((a, b) => {
        if (a.slice(25) < b.slice(25)) {
          return -1;
        }
        if (a.slice(25) > b.slice(25)) {
          return 1;
        }
        return 0;
      });

      images = images.map((image) => {
        uploadToGCP(image);
        return process.env.CLOUD_STORAGE_PATH + image;
      });

      const reqServices = req.body.services;

      delete req.body.services;
      delete req.body.images;

      const updatedProject = await Project.findOneAndUpdate(
        { slug: req.params.slug },
        { ...req.body, images, slug },
        { new: true }
      );
      updatedProject.services = [];

      const services = await Service.find({
        slug: { $in: reqServices },
      }).populate("projects", "_id");

      services.forEach(async (service) => {
        updatedProject.services.push(service._id);
        if (service.projects.indexOf(updatedProject._id) === -1) {
          await Service.findByIdAndUpdate(service._id, {
            $push: { projects: updatedProject._id },
          });
        }
      });

      await updatedProject.save();

      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: "An error has occurred please try again" });
    }
  },

  deleteProject: async (req, res) => {
    try {
      const { _id, cover, images, services } = await Project.findOneAndRemove({
        slug: req.params.slug,
      });

      deleteFile(cover);
      images.forEach((img) => {
        deleteFile(img);
      });

      services.forEach(async (service) => {
        const updatedService = await Service.findById(service._id);
        updatedService.projects = updatedService.projects.filter(
          (projectId) => !projectId.equals(_id)
        );
        await updatedService.save();
      });

      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: "An error has occurred please try again" });
    }
  },
};

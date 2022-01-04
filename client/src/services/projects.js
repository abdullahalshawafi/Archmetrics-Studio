import axios from "axios";

export const getProjects = async (setter) => {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/project`);
    setter(res.data.projects);
};

export const getSingleProject = async (project, setter, setGalleryDetails) => {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/project/${project}`);
    setter(res.data.project);
    let data = { image: "" }
    let gallery = []
    res.data.project.images.forEach((img) => {
        data.image = img
        gallery.push(data)
    })
    setGalleryDetails(gallery)
};

export const createProject = async (body) => {
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/project/create`, body, {
        headers: {
            'Content-Type': 'application/json',
            [process.env.REACT_APP_HEADER]: localStorage.getItem('token')
        }
    });

    return res.status;
};

export const editProject = async (project, body) => {
    const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/project/edit/${project}`, body, {
        headers: {
            'Content-Type': 'application/json',
            [process.env.REACT_APP_HEADER]: localStorage.getItem('token')
        }
    });

    return res.status;
};

export const deleteProject = async (projects, project, setter) => {
    const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/project/delete/${project}`, {
        headers: {
            'Content-Type': 'application/json',
            [process.env.REACT_APP_HEADER]: localStorage.getItem('token')
        }
    });
    if (res.status === 200) {
        projects = projects.filter(x => x.slug !== project);
        setter(projects);
    }
};
import axios from "axios";

export const getProjects = async (setter) => {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/project`);
    setter(res.data.projects);
};

export const getSingleProject = async (project, setter) => {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/project/${project}`);
    setter(res.data.project);
};

export const createProject = async (body) => {
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/project/create`, body, {
        headers: { 'Content-Type': 'application/json' }
    });

    return res.status;
};

export const deleteProject = async (projects, project, setter) => {
    const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/project/delete/${project}`);
    if (res.status === 200) {
        projects = projects.filter(x => x.slug !== project);
        setter(projects);
    }
};
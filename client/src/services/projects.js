import axios from "axios";

export const getProjects = async (setter) => {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/project`);
    setter(res.data.projects);
};

export const getSingleProject = async (project, setter, error) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/project/${project}`);
        res.data.project.images = res.data.project.images.map(image => ({ image }));
        setter(res.data.project);
    } catch (err) {
        console.log(err.message);
        error(true);
    }
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
    try {
        body.services = body.services.map(service => service.slug);
        const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/project/edit/${project}`, body, {
            headers: {
                'Content-Type': 'application/json',
                [process.env.REACT_APP_HEADER]: localStorage.getItem('token')
            }
        });

        return res.status;
    }
    catch (err) {
        console.log(err.message);
        return err;
    }
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
import axios from "axios";

export const getServices = async (setter) => {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/service`);
    setter(res.data.services);
};

export const getSingleService = async (service, setter) => {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/service/${service}`);
    if (res.data.projects.length > 3) {
        res.data.projects = res.data.projects.slice(0, 3);
    }
    console.log(res.data);
    setter(res.data);
};
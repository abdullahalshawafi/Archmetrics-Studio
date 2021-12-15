import axios from "axios";

export const getServices = async (setter) => {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/service`);
    setter(res.data.services);
};

export const getSingleService = async (service, setter) => {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/service/${service}`);
    if (res.data.service.projects.length > 3) {
        res.data.service.projects = res.data.service.projects.slice(0, 3);
    }
    setter(res.data.service);
};

export const deleteService = async (services, service, setter) => {
    const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/service/delete/${service}`);
    if (res.status === 200) {
        services = services.filter(x => x.slug !== service);
        setter(services);
    }
};
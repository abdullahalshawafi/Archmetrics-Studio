import axios from "axios";

export const getServices = async (setter) => {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/service`);
    setter(res.data.services);
};

export const getSingleService = async (service, setter, error) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/service/${service}`);
        setter(res.data.service);
    } catch (err) {
        console.log(err.message);
        error(true);
    }
};

export const createService = async (body) => {
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/service/create`, body, {
        headers: {
            'Content-Type': 'application/json',
            [process.env.REACT_APP_HEADER]: localStorage.getItem('token')
        }
    });

    return res.status;
};

export const editService = async (service, body) => {
    const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/service/edit/${service}`, body, {
        headers: {
            'Content-Type': 'application/json',
            [process.env.REACT_APP_HEADER]: localStorage.getItem('token')
        }
    });

    return res.status;
};

export const deleteService = async (services, service, setter) => {
    const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/service/delete/${service}`, {
        headers: {
            'Content-Type': 'application/json',
            [process.env.REACT_APP_HEADER]: localStorage.getItem('token')
        }
    });
    if (res.status === 200) {
        services = services.filter(x => x.slug !== service);
        setter(services);
    }
};
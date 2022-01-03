import axios from "axios";

export const uploadCover = async (cover) => {
    const data = new FormData();
    data.append("image", cover);

    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/image/upload`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            [process.env.REACT_APP_HEADER]: localStorage.getItem('token')
        }
    });

    return res.data;
};
import axios from "axios";

export const login = async (body) => {
    try {
        const res = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/user/login`,
            body
        );

        if ("error" in res.data) {
            return {
                error: res.data.error,
                body,
                loading: false,
                success: false
            }
        }

        localStorage.setItem("token", res.data.token);

        return {
            error: "",
            body: {
                username: "",
                password: ""
            },
            loading: false,
            success: true
        }
    } catch (err) {
        console.log(err.message);
    }
}

export const loggedIn = localStorage.getItem("token") !== null;

export const logout = () => {
    localStorage.removeItem("token");
}
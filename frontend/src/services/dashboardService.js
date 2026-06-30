import api from "./api";

export const getDashboard = async(status = "", position = "") => {
    const response = await api.get("/dashboard", 
        {params: {
            status, position
            }
        }
    );
    return response.data;
};
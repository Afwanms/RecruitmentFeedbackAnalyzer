import api from "./api";

export const createCandidate = async (candidate) => {
    const response = await api.post("/candidates", candidate);
    return response.data;
}

export const getCandidate = async (candidateId) => {
    const response = await api.get(`/candidates/${candidateId}`);
    return response.data;
};
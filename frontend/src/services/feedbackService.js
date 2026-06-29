import api from "./api";

export const analyzeFeedback = async (candidateId, feedback) => {
  const response = await api.post("/feedback/analyze", {
    candidate_id: candidateId,
    feedback: feedback,
  });

  return response.data;
};
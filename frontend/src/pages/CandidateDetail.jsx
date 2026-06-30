import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { getCandidate } from "../services/candidateService";
import { analyzeFeedback } from "../services/feedbackService";

function CandidateDetail() {
    const { candidateId } = useParams();
    const [candidate, setCandidate] = useState(null);
    const [feedback, setFeedback] = useState("");
    const [category, setCategory] = useState("-");
    const navigate = useNavigate();

    const handleAnalyze = async () => {
        if (!feedback.trim()) {
            alert("Please enter feedback.");
            return;
        }
        try {
            await analyzeFeedback(candidateId, feedback);
            await fetchCandidate();
        } catch (error) {
            console.error(error);
        }
    };

    const fetchCandidate = async () => {
        try {
            const data = await getCandidate(candidateId);
            setCandidate(data);
            if (data.feedback) {
                setFeedback(data.feedback.client_feedback);
                setCategory(data.feedback.category);
            } else {
                setFeedback("");
                setCategory("-");
            }

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCandidate();
    }, [candidateId]);

    if (!candidate) {
        return <div className="min-h-screen flex items-center justify-center">
            Loading...
        </div>;
    }

    return (
    <div className="p-10">
        <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-black hover:text-yellow-600 mb-6"
        >
            <ArrowLeft size={18} />
            Back to Dashboard
        </button>

        <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h1 className="text-2xl font-bold mb-4">
                Candidate Detail
            </h1>

            <div className="space-y-3">
                <div>
                    <span className="font-semibold">Name:</span>
                    {" "}
                    {candidate.candidate_name}
                </div>

                <div>
                    <span className="font-semibold">Position:</span>
                    {" "}
                    {candidate.position}
                </div>

                <div>
                    <span className="font-semibold">Status:</span>
                    {" "}
                    {candidate.status}
                </div>
            </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
                Client Feedback
            </h2>

            <textarea
                rows={3}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full border rounded-lg p-3"
                placeholder="Paste interview feedback here..."
            />

            <button
                onClick={handleAnalyze}
                className="mt-4 bg-yellow-400 text-black px-6 py-2 rounded-lg hover:bg-yellow-500"
            >
                {candidate.status === "Analyzed"
                    ? "Update Analysis"
                    : "Analyze Feedback"}
            </button>
        </div>
        <div className="bg-white rounded-xl shadow p-6 mt-6">
            <p>
                <div>
                    <span className="font-semibold">Category:</span>
                    {" "}
                    {category}
                </div>
            </p>
        </div>
    </div>
    );
}

export default CandidateDetail;
import { useState } from "react";
import { X } from "lucide-react";
import { createCandidate } from "../services/candidateService";

function AddCandidateModal({ isOpen, onClose, onCandidateAdded }) {
    const [candidateName, setCandidateName] = useState("");
    const [position, setPosition] = useState("");
    if (!isOpen) return null;

    const handleSave = async () => {
        try {
            await createCandidate({
                candidate_name: candidateName,
                position: position
            });

            onCandidateAdded();
            setCandidateName("");
            setPosition("");
            
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">
            Add New Candidate
            </h2>

            <button onClick={onClose}>
            <X size={20} />
            </button>
        </div>

        <div className="space-y-4">

            <div>
            <label className="block mb-2 font-medium">
                Candidate Name
            </label>

            <input
                type="text"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                placeholder="Enter candidate name"
                className="w-full border rounded-lg px-3 py-2"
            />
            </div>

            <div>
            <label className="block mb-2 font-medium">
                Position
            </label>

            <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="Enter position"
                className="w-full border rounded-lg px-3 py-2"
            />
            </div>

        </div>

        <div className="flex justify-end gap-3 mt-6">

            <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg"
            >
            Cancel
            </button>

            <button
            onClick={handleSave}
            className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500"
            >
            Save
            </button>
        </div>
        </div>
    </div>
    );
}

export default AddCandidateModal;
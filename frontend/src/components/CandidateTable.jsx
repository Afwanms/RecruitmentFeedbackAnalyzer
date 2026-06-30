import CandidateRow from "./CandidateRow";

function CandidateTable({ candidates, positions, onAddCandidate, statusFilter, setStatusFilter, positionFilter, setPositionFilter }) {
    return (
        <div className="bg-white rounded-xl shadow">
            <div className="p-6">
                <h2 className="text-xl font-bold">
                    Candidate List
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                    Manage your candidates
                </p>

                <div className="flex justify-between items-center">
                    <div className="flex gap-3">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="border rounded-lg px-3 py-2 w-40"
                        >
                            <option value="">All Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Analyzed">Analyzed</option>
                        </select>

                        <select
                            value={positionFilter}
                            onChange={(e) => setPositionFilter(e.target.value)}
                            className="border rounded-lg px-3 py-2 w-48"
                        >
                            <option value="">All Position</option>

                            {positions.map((position) => (
                                <option key={position} value={position}>
                                    {position}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={onAddCandidate}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold"
                    >
                        + Add Candidate
                    </button>

                </div>

            </div>

            <table className="w-full">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="text-left px-6 py-3">Name</th>
                        <th className="text-left px-6 py-3">Position</th>
                        <th className="text-left px-6 py-3">Status</th>
                        <th className="text-left px-6 py-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {candidates.map(candidate => (
                        <CandidateRow
                            key={candidate.candidate_id}
                            candidate={candidate}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CandidateTable;
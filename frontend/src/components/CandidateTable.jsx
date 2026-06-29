import CandidateRow from "./CandidateRow";

function CandidateTable({candidates}) {

    return (

        <div className="bg-white rounded-xl shadow">

            <div className="flex justify-between items-center p-6">

                <h2 className="text-xl font-semibold">
                    Candidate List
                </h2>

                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    + Add Candidate
                </button>

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
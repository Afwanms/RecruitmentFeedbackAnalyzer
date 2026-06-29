function CandidateRow({ candidate }) {

    const statusColor =
        candidate.status === "Analyzed"
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700";

    return (
        <tr className="border-t hover:bg-gray-50 transition">

            <td className="px-6 py-4">
                {candidate.candidate_name}
            </td>

            <td className="px-6 py-4">
                {candidate.position}
            </td>

            <td className="px-6 py-4">

                <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}
                >
                    {candidate.status}
                </span>

            </td>

            <td className="px-6 py-4">

                <button
                    className="text-blue-600 hover:text-blue-800 font-medium"
                >
                    View Detail
                </button>

            </td>

        </tr>
    );
}

export default CandidateRow;
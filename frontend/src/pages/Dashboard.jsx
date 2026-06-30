import Header from "../components/Header";
import SummaryCard from "../components/SummaryCard";
import CandidateTable from "../components/CandidateTable";
import AddCandidateModal from "../components/AddCandidateModal";

import { useEffect,useState } from "react";
import { getDashboard } from "../services/dashboardService";

function Dashboard() {
  const[dashboard, setDashboard] = useState(null);
  const[isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [positionFilter, setPositionFilter] = useState("");

  const fetchDashboard = async () => {
    try {
      const data = await getDashboard(statusFilter, positionFilter);
      setDashboard(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() =>{
    fetchDashboard();
  }, [statusFilter, positionFilter]);

  if(!dashboard){
    return(
      <div className="p-10">
        Loading...
      </div>
    );
  }

  const positions = [
    ...new Set(
      dashboard.candidates.map(candidate => candidate.position)
    )
  ];
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-3 gap-6 mb-8">
          <SummaryCard
            title="Total Candidate"
            value={dashboard.total_candidate}
          />

          <SummaryCard
            title="Total Feedback"
            value={dashboard.total_feedback}
          />

          <SummaryCard
            title="Top Rejected Category"
            value={dashboard.top_category}
          />

        </div>

        <CandidateTable 
          candidates={dashboard.candidates}
          onAddCandidate={() => setIsModalOpen(true)}
          positions={positions}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          positionFilter={positionFilter}
          setPositionFilter={setPositionFilter}
        />

        <AddCandidateModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCandidateAdded={fetchDashboard}
        />

      </div>
    </div>
  );
}

export default Dashboard;
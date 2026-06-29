import Header from "../components/Header";
import SummaryCard from "../components/SummaryCard";
import CandidateTable from "../components/CandidateTable";
import { useEffect,useState } from "react";
import api from "../services/api";

function Dashboard() {
  const[dashboard, setDashboard] = useState(null);
  useEffect(() =>{
    fetchDashboard();
  }, []);

  async function fetchDashboard() {
    try {
      const response = await api.get("/dashboard");
      setDashboard(response.data);
    } catch(error){
      console.error(error);
    }
  }

  if(!dashboard){
    return(
      <div className="p-10">
        Loading...
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-100">

      <div className="max-w-7xl mx-auto p-8">

        <Header />

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
        />

      </div>

    </div>
  );
}

export default Dashboard;
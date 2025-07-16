import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsClockHistory } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import UserDropdown from "../components/UserDropdown";
import ClaimButton from "../components/ClaimButton";
import Leaderboard from "../components/Leaderboard";
import AddUserForm from "../components/AddUserForm";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [pointsEarned, setPointsEarned] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  const handleClaim = async () => {
    if (!selectedUserId) {
      toast.warn("Please select a user first");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`http://localhost:5000/api/claim/${selectedUserId}`);
      const points = res.data.pointsClaimed;
      setPointsEarned(points);
      toast.success(`🎉 ${points} points claimed successfully!`);
      fetchUsers();
    } catch (err) {
      toast.error("❌ Failed to claim points");
      console.error("Error claiming points", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gray-50 flex flex-col">
      <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden w-full">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-5 sm:p-6 text-white">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">🏆 Leaderboard System</h1>
              <p className="text-amber-100 text-sm mt-1">Track and claim points</p>
            </div>
            <Link
              to="/claim-history"
              className="flex items-center no-underline gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors text-white text-sm sm:text-base"
            >
              <span>Claim History</span>
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 sm:p-6 space-y-6">
          {/* Claim Points Section */}
          <div className="bg-amber-50 rounded-lg p-4 sm:p-6 border border-amber-100">
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-end">
              <div className="flex-1">
                <UserDropdown
                  users={users}
                  selectedUserId={selectedUserId}
                  setSelectedUserId={setSelectedUserId}
                />
              </div>
              <div className="w-full sm:w-auto">
                <ClaimButton onClaim={handleClaim} loading={loading} />
              </div>
            </div>

            {pointsEarned !== null && (
              <p className="mt-4 text-center text-green-600 font-medium">
                🎯 You earned {pointsEarned} points!
              </p>
            )}
          </div>

          {/* Leaderboard */}
          <Leaderboard users={users} />

          {/* Add User Form */}
          <AddUserForm onUserAdded={fetchUsers} />
        </div>
      </div>
    </div>
  );
};

export default Home;

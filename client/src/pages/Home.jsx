import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsClockHistory } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import UserDropdown from "../Components/UserDropdown";
import ClaimButton from "../Components/ClaimButton";
import Leaderboard from "../Components/Leaderboard";
import AddUserForm from "../Components/AddUserForm";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [pointsEarned, setPointsEarned] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://leaderboard-system-7ik6.onrender.com/api/users");
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
      const res = await axios.post(`https://leaderboard-system-7ik6.onrender.com/api/claim/${selectedUserId}`);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-3 sm:p-4 md:p-6 flex flex-col">
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

      <div className="max-w-2xl mx-auto w-full bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-4 sm:p-5 md:p-6 text-white">
          <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-3 sm:gap-4">
            <div>
              <h1 className="text-xl xs:text-2xl sm:text-3xl font-bold">🏆 Leaderboard System</h1>
              <p className="text-amber-100 text-xs sm:text-sm mt-1">Track and claim points</p>
            </div>
            <Link
              to="/claim-history"
              className="flex items-center no-underline gap-2 bg-white/20 hover:bg-white/30 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition-colors text-white text-xs sm:text-sm md:text-base"
            >
              <BsClockHistory className="text-sm sm:text-base" />
              <span>Claim History</span>
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-5 md:space-y-6">
          {/* Claim Points Section */}
          <div className="bg-amber-50 rounded-lg p-3 sm:p-4 md:p-6 border border-amber-100">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-amber-800 mb-3 sm:mb-4">Claim Points</h2>
            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 items-stretch">
              <div className="flex-1 min-w-0">
                <UserDropdown
                  users={users}
                  selectedUserId={selectedUserId}
                  setSelectedUserId={setSelectedUserId}
                />
              </div>
              <div className="xs:w-auto flex justify-center">
                <ClaimButton onClaim={handleClaim} loading={loading} />
              </div>
            </div>

            {pointsEarned !== null && (
              <p className="mt-3 sm:mt-4 text-center text-green-600 font-medium text-sm sm:text-base">
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

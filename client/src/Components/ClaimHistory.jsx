import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUser, FaSearch, FaHistory, FaArrowLeft, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const ClaimHistory = () => {
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get("https://leaderboard-system-7ik6.onrender.com/api/claim-history");
        setHistory(res.data);
      } catch (err) {
        console.error("Error fetching history:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const filteredHistory = history.filter((item) =>
    item.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredHistory.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredHistory.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen p-6 bg-gray-50 flex flex-col items-center">
      {/* Main Content Container */}
      <div className="w-full max-w-2xl">
        {/* Header - Now same width as search bar */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-amber-500/90 backdrop-blur-md rounded-xl border-b border-amber-400 mb-6"
        >
          <div className="px-4 py-6 flex justify-between items-center">
            <Link to="/" className="flex no-underline hover:underline items-center gap-2 text-white hover:text-amber-100 transition">
              <FaArrowLeft />
              <span className="font-medium">Back</span>
            </Link>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              Claim History
            </h1>
            <div className="w-8"></div>
          </div>
        </motion.div>

        {/* Search Card */}
        <motion.div 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-md p-6 mb-6 border border-amber-100"
        >
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-12 pr-4 py-3 bg-amber-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-300 transition-all text-amber-900 placeholder-amber-400"
            />
          </div>
        </motion.div>

        {/* History Card */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-md overflow-hidden border border-amber-100"
        >
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-amber-50 border-b border-amber-100 text-amber-700 uppercase text-xs font-medium">
            <div className="col-span-6">User</div>
            <div className="col-span-3 text-right">Points</div>
            <div className="col-span-3 text-right">Date</div>
          </div>

          {/* Content */}
          {isLoading ? (
            <div className="flex justify-center items-center p-12">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-amber-500"></div>
            </div>
          ) : currentUsers.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-amber-300 mb-4">
                <FaSearch className="mx-auto text-4xl" />
              </div>
              <h3 className="text-lg font-medium text-amber-700">
                {searchTerm ? "No results found" : "No claims yet"}
              </h3>
              <p className="text-amber-400 mt-1">
                {searchTerm ? "Try a different search" : "Claim points to see history"}
              </p>
            </div>
          ) : (
            <AnimatePresence>
              {currentUsers.map((item) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-12 gap-4 px-3 py-2.5 hover:bg-amber-50/30 transition-colors border-b border-amber-100 last:border-0"
                >
                  <div className="col-span-6 flex items-center gap-3">
                    <div className="bg-amber-100 p-2 rounded-full">
                      <FaUser className="text-amber-600 text-sm" />
                    </div>
                    <span className="font-medium text-amber-900 truncate">
                      {item.userId?.name || "Unknown"}
                    </span>
                  </div>
                  <div className="col-span-3 flex items-center justify-end">
                    <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                      +{item.pointsClaimed}
                    </span>
                  </div>
                  <div className="col-span-3 flex items-center justify-end text-amber-600 text-sm">
                    {new Date(item.claimedAt).toLocaleDateString()}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </motion.div>

        {/* Pagination Controls */}
        {!isLoading && filteredHistory.length > usersPerPage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-between items-center mt-4"
          >
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`flex items-center gap-1 px-3 py-1 rounded-md ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-amber-600 hover:bg-amber-100'}`}
            >
              <FaAngleLeft />
              Previous
            </button>
            
            <div className="flex gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => paginate(pageNum)}
                    className={`w-8 h-8 rounded-md ${currentPage === pageNum ? 'bg-amber-500 text-white' : 'text-amber-600 hover:bg-amber-100'}`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-1 px-3 py-1 rounded-md ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-amber-600 hover:bg-amber-100'}`}
            >
              Next
              <FaAngleRight />
            </button>
          </motion.div>
        )}

        {/* Stats Footer */}
        {!isLoading && filteredHistory.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-right mt-3 text-sm text-amber-500"
          >
            Showing {indexOfFirstUser + 1}-{Math.min(indexOfLastUser, filteredHistory.length)} of {filteredHistory.length} records
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ClaimHistory;

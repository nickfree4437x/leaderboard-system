import React from "react";
import { FaCrown, FaMedal, FaTrophy, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";

const Leaderboard = ({ users = [] }) => {
  const getRankColor = (rank) => {
    switch (rank) {
      case 0: return "from-yellow-400 to-yellow-500";
      case 1: return "from-gray-400 to-gray-500";
      case 2: return "from-orange-400 to-orange-500";
      default: return "from-blue-400 to-blue-500";
    }
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 0: return <FaTrophy className="text-xl sm:text-2xl" />;
      case 1: return <FaCrown className="text-xl sm:text-2xl" />;
      case 2: return <FaMedal className="text-xl sm:text-2xl" />;
      default: return <span className="text-base sm:text-lg font-bold">{rank + 1}</span>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full px-2 sm:px-4 md:px-6 lg:px-8 py-4"
    >
      <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl sm:rounded-2xl shadow-md overflow-hidden max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-4 sm:p-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-md">
            🏆 Live Leaderboard
          </h2>
          <p className="text-amber-100 mt-1 sm:mt-2 text-sm sm:text-base">See who's leading the competition</p>
        </div>

        {users.length === 0 ? (
          <div className="flex justify-center items-center p-8 sm:p-12">
            <div className="animate-spin rounded-full h-10 sm:h-12 w-10 sm:w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : (
          <>
            {/* Top 3 Podium - Stacked on mobile */}
            <div className="grid grid-cols-1 mt-1 sm:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-6 pt-6 sm:pt-8 pb-3 sm:pb-4">
              {users.slice(0, 3).map((user, index) => (
                <motion.div
                  key={user._id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className={`relative bg-white rounded-lg sm:rounded-xl shadow-sm sm:shadow-md overflow-hidden ${
                    index === 0 ? "sm:-mt-6 md:-mt-8 sm:order-2" :
                    index === 1 ? "sm:order-1" : "sm:order-3"
                  }`}
                >
                  <div className={`absolute top-0 left-0 w-full h-1 sm:h-2 bg-gradient-to-r ${getRankColor(index)}`}></div>
                  <div className="p-4 sm:p-6 flex flex-col items-center">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-3 sm:mb-4 bg-gradient-to-br ${getRankColor(index)} text-white`}>
                      {getRankIcon(index)}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 text-center">{user.name}</h3>
                    <div className="mt-3 sm:mt-4 px-4 py-1 sm:px-6 sm:py-2 rounded-full bg-amber-50 text-amber-800 font-bold text-sm sm:text-base">
                      {user.totalPoints} pts
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* All Users List - Card view on mobile */}
            <div className="px-2 sm:px-4 pb-4 sm:pb-6">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Desktop Table */}
                <div className="hidden sm:block">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-amber-50">
                      <tr>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-amber-800 uppercase tracking-wider">Rank</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-amber-800 uppercase tracking-wider">User</th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-amber-800 uppercase tracking-wider">Progress</th>
                        <th className="px-4 sm:px-6 py-3 text-right text-xs sm:text-sm font-medium text-amber-800 uppercase tracking-wider">Points</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.slice(3).map((user, index) => (
                        <motion.tr
                          key={user._id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 + index * 0.05 }}
                          whileHover={{ scale: 1.01 }}
                          className="hover:bg-amber-50/50 transition-colors"
                        >
                          <td className="px-4 sm:px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                            {index + 4}
                          </td>
                          <td className="px-4 sm:px-6 py-2 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
                                {user.name.charAt(0).toUpperCase()}
                              </div>
                              <div className="ml-3 sm:ml-4">
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-2 whitespace-nowrap">
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div
                                className="bg-gradient-to-r from-amber-400 to-orange-500 h-2.5 rounded-full"
                                style={{ width: `${Math.min(100, (user.totalPoints / 1000) * 100)}%` }}
                              ></div>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-2 whitespace-nowrap text-right text-sm font-bold text-amber-600 flex items-center justify-end gap-1">
                            {user.totalPoints}
                            <FaTrophy className="text-amber-400 ml-1" />
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="sm:hidden space-y-2 py-2">
                  {users.slice(3).map((user, index) => (
                    <motion.div
                      key={user._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="bg-white rounded-lg shadow-xs border border-gray-100 p-3"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <div className="bg-gray-100 rounded-full p-2 mr-3">
                            <span className="text-xs font-bold text-gray-600">{index + 4}</span>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">{user.name}</h3>
                            <div className="w-32 mt-1 bg-gray-200 rounded-full h-1.5">
                              <div
                                className="bg-gradient-to-r from-amber-400 to-orange-500 h-1.5 rounded-full"
                                style={{ width: `${Math.min(100, (user.totalPoints / 1000) * 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs font-bold text-amber-600 mr-1">{user.totalPoints}</span>
                          <FaTrophy className="text-amber-400 text-xs" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Leaderboard;
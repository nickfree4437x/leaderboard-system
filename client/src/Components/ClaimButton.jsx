import React from "react";

const ClaimButton = ({ onClaim, loading }) => {
  return (
    <div className="flex justify-center w-full sm:w-auto">
      <button
        onClick={onClaim}
        disabled={loading}
        className={`
          relative
          px-6 py-2.5
          rounded-lg
          text-white
          tracking-wide
          transition-all
          duration-300
          ease-in-out
          transform
          hover:scale-105
          active:scale-95
          focus:outline-none
          focus:ring-4
          focus:ring-opacity-50
          shadow-md
          overflow-hidden
          w-full sm:w-auto
          ${loading 
            ? "bg-gradient-to-r from-amber-400 to-amber-500 cursor-not-allowed" 
            : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-600 focus:ring-amber-300"
          }
        `}
      >
        {/* Ripple effect container */}
        <span className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <span className="absolute top-1/2 left-1/2 w-0 h-0 bg-white rounded-full opacity-0 transition-all duration-500 transform -translate-x-1/2 -translate-y-1/2 group-hover:w-64 group-hover:h-64 group-hover:opacity-10"></span>
        </span>
        
        {/* Button content */}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Claiming...</span>
            </>
          ) : (
            <span className="flex items-center gap-1">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Claim
            </span>
          )}
        </span>
      </button>
    </div>
  );
};

export default ClaimButton;
import React, { useState } from "react";

function Pagination({ currentPage, onPageChange, totalPages}) {
  const [inputPage, setInputPage] = useState("");

  const handlePageInput = (e) => {
    setInputPage(e.target.value);
  };
  

  const goToPage = () => {
    const pageNumber = Number(inputPage);
    if (pageNumber <= 0) {
      alert("Page number should be greater than 0");
    } else if (pageNumber > 500) {
      alert("API only supports 500 pages");
    } else if (pageNumber > totalPages) {
      alert("Maximum page number exceeded");
    } else {
      onPageChange(pageNumber);
    }
    setInputPage(""); // Clear input after submission
  };

  return (
    <div className="flex flex-col items-center gap-3 py-4">
      <div className="flex gap-6">
        {/* Prev Button */}
        <button
          className="px-4 py-2 bg-blue-500 text-white shadow-md font-bold rounded-md hover:cursor-pointer hover:bg-blue-700 disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Prev
        </button>

        {/* Current Page Indicator */}
        <span className="px-4 py-2 bg-gray-700 text-white shadow-md rounded-md">
          {currentPage}
        </span>

        {/* Next Button */}
        <button
          className="px-4 py-2 bg-blue-500 text-white font-bold shadow-md rounded-md hover:cursor-pointer hover:bg-blue-700 disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
        <input
          type="number"
          value={inputPage}
          onChange={handlePageInput}
          placeholder="Enter page no."
          className="px-3 py-2 border rounded-md bg-white italic text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          className="px-4 py-2 bg-yellow-300 text-black font-bold shadow-md rounded-md hover:cursor-pointer hover:bg-gray-700 hover:text-white"
          onClick={goToPage}
        >
          Go
        </button>
      </div>
    </div>
  );
}

export default Pagination;

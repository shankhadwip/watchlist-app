import { useState } from "react";

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
    <div className="flex flex-col items-center gap-3 px-3 py-4">
      <div className="grid w-full max-w-xl grid-cols-[1fr_auto_1fr] gap-2 sm:flex sm:w-auto sm:gap-6">
        {/* Prev Button */}
        <button
          className="rounded-md bg-blue-500 px-4 py-2 font-bold text-white shadow-md hover:cursor-pointer hover:bg-blue-700 disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Prev
        </button>

        {/* Current Page Indicator */}
        <span className="rounded-md bg-gray-700 px-4 py-2 text-center text-white shadow-md">
          {currentPage}
        </span>

        {/* Next Button */}
        <button
          className="rounded-md bg-blue-500 px-4 py-2 font-bold text-white shadow-md hover:cursor-pointer hover:bg-blue-700 disabled:opacity-50"
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
          className="col-span-2 rounded-md border bg-white px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-[170px]"
        />
        <button
          className="rounded-md bg-yellow-300 px-4 py-2 font-bold text-black shadow-md hover:cursor-pointer hover:bg-gray-700 hover:text-white"
          onClick={goToPage}
        >
          Go
        </button>
      </div>
    </div>
  );
}

export default Pagination;

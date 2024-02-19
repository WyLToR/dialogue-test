import { useTranslation } from "react-i18next";

export default function Paginator({
  data,
  itemsPerPage,
  currentPage,
  setCurrentPage,
  children,
}: any) {
  const {t} = useTranslation()
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, data.length);
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div className="overflow-x-auto dark:bg-gray-800 p-2 rounded-md">
      <div className="flex justify-between items-center mt-4">
        <div className="flex flex-col">
          <span>
            {t('paginationAllPageShow')}: {startIndex}. - {endIndex}.
          </span>
          <span>
            {t('paginationAllPage')}: <span className="font-bold">{data.length}</span>
          </span>
        </div>
        <div className="flex gap-2">
          <button
            className="mr-2"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => goToPage(index + 1)}
              className={`px-3 py-1 rounded-md ${
                currentPage === index + 1
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="ml-2"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </button>
        </div>
      </div>
      {children}
      <div className="flex justify-between items-center mt-4">
        <div className="flex flex-col">
        <span>
            {t('paginationAllPageShow')}: {startIndex}. - {endIndex}.
          </span>
          <span>
            {t('paginationAllPage')}: <span className="font-bold">{data.length}</span>
          </span>
        </div>
        <div className="flex gap-2">
          <button
            className="mr-2"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => goToPage(index + 1)}
              className={`px-3 py-1 rounded-md ${
                currentPage === index + 1
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="ml-2"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

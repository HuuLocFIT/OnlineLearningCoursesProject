import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Pagination = ({ totalPages, page, onClickOtherPage }) => {
  const handlePreviousPage = () => {
    if (page > 1) {
      onClickOtherPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      onClickOtherPage(page + 1);
    }
  };
  
  return (
    <div className="my-[40px]">
      {/* <ul className="flex justify-center gap-x-3">
          <li className="w-[40px] h-[40px] rounded-full bg-[#ccc] text-[var(--primary-color)] flex justify-center items-center cursor-pointer"><FontAwesomeIcon icon={faChevronLeft}/></li>
          <li className="w-[40px] h-[40px] rounded-full bg-[#ccc] text-[var(--primary-color)] flex justify-center items-center"><a href="" className="text-[18px] px-[10px]">1</a></li>
          <li className="w-[40px] h-[40px] rounded-full bg-[#ccc] text-[var(--primary-color)] flex justify-center items-center"><a href="" className="text-[18px] px-[10px]">2</a></li>
          <li className="w-[40px] h-[40px] rounded-full bg-[#ccc] text-[var(--primary-color)] flex justify-center items-center"><a href="" className="text-[18px] px-[10px]">3</a></li>
          <li className="w-[40px] h-[40px] rounded-full bg-[#ccc] text-[var(--primary-color)] flex justify-center items-center"><a href="" className="text-[18px] px-[10px]">4</a></li>
          <li className="w-[40px] h-[40px] rounded-full bg-[#ccc] text-[var(--primary-color)] flex justify-center items-center cursor-pointer"><FontAwesomeIcon icon = {faChevronRight}/></li>
        </ul> */}
      <ul className="flex justify-center gap-x-3">
        <li
          className={`w-[40px] h-[40px] rounded-full bg-[#ccc] text-[var(--primary-color)] flex justify-center items-center cursor-pointer ${page === 1 ? 'hidden' : ''}`}
          onClick={handlePreviousPage}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </li>
        {[...Array(totalPages)].map((currentPage, index) => (
          <li
            key={index + 1}
            className={`w-[40px] h-[40px] rounded-full bg-[#ccc] text-[var(--primary-color)] flex justify-center items-center cursor-pointer ${
              page === index + 1 ? "font-bold" : ""
            }`}
            onClick={() => onClickOtherPage(index + 1)}
          >
            {index + 1}
          </li>
        ))}
        <li
          className={`w-[40px] h-[40px] rounded-full bg-[#ccc] text-[var(--primary-color)] flex justify-center items-center cursor-pointer ${page === totalPages || totalPages === 0 ? 'hidden' : ''}`}
          onClick={handleNextPage}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </li>
      </ul>
    </div>
  );
};

export default Pagination;

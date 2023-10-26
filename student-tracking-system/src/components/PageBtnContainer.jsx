import { useContextApp } from "../context/contextApp";
import "../layout/PageBtnContainer.css";

//adding buttons to form pagination and navigate to next/previous page
const PageBtnContainer = () => {
  const { numOfPages, page, changePage } = useContextApp();

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });
  console.log(pages);
  const nextPage = () => {
    let newPage = page + 1;
    if (newPage === numOfPages) {
      newPage = 1;
    }
    changePage(newPage);
  };
  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = numOfPages;
    }
    changePage(newPage);
  };
  return (
    <div className="page-btn-container">
      <button className="prev-btn" onClick={prevPage}>
        prev
      </button>
      <div className="btn-container">
        {pages.map((pageNumber) => {
          return (
            <button
              type="button"
              className={pageNumber === page ? "pageBtn active" : "pageBtn"}
              key={pageNumber}
              onClick={() => changePage(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button className="next-btn" onClick={nextPage}>
        Next
      </button>
    </div>
  );
};

export default PageBtnContainer;

import React from "react";

const Pagination = ({ postPerPage, totalCount }) => {
  const pageNumbers = [];

  console.log("1111", totalCount);

  for (let i = 1; i <= Math.ceil(totalCount / postPerPage); i++) {
    pageNumbers.push(i);
  }

  console.log("PAGE NUMBERS", pageNumbers);

  return (
    <nav className={"pagination justify-content-center"}>
      <ul className={"pagination"}>
        {pageNumbers.map((num) => (
          <li key={num} className={"page-item"}>
            <a href="#" className="page-link">
              {num}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;

import React from "react";
import bookBackground from "../../assets/booksCard/index.png";
import classes from "./index.module.css";

const BooksCard = ({ title, author, book_pages, year, data }) => {
  if (!data) {
    return <div> No data available</div>;
  }
  return (
    <>
      <div className={classes.books_container}>
        <img src={bookBackground} alt={"asd"} />
        <div className={classes.book_description}>
          <p>Year:{data.book_publication_year}</p>
          <p>Pages:{data.book_pages}</p>
          <p>
            Country:
            <br />
            {data.book_publication_country}{" "}
          </p>
        </div>
        <div className={classes.book_info}>
          <p>
            <span>Title:</span>
            {data.book_title}
          </p>
          <p>
            <span>Author:</span>
            {data.book_author}
          </p>
        </div>
      </div>
    </>
  );
};

export default BooksCard;

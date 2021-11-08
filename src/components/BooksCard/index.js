import React from "react";
import bookBackground from "../../assets/booksCard/index.png";
import classes from "./index.module.css";

// ** This component gets the books data through props that have been mapped through and renders to UI
// ** uses an image that has text overlaying

const BooksCard = ({ data }) => {
  if (data.length <= 0) {
    return <alert> No data available</alert>;
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

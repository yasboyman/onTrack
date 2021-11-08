import React from "react";
import bookBackground from "../../assets/booksCard/index.png";
import classes from "./index.module.css";
import { BsVectorPen } from "react-icons/bs";

const BooksCard = ({ title, author, book_pages, year, data }) => {
  return (
    <>
      <div className={classes.books_container}>
        <img src={bookBackground} alt={"asd"} />
        <div className={classes.book_description_popup}>
          <p>Year:{data.book_publication_year}</p>
          <p>Pages:{data.book_pages}</p>
        </div>
        <div className={classes.book_info}>
          <p>Title:{data.book_title}</p>
          <p>
            {BsVectorPen}Author:{data.book_author}
          </p>
        </div>
      </div>
    </>
  );
};

export default BooksCard;

import React from "react";
import bookBackground from "../../assets/booksCard/index.png";
import classes from "./index.module.css";
import { BsVectorPen } from "react-icons/bs";

const BooksCard = ({ title, author, book_pages, year }) => {
  return (
    <>
      <div className={classes.books_container}>
        <img src={bookBackground} alt={"asd"} />
        <div className={classes.book_description_popup}>
          <p>Year:{year}</p>
          <p>Pages:{book_pages}</p>
        </div>
        <div className={classes.book_info}>
          <p>Title:{title}</p>
          <p>
            {BsVectorPen}Author:{author}
          </p>
        </div>
      </div>
    </>
  );
};

export default BooksCard;

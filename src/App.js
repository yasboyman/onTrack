import "./App.css";
import { useEffect, useState } from "react";
import BooksCard from "./components/BooksCard";
import ReactPaginate from "react-paginate";

const App = () => {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [SelectedItemsPerPage, setItemsPerPage] = useState(1);
  const [count, setCount] = useState("");

  const url = "http://nyx.vima.ekt.gr:3000/api/books/";

  const getBooks = async () => {
    // const location = window.location.hostname;
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page: currentPage,
        itemsPerPage: SelectedItemsPerPage,
      }),
    };
    try {
      const fetchResponse = await fetch(`${url}`, settings);
      const result = await fetchResponse.json();
      setIsLoading(false);
      console.log("RESUTTTTTT", result);
      setCount(Math.ceil(result.count));
      return setData([result]);
    } catch (e) {
      return e;
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getBooks();
  }, []);

  console.log(data);

  const handlePageClick = (event) => {
    const newOffset = event.selected + 1;
    console.log(
      `User requested page number ${event.selected}, which is offset `
    );
    setCurrentPage(newOffset);
    getBooks();
  };

  return (
    <div className="App">
      <h2>Boooooks fiascooo</h2>
      {!isLoading && (
        <>
          {/*//*/}
          {/*// /!*<div>*!/*/}
          {/*// /!*  <input*!/*/}
          {/*// /!*  placeholder={Search}*!/*/}
          {/*// /!*  />*!/*/}
          {/*// /!*</div>*!/*/}
          <ReactPaginate
            pageCount={count}
            pageRange={2}
            forcePage={currentPage - 1}
            marginPagesDisplayed={2}
            onPageChange={handlePageClick}
            containerClassName={"container"}
            previousLinkClassName={"page"}
            breakClassName={"page"}
            nextLinkClassName={"page"}
            pageClassName={"page"}
            disabledClassName={"disabled"}
            activeClassName={"active"}
          />
        </>
      )}

      {!isLoading &&
        data &&
        data[0].books.map((item) => {
          console.log(item);
          return (
            <div className={"books_parent_container"}>
              <BooksCard
                // id={item.id}
                key={item.index}
                title={item.book_title}
                author={item.book_author}
                book_pages={item.book_pages}
                year={item.book_publication_year}
              />
            </div>
          );
        })}
    </div>
  );
};

export default App;

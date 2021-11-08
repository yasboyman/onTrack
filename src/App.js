import "./App.css";
import { useEffect, useState } from "react";
import BooksCard from "./components/BooksCard";
import ReactPaginate from "react-paginate";
import useLocalStorage from "./components/useLocalStorage";
// import ScrollUp from "./components/ScrollUp";

const App = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState("");
  const [currentPage, setCurrentPage] = useLocalStorage("page", "1");
  const [SelectedItemsPerPage, setItemsPerPage] = useState(20);
  const [count, setCount] = useState("");
  // const [searchValue, setSearchValue] = useState("");
  const [searchValue, setSearchValue] = useLocalStorage("name", "");

  const url = "http://nyx.vima.ekt.gr:3000/api/books/";

  useEffect(() => {
    // setIsLoading(true);
    const getBooks = async () => {
      // const location = window.location.hostname;
      console.log("GETTING BOOKS.....");
      const settings = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          page: currentPage,
          itemsPerPage: SelectedItemsPerPage,
          // filters: filters,
        }),
      };
      try {
        const fetchResponse = await fetch(`${url}`, settings);
        console.log("SETTINGS", settings);
        const result = await fetchResponse.json();
        setIsLoading(false);
        console.log("RESUTTTTTT", result.books);
        console.log("countttt", result.count);
        setCount(Math.ceil(result.count / result.books.length));
        return setData(result.books);
      } catch (e) {
        return e;
      }
    };

    getBooks();
  }, [currentPage]);

  // Logic for displaying data
  const indexOfLastPost = currentPage * SelectedItemsPerPage;
  const indexOfFirstPost = indexOfLastPost - SelectedItemsPerPage;
  const currentData = data && data.slice(indexOfFirstPost, indexOfLastPost);
  const lengthOfData = currentData && currentData.length;
  const totalPages = Math.ceil(count / data.length);

  //change page
  // const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePageClick = (event) => {
    const newOffset = event.selected + 1;
    console.log("SELECTED::::", event.selected + 1);
    return setCurrentPage(newOffset);
  };

  console.log("CURRENT PAGE", currentPage);
  return (
    <div className="App">
      <h2>Boooooks fiascooo</h2>
      <label>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={"Search Books"}
        />
        {/*<button onClick={handleSearchSubmit}>Submit</button>*/}
      </label>

      {!isLoading && (
        <>
          <div className={"pagnationContainer"}>
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
          </div>
        </>
      )}

      <div className={"books_parent_container"}>
        {data &&
          data.map((item) => <BooksCard key={item.id} data={{ ...item }} />)}
      </div>
    </div>
  );
};

export default App;

import "./App.css";
import { useEffect, useState } from "react";
import BooksCard from "./components/BooksCard";
import ReactPaginate from "react-paginate";
import ScrollUp from "./components/ScrollUp";
import Pagination from "./components/Pagination";

const App = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [SelectedItemsPerPage, setItemsPerPage] = useState(20);
  const [count, setCount] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [filters, setFitlers] = useState([]);

  const url = "http://nyx.vima.ekt.gr:3000/api/books/";

  // const getBooks = async () => {
  //   // const location = window.location.hostname;
  //   console.log("GETTING BOOKS.....");
  //   const settings = {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       page: currentPage,
  //       itemsPerPage: SelectedItemsPerPage,
  //       filters: filters,
  //     }),
  //   };
  //   try {
  //     const fetchResponse = await fetch(`${url}`, settings);
  //     console.log("SETTINGS", settings);
  //     const result = await fetchResponse.json();
  //     setIsLoading(false);
  //     console.log("RESUTTTTTT", result);
  //     setCount(Math.ceil(result.count));
  //     return setData([result]);
  //   } catch (e) {
  //     return e;
  //   }
  // };

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
          filters: filters,
        }),
      };
      try {
        const fetchResponse = await fetch(`${url}`, settings);
        console.log("SETTINGS", settings);
        const result = await fetchResponse.json();
        setIsLoading(false);
        console.log("RESUTTTTTT", result.books);
        console.log("countttt", result.count);
        setCount(Math.ceil(result.count));
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

  console.log("currentData", currentData);

  //change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // console.log(data);

  const handlePageClick = (event) => {
    const newOffset = event.selected + 1;
    console.log("SELECTED::::", event.selected + 1);
    return setCurrentPage(newOffset);

    // const clickedValue = e.target.innerHTML;
    //
    // setCurrentPage(clickedValue);
    // getBooks();
  };

  // const filterBySearch = (data) =>
  //   searchValue == "" ||
  //   (data[0].books.title.toLowerCase().includes(searchValue.toLowerCase()) &&
  //     data);

  // const handleSearchSubmit = () => {
  //   setFitlers([searchValue]);
  //   console.log("POSTTTTTT");
  //   const getfitler = async () => {
  //     // const location = window.location.hostname;
  //     console.log("GETTING BOOKS.....");
  //     const settings = {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         filters: filters,
  //       }),
  //     };
  //     try {
  //       const fetchResponse = await fetch(`${url}`, settings);
  //       const result = await fetchResponse.json();
  //       setIsLoading(false);
  //       console.log("RESUTTTTTT", result);
  //       setCount(Math.ceil(result.count));
  //       return setData([result]);
  //     } catch (e) {
  //       return e;
  //     }
  //   };

  // getfitler();
  // };
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
      <ScrollUp />
      {!isLoading && (
        <>
          {/*<Pagination*/}
          {/*  postPerPage={SelectedItemsPerPage}*/}
          {/*  totalCount={count}*/}
          {/*  paginate={paginate}*/}
          {/*/>*/}

          <div className={"pagnationContainer"}>
            <ReactPaginate
              pageCount={count / data.length}
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
          data.map((item) => {
            // console.log(item);
            return (
              <BooksCard
                // id={item.id}
                key={item.id}
                title={item.book_title}
                author={item.book_author}
                book_pages={item.book_pages}
                year={item.book_publication_year}
              />
            );
          })}
      </div>
    </div>
  );
};

export default App;

import "./App.css";
import { useEffect, useState } from "react";
import BooksCard from "./components/BooksCard";
import ReactPaginate from "react-paginate";
import useLocalStorage from "./components/useLocalStorage";

const App = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState("");
  const [currentPage, setCurrentPage] = useLocalStorage("page", "1");
  const [SelectedItemsPerPage, setItemsPerPage] = useState(20); // Initial value provided, ready for dynamic use change 'useState' to 'useLocalStorage' custom hook
  const [count, setCount] = useState("");
  const [filter, setFilter] = useState("");

  //** This is the heart of the application, below is the URL and post request function
  //** getBooks gets called when
  // ** Filter(search) is submitted OR currentPage(page number) is updated & it has functionality to accept itemsPerPage(set at 20)

  //**     (APP CRITIQUE)     IF MORE TIME >>> app needs:   (APP CRITIQUE)    **////
  // - better error handling, eg if no data is found when searched... user has to click again to get 'all' results again
  // - cleaner state change, eg loading and shown in the UI
  // - better UI, buttons inputs, containers and books info
  // - Items per page <select> input to be added with options that will reflect in state and localStorage

  const url = "http://nyx.vima.ekt.gr:3000/api/books/";
  const getBooks = async () => {
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page: currentPage,
        itemsPerPage: SelectedItemsPerPage,
        filters: [{ type: "all", values: [filter] }],
      }),
    };
    try {
      const fetchResponse = await fetch(`${url}`, settings);
      const result = await fetchResponse.json();
      setIsLoading(false);
      setCount(Math.ceil(result.count / SelectedItemsPerPage)); // this gets the total results and divides by items on page
      return setData(result.books); // Here we set the data to 'data' State
    } catch (e) {
      console.log("error", e);
      return e;
    }
  };

  useEffect(() => {
    // setIsLoading(true); // Spinner ideally to be added to show loading state
    getBooks();
  }, [currentPage]);

  //* Here we handle page clicking, the following takes into account issues with React-Paginate,
  // which starts has an index starting at 0,which we don't want
  const handlePageClick = (event) => {
    const newOffset = event.selected + 1;
    setCurrentPage(newOffset);
    return getBooks();
  };

  //** Here we clear the data in local storage before filtering data, this removes likely errors
  const handleFilteredSearch = (e) => {
    e.preventDefault();
    localStorage.clear();
    getBooks();
  };

  return (
    <div className="App">
      {/*<h2>Books Galore</h2>*/}
      <label style={{ display: "inline-flex", marginTop: "20px" }}>
        <input
          className={"form-control mb-2 mr-sm-2"}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder={"Search Books"}
        />

        <button
          className={"btn btn-secondary mb-2"}
          onClick={handleFilteredSearch}
        >
          Results
        </button>
      </label>
      {!isLoading && (
        <div className={"pagnationContainer"}>
          <ReactPaginate
            pageCount={count}
            pageRange={2}
            forcePage={currentPage - 1}
            marginPagesDisplayed={2}
            onPageChange={handlePageClick}
            containerClassName={"container"}
            previousLinkClassName={"page_previous"}
            breakClassName={"page"}
            nextLinkClassName={"page_next"}
            pageClassName={"page"}
            disabledClassName={"disabled"}
            activeClassName={"active"}
          />
        </div>
      )}
      s
      <div className={"books_parent_container"}>
        {data &&
          data.map((item) => <BooksCard key={item.id} data={{ ...item }} />)}
      </div>
    </div>
  );
};

export default App;

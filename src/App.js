import "./App.css";
import { useEffect, useState } from "react";
import BooksCard from "./components/BooksCard";

const App = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState("");
  const [currentPage, setcurrentPage] = useState(1);
  const [SelectedItemsPerPage, setItemsPerPage] = useState(20);

  useEffect(() => {
    setIsLoading(true);
    // const handleFetch = async () =>
    //   await fetch("http://nyx.vima.ekt.gr:3000/api/books/", {
    //     method: "POST",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       page: currentPage,
    //       itemsPerPage: SelectedItemsPerPage,
    //     }),
    //   }).then((data) => {
    //     const result = [data.json()];
    //     setData(result);
    //     setIsLoading(false);
    //     // console.log("data!!", data.json());
    //   });
    //
    // handleFetch();

    const url = "http://nyx.vima.ekt.gr:3000/api/books/";

    const getDevices = async () => {
      const location = window.location.hostname;
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
        return setData(result);
      } catch (e) {
        return e;
      }
    };
    getDevices();
  }, []);

  console.log(data);

  return (
    <div className="App">
      <h2>Boooooks fiascooo</h2>
      {!isLoading &&
        data &&
        data.map((item) => {
          return (
            <BooksCard
              // id={item.id}
              key={item.index}
              title={item.book_title}
              author={item.book_author}
              book_pages={item.book_pages}
              year={item.book_publication_year}
            />
          );
        })}
    </div>
  );
};

export default App;

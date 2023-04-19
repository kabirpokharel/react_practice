import React, { useState, useEffect } from "react";
import { Input } from "antd";
import BooksApi from "./apiProxy";
import { Doc } from "./type";
import BookCard from "./BookCard";
import { debounce } from "lodash";
import { dummyValue } from "./dummy";

//TODO: follow https://www.youtube.com/watch?v=ASlTFtCjkU8&t=190s for next step i.e filter

const { GetBooks } = BooksApi;

const InfniteScroll = () => {
  const [search, setSearch] = useState<any>("");
  const [query, setQuery] = useState<any>("");
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const URL = "http://openlibrary.org/search.json";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
   const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    getData();
  }, [query, page]);

  const getData = async () => {
    // setData(dummyValue);
    // return;
    if (!query) {
      return;
    }
    setLoading(true);
    const bookData = await GetBooks(URL, { q: query, page });
    const _bookData = [...data, ...bookData.docs.map((show: Doc) => show.title)];
    const temp = [...new Set(_bookData)]
    setData(temp);
    console.log("see the data  = = = > ", data);
    setLoading(false);
    return data;
  };
  if (loading) {
    return <h1>Loading ...</h1>;
  }
  return (
    <div
      className="bg-dark d-flex flex-column align-items-center "
      style={{ height: "100%", position: "relative" }}
    >
      <div style={{ position: "fixed", top: "0", zIndex: "2", height: "31.51px", width: "340px" }}>
        <Input
          value={search}
          className="d-block"
          onChange={handleChange}
          onBlur={handleBlur}
          style={{ width: "100%" }}
        />
      </div>
    
        <div style={{ marginTop: "31.51px" }}>
          {data.map((title: string, id: number) => (
            <div key={id + title}>
              <BookCard {...{ title, id }} />
            </div>
          ))}
        </div>
        {loading && <h1>Loading ...</h1>}
    </div>
  );
};

export default InfniteScroll;

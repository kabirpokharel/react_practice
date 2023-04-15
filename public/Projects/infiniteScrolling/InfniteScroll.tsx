import React, { useState, useEffect } from "react";
import axios from "axios";
import BooksApi from "./apiProxy";
import { Doc } from "./type";

const { GetBooks } = BooksApi;

const InfniteScroll = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const URL = "http://openlibrary.org/search.json";
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    getData();
  }, [query, page]);

  const getData = async () => {
    setLoading(true);
    const bookData = await GetBooks(URL, { q: query, page });
    setData(bookData);
    console.log("see the data  = = = > ", data);
    setLoading(false);
    return data;
  };
  if (loading) {
    return <h1>Loading ...</h1>;
  }
  return (
    <div>
      <input onBlur={handleChange} />
      <ul>
        {data?.docs?.map((doc:Doc,id:number) => (
          <li key={doc.key}>{`${id}: ${doc.title}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default InfniteScroll;

import React, { useEffect, useState } from "react";
import { Gallery } from "./Gallery/Gallery";
import { Searchbar } from "./Searchbar/Searchbar";
import { Warning } from "./App.styled";

export const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    setInputValue("");
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();
    setPage(1);
    const { Search } = event.currentTarget.elements;
    if (!Search.value) return setInputValue("");

    setInputValue(Search.value.trim());
  };

  return (
    <div>
      <Searchbar handleSubmit={handleSubmit} />
      {!inputValue && (
        <Warning>
          Gallery is empty. Please write somting in Input! &#x1F609;
        </Warning>
      )}
      {inputValue && (
        <Gallery searchValue={inputValue} page={page} handlePage={setPage} />
      )}
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { Gallery } from "./Gallery/Gallery";
import { Searchbar } from "./Searchbar/Searchbar";
import { Warning } from "./App.styled";

export const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [defaultValue, setDefaultValue] = useState(false);

  useEffect(() => {
    setInputValue("");
    setDefaultValue(true);
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();
    const { Search } = event.currentTarget.elements;
    if (!Search.value) return;

    setInputValue(Search.value.trim());
    setDefaultValue(false);
  };

  return (
    <div>
      <Searchbar handleSubmit={handleSubmit} />
      {defaultValue && (
        <Warning>
          Gallery is empty. Please write somting in Input! &#x1F609;
        </Warning>
      )}
      <Gallery searchValue={inputValue} />
    </div>
  );
};

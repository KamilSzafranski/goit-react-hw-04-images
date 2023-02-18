import React, { useEffect } from "react";
import { useRef } from "react";
import {
  Searchbarr,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from "./Searchbar.styled";
import PropTypes from "prop-types";

export const Searchbar = ({ handleSubmit }) => {
  const inputRef = useRef(null);
  useEffect(() => inputRef.current.focus(), []);
  return (
    <Searchbarr>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormInput ref={inputRef} type="text" name="Search" />
        <SearchFormButton type="submit"></SearchFormButton>
      </SearchForm>
    </Searchbarr>
  );
};

Searchbar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

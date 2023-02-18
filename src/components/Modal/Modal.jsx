import React, { useEffect, useCallback } from "react";
import { Overlay, ModalDiv } from "./Modal.styled";
import PropTypes from "prop-types";

export const Modal = ({ handleCloseModal, image }) => {
  const closeOnKey = useCallback(
    event => {
      if (event.code === "Escape") {
        handleCloseModal();
      }
    },
    [handleCloseModal]
  );

  useEffect(() => {
    window.addEventListener("keydown", closeOnKey);

    return () => window.removeEventListener("keydown", closeOnKey);
  }, [closeOnKey]);

  return (
    <Overlay onClick={handleCloseModal}>
      <ModalDiv>
        <img alt={image[0].tags} src={image[0].largeImageURL} />
      </ModalDiv>
    </Overlay>
  );
};

Modal.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
  image: PropTypes.arrayOf(PropTypes.object).isRequired,
};

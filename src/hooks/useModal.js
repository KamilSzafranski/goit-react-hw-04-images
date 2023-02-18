import { useState } from "react";

export const useModal = () => {
  const [id, setId] = useState("");

  const handleModal = evt => {
    evt.preventDefault();
    const { dataset } = evt.target;

    setId(dataset.id);
  };

  const handleCloseModal = () => setId("");

  return { id, handleCloseModal, handleModal };
};

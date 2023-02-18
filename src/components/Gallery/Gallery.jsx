import React, { useMemo } from "react";
import {
  GalleryBtn,
  GalleryGrid,
  GalleryItem,
  GalleryImg,
  Warning,
  SpinnerContainer,
  DotSpinnerContainer,
  Text,
} from "./Gallery.styled";
import { Fragment } from "react";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import { Modal } from "components/Modal/Modal";

import PropTypes from "prop-types";
import { useGallery } from "hooks/useGallery";
import { useModal } from "hooks/useModal";

export const Gallery = ({ searchValue }) => {
  const {
    gallery,
    page,
    loader,
    searchNothing,
    isPhotoLeft,
    handleSearch,
    handlePagination,
    handleClick,
  } = useGallery(searchValue);

  const { id, handleCloseModal, handleModal } = useModal();

  const modalImg = useMemo(
    () => gallery.filter(element => element.id === parseFloat(id)),
    [id]
  );

  return (
    <>
      {id && <Modal handleCloseModal={handleCloseModal} image={modalImg} />}
      {!loader && searchNothing && (
        <Warning>
          We found nothing &#x1F62D; Please try againg with corret search value
          &#x1F609;
        </Warning>
      )}
      <GalleryGrid>
        {gallery.map(element => {
          return (
            <GalleryItem key={element.id}>
              <GalleryImg
                onClick={handleModal}
                alt={element.tags}
                src={element.webformatURL}
                data-id={element.id}
              />
            </GalleryItem>
          );
        })}
      </GalleryGrid>

      {loader && page === 1 && (
        <>
          <SpinnerContainer>
            <TailSpin
              height="180"
              width="180"
              color="#303f9f"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </SpinnerContainer>
        </>
      )}
      {loader && page !== 1 && (
        <>
          <DotSpinnerContainer>
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#303f9f"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          </DotSpinnerContainer>
        </>
      )}

      {isPhotoLeft && gallery.length !== 0 && !loader && (
        <GalleryBtn onClick={handleClick}>Load more</GalleryBtn>
      )}
      {!isPhotoLeft && !searchNothing && !loader && <Text>No more photo</Text>}
    </>
  );
};

Gallery.propTypes = {
  searchValue: PropTypes.string.isRequired,
};

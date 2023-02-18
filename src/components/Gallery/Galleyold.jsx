import React, { PureComponent } from "react";
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
import { fetchGallery } from "services/api";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import { Modal } from "components/Modal/Modal";

import PropTypes from "prop-types";

export class Gallery extends PureComponent {
  state = {
    gallery: [],
    page: 1,
    loader: false,
    searchNothing: false,
    isPhotoLeft: true,
    id: "",
  };

  handleSearch = async () => {
    this.setState(prevState => ({
      loader: true,
      searchNothing: false,
      page: 1,
      gallery: [],
    }));

    try {
      const galleryImages = await fetchGallery(this.props.searchValue);
      console.log(galleryImages);
      if (galleryImages.hits.length === 0)
        this.setState(prevState => ({ searchNothing: true }));

      this.setState(prevState => ({
        gallery: galleryImages.hits,
      }));

      if (galleryImages.totalHits <= 12) {
        this.setState(prevState => ({ isPhotoLeft: false }));
      } else {
        this.setState(prevState => ({ isPhotoLeft: true }));
      }
    } catch (error) {
    } finally {
      this.setState(prevState => ({
        loader: false,
      }));
    }
  };

  handlePagination = async () => {
    const { page } = this.state;
    const { searchValue } = this.props;
    this.setState(prevState => ({ loader: true }));
    try {
      const galleryImages = await fetchGallery(searchValue, page);

      this.setState(prevState => ({
        gallery: [...prevState.gallery, ...galleryImages.hits],
      }));

      if (page * 12 > galleryImages.totalHits)
        return this.setState(prevState => ({ isPhotoLeft: false }));
    } catch (error) {
      console.log(error);
    } finally {
      this.setState(prevState => ({
        loader: false,
      }));
    }
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchValue !== this.props.searchValue) {
      await this.handleSearch();
    }

    if (prevState.page !== this.state.page && this.state.page !== 1) {
      await this.handlePagination();
    }
  }

  handleClick = event => {
    event.preventDefault();
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleModal = evt => {
    evt.preventDefault();
    const { dataset } = evt.target;
    this.setState(prevState => ({
      id: parseFloat(dataset.id),
    }));
  };

  handleCloseModal = () => {
    this.setState(prevState => ({ id: "" }));
  };

  render() {
    const { gallery, loader, page, searchNothing, isPhotoLeft, id } =
      this.state;

    return (
      <>
        {id && (
          <Modal
            handleCloseModal={this.handleCloseModal}
            image={gallery.filter(element => element.id === id)}
          />
        )}
        {!loader && searchNothing && (
          <Warning>
            We found nothing &#x1F62D; Please try againg with corret search
            value &#x1F609;
          </Warning>
        )}
        <GalleryGrid>
          {gallery.map(element => {
            return (
              <GalleryItem key={element.id}>
                <GalleryImg
                  onClick={this.handleModal}
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
          <GalleryBtn onClick={this.handleClick}>Load more</GalleryBtn>
        )}
        {!isPhotoLeft && !searchNothing && !loader && (
          <Text>No more photo</Text>
        )}
      </>
    );
  }
}

Gallery.propTypes = {
  searchValue: PropTypes.string.isRequired,
};

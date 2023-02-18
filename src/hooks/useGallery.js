import { useState, useEffect } from "react";
import { fetchGallery } from "services/api";

export const useGallery = searchValue => {
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [searchNothing, setSearchNothing] = useState(false);
  const [isPhotoLeft, setIsPhotoLeft] = useState(true);

  useEffect(() => {
    console.log("useEffet SearchValue");
    if (searchValue) handleSearch();
  }, [searchValue]);

  useEffect(() => {
    console.log("useEffet page");
    if (searchValue && page !== 1) handlePagination();
  }, [page]);

  const handleSearch = async () => {
    setLoader(true);
    setSearchNothing(false);
    setPage(() => 1);
    setGallery(() => []);

    console.log("handleSearch");

    try {
      const galleryImages = await fetchGallery(searchValue);
      if (galleryImages.hits.length === 0) setSearchNothing(true);

      setGallery(galleryImages.hits);

      if (galleryImages.totalHits <= 12) {
        setIsPhotoLeft(false);
      } else {
        setIsPhotoLeft(true);
      }
    } catch (error) {
    } finally {
      setLoader(false);
    }
  };

  const handlePagination = async () => {
    setLoader(true);

    console.log("handlePagianation");
    try {
      const galleryImages = await fetchGallery(searchValue, page);

      setGallery(prevState => [...prevState, ...galleryImages.hits]);

      if (page * 12 > galleryImages.totalHits) return setIsPhotoLeft(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };
  const handleClick = event => {
    event.preventDefault();
    setPage(prevState => prevState + 1);
  };

  return {
    gallery,
    page,
    loader,
    searchNothing,
    isPhotoLeft,
    handleClick,
  };
};

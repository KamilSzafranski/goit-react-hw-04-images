import { useState, useEffect, useCallback } from "react";
import { fetchGallery } from "services/api";

export const useGallery = (searchValue, page, callbackSetPage) => {
  const [gallery, setGallery] = useState([]);
  const [loader, setLoader] = useState(false);
  const [searchNothing, setSearchNothing] = useState(false);
  const [isPhotoLeft, setIsPhotoLeft] = useState(true);

  const handlePagination = useCallback(async () => {
    console.log("pagintion");
    setLoader(true);
    try {
      const galleryImages = await fetchGallery(searchValue, page);

      setGallery(prevState => [...prevState, ...galleryImages.hits]);

      if (page * 12 > galleryImages.totalHits) return setIsPhotoLeft(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  }, [page, searchValue]);

  const handleSearch = useCallback(async () => {
    setLoader(true);
    setSearchNothing(false);
    setGallery(() => []);
    console.log("search");
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
  }, [searchValue]);

  useEffect(() => {
    if (searchValue) handleSearch();
  }, [handleSearch, searchValue]);

  useEffect(() => {
    if (page !== 1) handlePagination();
  }, [handlePagination, page]);

  const handleClick = event => {
    event.preventDefault();
    callbackSetPage(prevState => prevState + 1);
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

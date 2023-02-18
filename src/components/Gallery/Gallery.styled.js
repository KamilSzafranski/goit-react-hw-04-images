import styled from 'styled-components';

const GalleryGrid = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 24px;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;

const GalleryItem = styled.li`
  border-radius: 2px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
`;

const GalleryImg = styled.img`
  src: url('https://picsum.photos/id/237/200/300');
  display: block;
  width: 100%;
  height: 260px;
  object-fit: cover;
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: scale(1.03);
    cursor: zoom-in;
  }
`;

const GalleryBtn = styled.button`
  display: block;
  margin: 0 auto;
  margin-bottom: 24px;
  padding: 8px 16px;
  border-radius: 2px;
  background-color: #3f51b5;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);

  text-align: center;
  color: #fff;
  border: 0;
  text-decoration: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 18px;
  line-height: 24px;
  font-style: normal;
  font-weight: 500;
  min-width: 180px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);

  &:hover,
  &:focus {
    background-color: #303f9f;
  }
`;

const Warning = styled.h2`
  padding-top: 30vh;
  text-align: center;
`;

const SpinnerContainer = styled.div`
  padding-top: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DotSpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.h3`
  text-align: center;
  margin-bottom: 25px;
`;

export {
  GalleryBtn,
  GalleryGrid,
  GalleryImg,
  GalleryItem,
  Warning,
  SpinnerContainer,
  DotSpinnerContainer,
  Text,
};

import styled from 'styled-components';
const UserSelectWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-itmes: flex-start;
  gap: 20px;
  border-radius: 15px;
  user-select: none;
  h3 {
    font-size: 1.2rem;
    font-family: Anticva;
    font-weight: 100;
  }
  .short-description-wrapper {
    width: 100%;
    padding-right: 50px;
  }
  .product-header-1 {
    font-family: ricordi;
    font-size: 2.3rem;
  }

  .product-title-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-itmes: flex-start;
    gap: 5px;
    .title-top-bar {
      width: 50px;
      height: 3px;
      background-color: #000000;
    }
  }
`;

export { UserSelectWrapper };

import css from "styled-jsx/css";

const styles = css`
  .content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    gap: 12px;
    position: relative;
    z-index: 3;
  }

  .privacy-inner {
    font-size: 16px;
    margin: 40px auto 0;
    text-align: center;
    max-width: 800px;
    position: relative;
    z-index: 3;
    color: rgb(56, 61, 81);
  }
  .privacy-inner p {
    margin-bottom: 2px;
  }

  .privacy-inner a,
  .privacy-inner p {
    letter-spacing: 0.2px;
  }
  .privacy-inner a {
    font-weight: 600;
  }
  .privacy-inner p {
    margin-bottom: 20px;
  }
  .privacy-inner p span {
    font-weight: 600;
  }

  @media (min-width: 425px) {
    .content {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (min-width: 768px) {
    .content {
      grid-template-columns: repeat(5, 1fr);
    }
  }
`;

export default styles;

import css from "styled-jsx/css";

export default css`
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
  }

  .panel {
    position: relative;
    width: 800px;
    max-width: 100%;
    margin: auto;
    overflow: hidden;
  }

  .close-icon {
    position: absolute;
    top: 12px;
    right: 12px;
    cursor: pointer;
  }
`;

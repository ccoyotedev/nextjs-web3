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
    max-width: 750px;
    margin: auto;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 0 12px 9px rgba(200, 42, 194, 0.5);
  }

  .close-icon {
    position: absolute;
    top: 12px;
    right: 12px;
    cursor: pointer;
  }
`;

import css from "styled-jsx/css";

const styles = css`
  .dropdown {
    position: relative;
    width: 100%;
  }
  .dropdown-items {
    transform: scale(0);
    display: flex;
    flex-direction: column;
    position: absolute;
    top: calc(100% + 8px);
    background: white;
    width: 100%;
    z-index: 10;
  }
  .dropdown-items.visible {
    transform: scale(1);
    box-shadow: rgb(0 0 0 / 16%) 0px 1px 3px 0px;
  }
  .dropdown .select {
    font-weight: 300;
    font-size: 18px;
    padding: 6px;
    border-radius: 4px;
    width: 100%;
    border: 1px solid transparent;
    transition: all 0.2s ease 0s;
    box-shadow: rgb(0 0 0 / 16%) 0px 1px 3px 0px;
    position: relative;
    background-color: #faf7fe;
  }
  .dropdown .select:hover {
    border: 1px solid #c82ac2;
  }
  .dropdown .select span {
    text-transform: capitalize;
    text-align: left;
  }
  .dropdown .select-arrow {
    position: absolute;
    right: 10px;
    top: calc(50% + 1px);
    transform: translateY(-50%);
  }
`;

export default styles;

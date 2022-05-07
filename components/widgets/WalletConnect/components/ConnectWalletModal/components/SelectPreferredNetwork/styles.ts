import css from "styled-jsx/css";

const styles = css`
  .select-preferred-network {
    position: relative;
    z-index: 5;
    margin-bottom: 35px;
    margin-top: -20px;
    text-align: center;
  }

  .select-preferred-network .title {
    font-size: 18px;
    margin-bottom: 12px;
    color: #200543;
  }

  .dropdown {
    position: relative;
    cursor: pointer;
  }

  .dropdown-items {
    transform: scale(0);
    display: flex;
    flex-direction: column;
    position: absolute;
    top: calc(100% + 8px);
    background: white;
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
    min-width: 200px;
    border: 1px solid transparent;
    transition: all 0.2s ease 0s;
    box-shadow: rgb(0 0 0 / 16%) 0px 1px 3px 0px;
    position: relative;
    background-color: #faf7fe;
  }
  .dropdown .select:hover {
    border: 1px solid black;
  }
  .dropdown .select span {
    text-transform: capitalize;
  }
  .dropdown .select-arrow {
    position: absolute;
    right: 10px;
    top: calc(50% - 2px);
    transform: translateY(-50%);
  }

  .dropdown .option {
    min-width: 200px;
    font-size: 18px;
    font-weight: 300;
    text-transform: capitalize;
    position: relative;
    padding: 12px 5px;
    border: none;
    background-color: white;
  }
  .dropdown .option:hover,
  .dropdown .option:disabled {
    background-color: #faf7fe;
  }
  .dropdown .option:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    opacity: 0.1;
    background: grey;
  }
  .dropdown .option:last-of-type:after {
    display: none;
  }
`;

export default styles;

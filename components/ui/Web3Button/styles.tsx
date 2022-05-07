import css from "styled-jsx/css";

export default css`
  .web3-button {
    border: 1px solid black;
    background-color: black;
    padding: 0.8rem 2.4rem;
    height: 5.2rem;
    color: white;
    cursor: pointer;
    position: relative;
  }
  .web3-button.connected {
    background-color: white;
    color: black;
  }

  .web3-button.connected:active {
    background-color: rgba(0, 0, 0, 0.1);
  }

  .web3-button p {
    margin: 0;
    line-height: 1;
  }

  .loading-container {
    display: flex;
    align-items: center;
  }
  .loading-container p {
    margin-left: 0.8rem;
    text-transform: uppercase;
  }

  .network {
    text-align: left;
    text-transform: capitalize;
  }

  .dropdown {
    position: absolute;
    top: 100%;
    left: -1px;
    right: -1px;
  }
  .dropdown-item {
    background-color: white;
    padding: 1.2rem;
    border: 1px solid black;
  }
  .dropdown-item:not(:first-of-type) {
    border-top: none;
  }
  .dropdown-item p {
    font-size: 1.6rem;
  }

  .dropdown-item:hover {
    background-color: var(--col-secondary-100);
  }
`;

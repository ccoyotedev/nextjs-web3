import css from "styled-jsx/css";

export default css`
  .loader-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .lds-roller {
    width: 23px;
    height: 23px;
    display: inline-block;
    position: relative;
  }
  .lds-roller div {
    animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    transform-origin: 4em 4em;
  }
  .lds-roller div:after {
    content: " ";
    display: block;
    position: absolute;
    width: 0.7em;
    height: 0.7em;
    border-radius: 50%;
    background: #fff;
    margin: -0.4em 0 0 -0.4em;
  }
  .lds-roller div:nth-child(1) {
    animation-delay: -0.036s;
  }
  .lds-roller div:nth-child(1):after {
    top: 6.3em;
    left: 6.3em;
  }
  .lds-roller div:nth-child(2) {
    animation-delay: -0.072s;
  }
  .lds-roller div:nth-child(2):after {
    top: 6.8em;
    left: 5.6em;
  }
  .lds-roller div:nth-child(3) {
    animation-delay: -0.108s;
  }
  .lds-roller div:nth-child(3):after {
    top: 7.1em;
    left: 4.8em;
  }
  .lds-roller div:nth-child(4) {
    animation-delay: -0.144s;
  }
  .lds-roller div:nth-child(4):after {
    top: 7.2em;
    left: 4em;
  }
  .lds-roller div:nth-child(5) {
    animation-delay: -0.18s;
  }
  .lds-roller div:nth-child(5):after {
    top: 7.1em;
    left: 3.2em;
  }
  .lds-roller div:nth-child(6) {
    animation-delay: -0.216s;
  }
  .lds-roller div:nth-child(6):after {
    top: 6.8em;
    left: 2.4em;
  }
  .lds-roller div:nth-child(7) {
    animation-delay: -0.252s;
  }
  .lds-roller div:nth-child(7):after {
    top: 6.3em;
    left: 1.7em;
  }
  .lds-roller div:nth-child(8) {
    animation-delay: -0.288s;
  }
  .lds-roller div:nth-child(8):after {
    top: 5.6em;
    left: 1.2em;
  }
  @keyframes lds-roller {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

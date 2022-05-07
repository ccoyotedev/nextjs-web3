import css from "styled-jsx/css";

const styles = css`
  .warning-area {
    padding: 12px 15px;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    background-color: #faf7fe;
    margin-bottom: 24px;
  }

  .top-line {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }
  .top-line.topLine {
    margin-bottom: 10px;
  }
  .top-line.topLine p {
    font-weight: 600;
  }
  .top-line img {
    margin-top: 3px;
    position: absolute;
    left: 0;
    width: 20px;
  }
  .top-line p {
    padding-left: 30px;
    font-size: 24px;
    position: relative;
  }
  .content {
    font-size: 18px;
  }
`;

export default styles;

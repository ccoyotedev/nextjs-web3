import styles from "./styles";

interface Props {
  size?: number;
}

export const Loader = ({ size = 5 }: Props) => {
  return (
    <>
      <div
        className="lds-roller"
        style={{
          fontSize: `${size}px`,
          width: `${size * 8.125}px`,
          height: `${size * 8.125}px`,
        }}
      >
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};

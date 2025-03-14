type props = {
  size: number;
  firstColor: string;
  secondColor: string;
  border: number;
};

const LoadingIcon = ({ size, firstColor, secondColor, border }: props) => {
  const bodyStyles = document.body.style;
  if (size) {
    bodyStyles.setProperty('--size', `${size}rem`);
  }
  if (firstColor) {
    bodyStyles.setProperty('--first-border-color', firstColor);
  }
  if (secondColor) {
    bodyStyles.setProperty('--second-border-color', secondColor);
  }
  if (border) {
    bodyStyles.setProperty('--border-size', `${border}rem`);
  }
  return (
    <div className="loading inside">
      <div></div>
    </div>
  );
};

export default LoadingIcon;

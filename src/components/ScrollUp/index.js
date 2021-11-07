import Button from "../Button";

const ScrollUp = () => {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return <Button onClick={handleClick} text={"^ Back to the Top"} />;
};

export default ScrollUp;

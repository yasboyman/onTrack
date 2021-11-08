import styled from "styled-components";

// no longer using component, kept as an example for styledComponents

const StyledButton = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0.5em 1em;
  padding: 0.25em 1em;
  top: 10%;
  left: 80%;
  position: fixed;
  cursor: pointer;
`;

const Button = ({ text }) => {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };
  return <StyledButton onClick={handleClick}>{text}</StyledButton>;
};

export default Button;

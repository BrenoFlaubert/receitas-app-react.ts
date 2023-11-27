import styled from "styled-components"

export const FormButton = styled.button`
  padding: 0.8em 1.7em;
  background-color: transparent;
  border-radius: .5em;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: .5s;
  font-weight: 400;
  font-size: 17px;
  border: 1px solid;
  font-family: inherit;
  text-transform: uppercase;
  color: red;

  &::before, &::after {
  content: '';
  display: block;
  width: 50px;
  height: 50px;
  transform: translate(-50%, -50%);
  position: absolute;
  border-radius: 50%;
  z-index: -1;
  background-color: red;
  transition: 1s ease;
  }

  &::before {
  top: -1em;
  left: -1em;
  }

  &::after {
  left: calc(100% + 1em);
  top: calc(100% + 1em);
  }
  &:hover::before, &:hover::after {
  height: 410px;
  width: 410px;
  }

  &:hover {
  color: white;
  background-color: red;
  }

  &:active {
  filter: brightness(.8);
  }
`;
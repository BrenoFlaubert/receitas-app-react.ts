import { styled } from "styled-components";

export const Nav = styled.nav`
  display: flex;
  gap: 2em;
  padding: 2em;
`

export const SearchInput = styled.input`
  position: relative;
  background-color: #fff;
  padding: 1rem;
  padding-right: 3rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  width: 600px;
  border-radius: 0.5rem;
  
  &:focus, &:hover {
    outline: none;
    border-color: red;
    background-color: white;
    box-shadow: 0 0 0 1px red; 
  }
`
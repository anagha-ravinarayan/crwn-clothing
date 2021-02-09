import styled from "styled-components";
import CustomButton from "../custom-button/custom-button.component";

export const CartDropdownContainer = styled.div`
    position: absolute;
    width: 240px;
    height: 340px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    border: 1px solid black;
    background-color: white;
    top: 90px;
    right: 40px;
    z-index: 5;
    overflow-y: scroll;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;


export const CartItems = styled.div`
    height: 240px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    overflow-y: scroll;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
`;

export const EmptyCartMessage = styled.span`
    font-size: 18px;
    margin: 50px auto;
`;

export const StyledCustomButton = styled(CustomButton)`
    margin-top: auto;
`;
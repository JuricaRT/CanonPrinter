import { styled } from 'styled-components';
import { Link } from "react-router-dom";

export const TopDiv = styled.div
`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 5px;
`;

export const Logo = styled.div
`
    width: 250px;
    height: 50px;
    display: flex;
    background-color: bisque;
    color: var(--color-dark--1);
    display: flex;
    justify-content: center;
    align-content: center;
    font-size: 1.6rem;
    font-weight: 600;
    padding: 1rem 3rem;
    border-radius: 5px;
    text-align: center;
    text-transform: uppercase;
    text-decoration: none;
    align-items: center;
    justify-content: center;
    user-select: none;
`;

export const SearchBar = styled.div
`
    width: 350px;
    height: 50px;
    font-size: large;
`;

export const ProfileSettings = styled(Link)
`
    &:link, &:visited {
        display: flex;
        background-color: beige;
        color: var(--color-dark--1);
        text-transform: uppercase;
        text-decoration: none;
        width: 250px;
        height: 50px;
        font-size: 1.6rem;
        font-weight: 600;
        padding: 1rem 3rem;
        border-radius: 5px;
        text-align: center;
        align-items: center;
        justify-content: center;
    }

    &:hover {
        opacity: 0.7
    }
`;
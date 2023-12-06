import { styled, createGlobalStyle } from 'styled-components';
import Poppins from '../static/fonts/Poppins-Light.ttf'

//todo importat fontove

export const GlobalStyle = createGlobalStyle
`
    @font-face {
        font-family: 'Poppins';
        src: url(${Poppins})
    }

    body, html {
        height: 100%;
        width: 100%;
        margin: 0px;
        height: 97vh;

        font-family: 'Poppins', sans-serif;
    }

    input[type=button] {
        font-family: 'Poppins', sans-serif;
    }
`;

export const Container = styled.div
`
    display: flex;
    flex-direction: column;
    position: relative;
    margin: 0px;
    padding: 0px;
    height: 97vh;
`;
//todo viewport height maknut jer na nekim stranicama rezultira dobar height
// na nekim stranicama rezultira los height

export const BannerTitle = styled.div
`
    font-size: 24px;
`;

export const Logo = styled.div
`
    width: 320px;
    height: 100%;
    display: flex;
    background: linear-gradient(0.25turn, #005F8D, #003366);
    color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-content: center;
    font-size: 1.6rem;
    font-weight: 600;
    text-align: center;
    text-transform: uppercase;
    text-decoration: none;
    align-items: center;
    justify-content: center;
    user-select: none;
    border-color: rgba(0, 0, 0, 0.3);
    border-bottom: 5px solid black;
`;

export const ButtonLayout = styled.div
`
    position: relative;
    background: linear-gradient(#003366, #005F8D);
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-bottom: 5px solid black; 
    height: 100%;   
    width: 100%;
    padding-top: 1px;
`;

export const BannerLayout = styled.div
`
    display: flex;
    position: relative;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 7vh;
`;

export const Button1 = styled.button
`
    font-family: 'Poppins', sans-serif;
    padding: 8px;
    margin: 10px;
    width: auto;
    border-radius: 20px;
    display: inline-block;
    background-color: #7BB661;
    border: solid 2px beige;
    border-color: #7BB661;
    font-size: 20px;
    color: rgba(0, 0, 0, 0.65);
    cursor: pointer;
    transition: 0.3s ease;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);

    &:hover {
        opacity: 0.7;
    }
`;

export const Button2 = styled.button
`
    font-family: 'Poppins', sans-serif;
    padding: 8px;
    margin: 10px;
    width: auto;
    border-radius: 20px;
    border: solid 2px bisque;
    display: inline-block;
    background-color: bisque;
    font-size: 20px;
    color: black;
    cursor: pointer;
    transition: 0.3s ease;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    &:hover {
        opacity: 0.7;
    }
`;

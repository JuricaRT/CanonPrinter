import { styled, createGlobalStyle } from 'styled-components';

//todo importat fontove

export const GlobalStyle = createGlobalStyle
`
    body, html {
        height: 100%;
        width: 100%;
        margin: 0px;
        height: 100vh;
    }
`;

export const Container = styled.div
`
    @font-face {
        font-family: 'Poppins';
        src: url()
    }

    display: flex;
    flex-direction: column;
    position: relative;
    font-family: 'Arial';
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

export const ButtonLayout = styled.div
`
    position: relative;
    background-color: rgba(100, 100, 120, 0.5);
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-bottom: 2px solid black; 
    height: 7vh;   
`;

export const Button1 = styled.button
`
    padding: 8px;
    margin: 10px;
    width: auto;
    border-radius: 20px;
    display: inline-block;
    background-color: beige;
    border: solid 2px beige;
    font-size: 20px;
    color: black;
    cursor: pointer;
    transition: 0.3s ease;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);

    &:hover {
        opacity: 0.7;
    }
`;

export const Button2 = styled.button
`
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

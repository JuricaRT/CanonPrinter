import styled from 'styled-components';
import logo from '../static/images/FlipMemoImage1.jpeg'



export const OpeningMessage = styled.div
`
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    margin-top: 5%;
    margin-bottom: 5%;
    height: 60%;
    width: 80%;
    color: cyan;
    background-image: url(${logo});
    background-position: center;
    background-size: cover;
`;

export const PictureAndMessage = styled.div
`
    justify-content: center;
    align-items: center;
    display: flex;
    width: 60%;
    height: 80%;
`;

export const Reviews = styled.div
`
    display: flex;
    justify-content: space-between;
    height: auto;
`;

export const Review = styled.div
`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-right: 10%;
    margin-left: 10%;
    align-items: center;
    height: auto;
    border: 1px solid black;
    margin-bottom: 3%;
    width: 30%;
`;

export const ReviewPerson = styled.div
`
    bottom: 0;
    margin-top: 10px;
`;

export const ReviewChildren = styled.div
`
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 3px;
`;


import styled from 'styled-components';
import image from '../static/images/FlipMemoImage2.jpeg'

export const HorizontalSeparator = styled.div
`
    display: flex;
    flex-direction: row;
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const LeftSideImage = styled.div
`
    background-image: url(${image});
    background-position: center;
    background-size: cover;
    height: 92.8vh;
    width: 100%;
    border-right: 2px solid black;
`;
//todo: fix 92.8 vh??? moguce da je krivo zbog 97vh na global

export const LoginForm = styled.form
`
    flex: 1;
`;

export const LoginFormDiv = styled.div
`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0px;
    width: 100%;
`;

export const StandardDiv = styled.div
`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Input = styled.input
`
    width: 18vw;
    height: 40px;
    font-size: 20px;
`;

export const PasswordButtonAlignment = styled.div 
`
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-right: 0%;
    gap: 15px;
`;

export const FlattenedButton = styled.button
`
    padding: 7px;
    margin-top: 10px;
    margin-right: 5px;
    width: 200px;
    border-radius: 20px;
    border: solid 2px bisque;
    display: inline-block;
    background-color: bisque;
    font-size: 14px;
    height: 34px;
    color: black;
    cursor: pointer;
    transition: 0.3s ease;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    &:hover {
        opacity: 0.7;
    }
`;

export const ComingSoon = styled.div
`
    margin-top: 30px;
    width: 40vh;
    background-color: #f0f0f0;
    opacity: 0.6;
    box-shadow: inset 0px 12px 25px 5px rgba(0, 0, 0, 0.4);
    border: 1px solid black;
    border-radius: 15px;
    padding: 10px;
    text-align: center;
    font-size: 24px;
`;
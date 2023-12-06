import { styled } from 'styled-components';

export const ProfileFormDiv = styled.div
`
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;

export const InfoLabel = styled.label
`
    width: 12vw;
    margin-bottom: 10px;
    font-size: 20px;
    margin-right: 10px;
`;

//todo warning za password
export const PassWarningLabel = styled.label 
`
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: bold;
`;

export const ButtonsDiv = styled.div
`
    display: flex;
    flex-direction: row;
    gap: 30px;
`;
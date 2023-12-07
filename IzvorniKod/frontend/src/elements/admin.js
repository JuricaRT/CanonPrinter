import styled from 'styled-components';

export const PageDiv = styled.div
`
    display: flex;
    align-items: right;
    justify-content: right;
    text-align: center;
    width: 100vw;
`;

export const PermissionSeparator = styled.div
`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const ListDiv = styled.div
`
    display: flex;
    flex-direction: column;
    margin: 5px;
    margin-right: 20px;
    width: 35vw;
`;

export const ListSpan = styled.span
`
    background-color: black;
    color: white;
    height: 36px;
    font-size: 24px;
`;

export const HorizontalLine = styled.div
`
    border-bottom: 3px solid black;
    margin-right: 20px;
    width: 36vw;
`;

export const CollapseButton = styled.button
`
    font-family: 'Poppins', sans-serif;
    padding: 7px;
    margin-top: 10px;
    margin-right: 5px;
    width: 100%;
    border: solid 2px bisque;
    display: inline-block;
    background-color: #598c42;
    border-color: #598c42;
    font-size: 14px;
    font-weight: bold;
    height: 34px;
    color: #0d0c05;
    cursor: pointer;
    transition: 0.3s ease;
    &:hover {
        opacity: 0.7;
    }
    border-bottom: 1px solid black;
`;

export const CollapsibleContent = styled.div
`
    padding: 4px 9px;
    display: none;
    overflow: hidden;
    flex-direction: column;
    background-color: #317b9e;
    align_items: left;
    justify-content: left;
    gap: 2px;
    text-align: left;
`;

export const AdminAction = styled.button
`
    font-family: 'Poppins', sans-serif;
    padding: 3px;
    margin: 10px;
    border-radius: 20px;
    display: inline-block;
    background-color: #7BB661;
    border: solid 1px black;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.8);
    cursor: pointer;
    transition: 0.3s ease;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    width: 30%;

    &:hover {
        opacity: 0.7;
    }
`

export const ButtonPositioning = styled.div
`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`
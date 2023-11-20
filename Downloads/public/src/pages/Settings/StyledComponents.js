import styled from "styled-components";
export const ProfileHeading = styled.h3`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 34px;
    color: #0B0E2C;
    text-transform: capitalize;
    word-break: break-all;
`
export const InputLabel = styled.label`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    color: #303350;
`
export const Input = styled.input`
    all: unset;
    background: #FFFFFF;
    border: 1px solid #E9EAF3;
    box-shadow: 0px 2px 12px rgba(11, 22, 44, 0.05);
    border-radius: 52px;
    outline: none;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #33343c;
    
    :disabled{
        opacity: 0.8;
        color: #6F7182;
    }
`
export const ChangeButton = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: #1476FF;
    border: 2px solid #1476FF;
    border-radius: 20px;
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    color: white;
    width: 100%;
    letter-spacing: 0.5px;
    transition: all 0.2s;
    :hover{
        opacity: 0.9;
    }
    :active{
        transform: scale(0.99);
    }
`
export const CardContainer = styled.div`
    background: #FFFFFF;
    box-shadow: 0px 2px 10px rgba(25, 93, 194, 0.07);
    border-radius: 30px;
`
export const SubHeading = styled.p`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    margin-top: 3px;
    margin-bottom: 0px;
    font-size: 16px;
    color: #6F7182;
`
export const SecurityCard = styled.div`
    background: #FFFFFF;
    border: ${({ active }) => active ? '2.5px solid #1476FF' : '1px solid #E9EAF3'};
    box-shadow: 0px 2px 10px rgba(25, 93, 194, 0.07);
    border-radius: 30px;
`
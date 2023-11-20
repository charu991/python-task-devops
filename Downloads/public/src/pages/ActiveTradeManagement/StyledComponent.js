import styled from "styled-components";

export const Heading = styled.h2`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
`

export const Heading3 = styled.h3`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    color: #303350;
`

export const WarningBox = styled.div`
    background: #FFFCF5;
    border: 1px solid #FEEECD;
    border-radius: 20px;
`

export const Text = styled.p`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
`

export const Card = styled.div`
    background: #FFFFFF;
    border: 1px solid #E9EAF3;
    box-shadow: 0px 2px 10px rgba(25, 93, 194, 0.07);
    border-radius: 30px;
`

export const CardHeading = styled.h4`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    color: #303350;
`

export const CardSubHeading = styled.p`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: #303350;
`

export const CardText = styled.p`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: #303350;
`
export const Strong = styled.span`
    font-weight: 700;
`

export const CardButton = styled.button`
    background: #1476FF;
    border-radius: 44px;
    outline: none;
    border: 1px solid #1476FF;
    transition: all 0.2s;
    :hover:not(:disabled){
        opacity: 0.9;
    }
    :active{
        transform: scale(0.9);
    }
`

export const ButtonText = styled.p`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    color: #FFFFFF;
`

export const Span3 = styled.span`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    color: #FFFFFF;
`

export const Span6 = styled.span`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    color: #FFFFFF;
`

export const HorizontalLine = styled.div`
    height: 1px;
    background: #E9EAF3;
    margin: 1rem 0;
    width: 100%;
`

export const CancelButton = styled.button`
    background: #FCFDFF;
    border: 1px solid #FF5A65;
    border-radius: 44px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: #303350;
    transition: all 0.2s;
    :hover{
        background: #FF5A65;
        color: #FCFDFF;
    }
    :active{
        transform: scale(0.9);
    }
`

export const CardFooterText = styled.p`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: #6F7182;
`

export const Small = styled.p`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    color: #303350;
`

export const Heading6 = styled.h6`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: #1476FF;
`

export const Button = styled.button`
    background: #FCFDFF;
    border: 1px solid #6F7182;
    border-radius: 44px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: #6F7182;
    transition: all 0.2s;
    :hover{
        background: #6F7182;
        color: #FCFDFF;
    }
    :active{
        transform: scale(0.9);
    }
`

export const BlueText = styled.p`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #1476FF;
`

export const PersonChat = styled.div`
    background: #F7F9FC;
    border-radius: 10px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
`

export const MyChat = styled.div`
    background: #F7F9FC;
    border-radius: 10px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
`

export const SendButton = styled.button`
    background: #1476FF;
    box-shadow: 0px 4px 10px rgba(2, 87, 251, 0.19);
    border-radius: 100%;
    outline: none;
    border: 1px solid #1476FF;
    color: white;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s;
    :hover{
        opacity: 0.9;
    }
    :active{
        transform: scale(0.9);
    }
`
export const Input = styled.input`
    background: #FFFFFF;
    border: 1px solid #E9EAF3;
    border-radius: 50px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    outline: none;
    :focus{
        border: 1px solid #1476FF;
    }
`
export const StatusText = styled.span`
    color: #6F7182;
`
export const DisputeLabel = styled.label`
    font-size: 18px;
    font-weight: 500;
`
export const DisputeInput = styled.input`
    border: 1px solid #E9EAF3;
    box-shadow: 0px 0px 10px #E9EAF3;
    width: 100%;
    padding: 7px 9px;
    border-radius: 20px;
    outline: none;
`
export const Label = styled.label`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    margin-top: 5px;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #6F7182;
`
export const TextSpan = styled.span`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #6F7182;
`
export const FeedInput = styled.textarea`
    border: 2px solid #E9EAF3;
    box-shadow: 0px 0px 10px #E9EAF3;
    width: 100%;
    height: 8rem;
    outline: none;
    border-radius: 20px;
    padding: 10px;
`
export const ImgDiv = styled.div`
    border:  ${({ theme }) => theme.border};
    display: flex;
    border-radius: 23px;
    justify-content: space-around;
    margin-top: 10px;
`
export const DisputeButton = styled.button`
    border: 2px solid #1476FF;
    background-color: #1476FF;
    color: white;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    padding: 3px 25px;
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
`
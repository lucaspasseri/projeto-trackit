import styled from 'styled-components';
import {Link, Redirect} from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';

export default function Footer(){
    const percentage = 66;

    return(
        <FooterContainer>
            <StyledLink to="/habitos"><div>Hábitos</div></StyledLink>
            <StyledLink to="/hoje"><CustomDiv><CircularProgressbar
                value={percentage}
                text={"Hoje"}
                background
                backgroundPadding={6}
                styles={buildStyles({
                    backgroundColor:  "#52B6FF",
                    textColor: "#fff",
                    pathColor: "#fff",
                    trailColor: "transparent"
                })} /></CustomDiv>
            </StyledLink> 
            <StyledLink to="/historico"><div>Histórico</div></StyledLink>
        </FooterContainer>
    );
}
const CustomDiv = styled.div`
    height: 150px;
    width: 100px;
`;

const StyledLink = styled(Link)`
    font-weight: normal;
    text-decoration-line: none;
    color: #52B6FF;
`;

const FooterContainer = styled.div`
    width: 375px;
    height: 70px;
    background: #ffffff;
    display: flex;
    align-items: center;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 17.976px;
    line-height: 22px;
    color: #52B6FF;
    position: fixed;
    bottom: 0;
    left: 0;
    justify-content: space-around;
`;
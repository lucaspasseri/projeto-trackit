import styled from "styled-components";
import {Link} from "react-router-dom";
import React, {useContext} from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import UserContext from "../../contexts/UserContext";

export default function Footer(){

	const { progress } = useContext(UserContext);

	return(
		<FooterContainer>
			<StyledLink to="/habitos"><div>Hábitos</div></StyledLink>
			<StyledLink to="/hoje"><CustomDiv><CircularProgressbar
				value={progress}
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
    padding: 0 15px;
	width: 100vw;
	-webkit-box-shadow: 0px -3px 7px 1px rgba(0, 0, 0, 0.15), 0px -3px 7px 1px rgba(0, 0, 0, 0.15); 
	box-shadow: 0px -3px 7px 1px rgba(0, 0, 0, 0.15), 0px -3px 7px 1px rgba(0, 0, 0, 0.15);
	@media screen and (max-width: 320px) {
		width: 320px;
	}
`;
import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
	display: flex;
	@media screen and (min-width: 600px) {
		width: 560px;
	}
`;

export const Top = styled.div`
    height: 85px;
    display: flex;
    justify-content:space-between;
    align-items: center;

    div {
        font-family: 'Lexend Deca', sans-serif;
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
    }
`;

export const Body = styled.div`
    margin-top: 70px;
    margin-bottom: 70px;
    border-bottom: 1px solid #f2f2f2;
    background-color:#f2f2f2;
    padding: 0 18px;
    min-height: 520px;
	width: 100vw;	
    
    > div {
        font-family: 'Lexend Deca', sans-serif;
        font-size: 17.976px;
        line-height: 22px;
        color: #666666;
    }
`;

export const Header = styled.div`
    height: 70px;
    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    position: fixed;
    top: 0;
    left: 0;
    display: flex; 
    justify-content: space-between;
    align-items: center;
    padding: 0 18px;
	width: 100vw;
	@media screen and (max-width: 320px) {
		width: 320px;
	}
`;
export const Title = styled.div`
    font-family: 'Playball', cursive;
    font-size: 38.982px;
    line-height: 49px;
    color: #FFFFFF;
`;
export const ImageProfile = styled.img`
    height: 51px;
    width: 51px;
    border-radius:100%;
`;

export const Card = styled.div`
    height: 94px;
    background-color:#FFF;
    margin-bottom: 10px;
    border-radius: 5px;
    padding: 13px;
    display: flex;
    justify-content: space-between;
`;

export const UserActs = styled.form`
    display: flex;
    flex-direction:column;
    padding: 0 36px;

    > * {
        height: 45px;
        border-radius: 5px;
        border: 1px solid #D5D5D5;
        margin-bottom: 6px;
        font-family: 'Lexend Deca', sans-serif;
        font-size: 19.976px;
        line-height: 25px;
    }

    div {
        font-size: 13.976px;
        line-height: 17px;
        text-decoration-line: underline;
        color: #52B6FF;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
    }
`;
export const InputLogIn = styled.input`
    padding-left: 10px;
    ::placeholder{
        color: #D5D5D5;
    }
`;
export const ButtonLogIn = styled.button`
    background-color:#52B6FF;
    color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const NavLink = styled(Link)`
    font-size: 13.976px;
    line-height: 17px;
    text-decoration-line: underline;
    color: #52B6FF;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
`;

export const ContainerAuth = styled.div`
	@media screen and (min-width: 600px) {
		width: 560px;
	}
`;

export const HeaderAuth = styled.div`
    height: 280px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const Logo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 180px;
`;
export const ImageLogo = styled.img`
    width: 160px;
`;
export const TextLogo = styled.div`
    font-family: 'Playball';
    font-size: 68.982px;
    line-height: 86px;
    color: #126ba5;
    width: 100%;
    display: flex;
    justify-content: center;
`;
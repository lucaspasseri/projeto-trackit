import styled from "styled-components";

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
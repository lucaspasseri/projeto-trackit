import styled from 'styled-components';
import {useContext} from 'react';

import UserContext from '../../contexts/UserContext';

import Footer from '../Footer/Footer';

export default function Historic(){

    const { progress} = useContext(UserContext);
    const userStorage = JSON.parse(localStorage.getItem("userStorage"));
    return(
        <>
            <Header>
                <Title>TrackIt</Title>
                <ImageProfile src={userStorage.image}/>
            </Header>
            <Body>
                <Top>
                    <div>Histórico</div>
                </Top>
                <ShowHistoric>Em breve você poderá ver o histórico dos seus hábitos aqui!</ShowHistoric>
            </Body>
            <Footer progress={progress}></Footer>
        </>
    );
}
const ShowHistoric = styled.div`

`;

const Header = styled.div`
    height: 70px;
    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    position: fixed;
    width:375px;
    top: 0;
    left: 0;
    display: flex; 
    justify-content: space-between;
    align-items: center;
    padding: 0 18px;
`;
const Title = styled.div`
    font-family: 'Playball', cursive;
    font-size: 38.982px;
    line-height: 49px;
    color: #FFFFFF;
`;
const ImageProfile = styled.img`
    height: 51px;
    width: 51px;
    border-radius:100%;
`;

const Top = styled.div`
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

const Body = styled.div`
    margin-top: 70px;
    margin-bottom: 70px;
    border-bottom: 1px solid #f2f2f2;
    background-color:#f2f2f2;
    padding: 0 18px;
    min-height: 520px;
    
    > div {
        font-family: 'Lexend Deca', sans-serif;
        font-size: 17.976px;
        line-height: 22px;
        color: #666666;
    }
`;
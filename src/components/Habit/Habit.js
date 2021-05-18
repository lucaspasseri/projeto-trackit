import styled from 'styled-components';

export default function Habit(){
    return(
        <>
            <Header>
                <Title>TrackIt</Title>
                <ImageProfile src="https://yt3.ggpht.com/ytc/AAUvwniFYPUGdxQlEddGuOuxuP9Va39N-vU616xjBjle=s900-c-k-c0x00ffffff-no-rj"/>
            </Header>
            <Body>
                <Top>
                    <div>Meus hábitos</div>
                    <ButtonPlus>+</ButtonPlus>
                </Top>
                <div>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</div>
            </Body>
            <Footer>
                <div>Hábitos</div>
                <div>Hoje</div>
                <div>Histórico</div>
            </Footer>
        </>
    );
}

const Header = styled.div`
    height: 70px;
    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    position: fixed;
    width: 100%;
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
const Body = styled.div`
    margin-top: 70px;
    background-color:#f2f2f2;
    height: 100px;
    height: 520px;
    padding: 0 18px;
    
    div {
        font-family: 'Lexend Deca', sans-serif;
        font-size: 17.976px;
        line-height: 22px;
        color: #666666;
    }
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
const ButtonPlus = styled.button`
    width: 40px;
    height: 40px;
    background: #52B6FF;
    border-radius: 4.63636px;
    border: none;
    color: #FFFFFF;
    font-size: 26.976px;
    line-height: 34px;
`;

const Footer = styled.div`
    height: 70px;
    background: #FFFFFF;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 17.976px;
    line-height: 22px;
    color: #52B6FF;
`;
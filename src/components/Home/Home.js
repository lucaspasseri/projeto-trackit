import styled from "styled-components";

export default function Home(){
    return(
            <>
                <Header>
                    <Logo>
                        <ImageLogo src="https://thumbs.dreamstime.com/b/growing-graph-d-histogram-green-arrow-32612397.jpg"/>
                        <ImageLogo src="https://images.ctfassets.net/zsv3d0ugroxu/4p1Y4eUTpHQW5OwNt22qGy/9da0eb52fa76dbf7666c67dafaaac5b7/Logo_TrackIt"/>
                    </Logo>
                </Header>
                <UserActs>
                    <InputLogIn placeholder="email" />
                    <InputLogIn placeholder="senha"/>
                    <ButtonLogIn>Entrar</ButtonLogIn>
                    <div>Não tem uma conta? Cadastre-se!</div>
                </UserActs>

            </>
    );
}

const Header = styled.div`
    height: 280px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Logo = styled.div`
    width: 180px;
`;
const ImageLogo = styled.img`
    width: 160px;
`;

const UserActs = styled.div`
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
const InputLogIn = styled.input`
    padding-left: 10px;
    ::placeholder{
        color: #D5D5D5;
    }
`;
const ButtonLogIn = styled.button`
    background-color:#52B6FF;
    color: #FFFFFF;
`;
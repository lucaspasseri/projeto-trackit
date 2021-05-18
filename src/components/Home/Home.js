import styled from 'styled-components';
import React from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import Loader from "react-loader-spinner";


export default function Home({setToken}){
    let history = useHistory();

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    function ClickLogIn(){  
        if(email.length>0 && password.length>0){
            setLoading(true);
            const body = {
                email: email,
                password: password  
            }
            const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", body);
    
            request.then(response => {
                setLoading(false);
                console.log(response);
                setToken(response.data.token);
                history.push("/habitos");
            });
            request.catch(response => {
                setLoading(false);
                setEmail("");
                setPassword("");
                console.log(response);
            });   
        }
    }

    return(
            <>
                <Header>
                    <Logo>
                        <ImageLogo src="https://thumbs.dreamstime.com/b/growing-graph-d-histogram-green-arrow-32612397.jpg"/>
                        <TextLogo>TrackIt</TextLogo>
                    </Logo>
                </Header>
                <UserActs>
                    <InputLogIn disabled={loading} onChange={e => setEmail(e.target.value)} value={email} placeholder="email" />
                    <InputLogIn disabled={loading} type="password" onChange={e =>setPassword(e.target.value)} value={password} placeholder="senha"/>
                    {loading?<ButtonLogIn><Loader type="ThreeDots" color="#FFFFFF" height={60} width={60} /></ButtonLogIn>:<ButtonLogIn onClick={ClickLogIn} >Entrar</ButtonLogIn> }
                    <NavLink to="/cadastro">Não tem uma conta? Cadastre-se!</NavLink>
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
const TextLogo = styled.div`
    font-family: 'Playball', cursive;
    font-size: 38.982px;
    line-height: 49px;
    color: #126ba5;
    width: 100%;
    display: flex;
    padding-left: 30px;
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
    display: flex;
    justify-content: center;
    align-items: center;
`;
const NavLink = styled(Link)`
    font-size: 13.976px;
    line-height: 17px;
    text-decoration-line: underline;
    color: #52B6FF;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
`;
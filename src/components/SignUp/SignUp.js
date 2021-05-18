import styled from 'styled-components';
import { useState} from 'react';
import axios from 'axios';
import Loader from "react-loader-spinner";
import { Link } from 'react-router-dom';

export default function SignUp(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);

    function newUser(){
        if(name!== "" && email !== "" && password !== "" && image!== ""){
            const body = {
                email,
                name,
                image,
                password
            }

            const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", body);
            setLoading(true);
            request.then(response => {
                console.log(response);
                setEmail("");
                setPassword("");
                setName("");
                setImage("");
                setLoading(false);
            });
            request.catch(response => {
                console.log(response);
                setEmail("");
                setPassword("");
                setName("");
                setImage("");
                setLoading(false);
            });
        }
    }
   
    return(
        <>
            <Header>
                <Logo>
                    <ImageLogo src="https://thumbs.dreamstime.com/b/growing-graph-d-histogram-green-arrow-32612397.jpg"/>
                    <ImageLogo src="https://images.ctfassets.net/zsv3d0ugroxu/4p1Y4eUTpHQW5OwNt22qGy/9da0eb52fa76dbf7666c67dafaaac5b7/Logo_TrackIt"/>
                </Logo>
            </Header>
            <UserActs>
                    <InputLogIn disabled={loading} onChange={e=>setEmail(e.target.value)} value={email} placeholder="email" />
                    <InputLogIn disabled={loading} onChange={e=>setPassword(e.target.value)} value={password} placeholder="senha" type="password"/>
                    <InputLogIn disabled={loading} onChange={e=>setName(e.target.value)} value={name} placeholder="nome" />
                    <InputLogIn disabled={loading} onChange={e=>setImage(e.target.value)} value={image} placeholder="foto"/>
                    {loading?<ButtonLogIn><Loader type="ThreeDots" color="#FFFFFF" height={60} width={60} /></ButtonLogIn>:<ButtonLogIn onClick={newUser}>Cadastrar</ButtonLogIn> }
                    <NavLink to="/">Já tem uma conta? Faça login!</NavLink>
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
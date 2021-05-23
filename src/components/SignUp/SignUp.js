import styled from 'styled-components';
import { useState} from 'react';
import axios from 'axios';
import Loader from "react-loader-spinner";
import { Link, useHistory } from 'react-router-dom';

export default function SignUp(){
    let history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);

    function newUser(event){
        event.preventDefault();
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
                setEmail("");
                setPassword("");
                setName("");
                setImage("");
                setLoading(false);
                history.push("/home");
            });
            request.catch(response => {
                console.log(response);
                setEmail("");
                setPassword("");
                setName("");
                setImage("");
                setLoading(false);
                alert("Ocorreu algum erro no cadastro.")
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
            <UserActs onSubmit={newUser}>
                    <InputLogIn disabled={loading} onChange={e=>setEmail(e.target.value)} value={email} placeholder="email" type="email" required/>
                    <InputLogIn disabled={loading} onChange={e=>setPassword(e.target.value)} value={password} placeholder="senha" type="password" required/>
                    <InputLogIn disabled={loading} onChange={e=>setName(e.target.value)} value={name} placeholder="nome" type="text" required/>
                    <InputLogIn disabled={loading} onChange={e=>setImage(e.target.value)} value={image} placeholder="foto" type="url" required/>
                    {
                        loading?
                            <ButtonLogIn><Loader type="ThreeDots" color="#FFFFFF" height={60} width={60} /></ButtonLogIn>
                        :
                            <ButtonLogIn type="submit">Cadastrar</ButtonLogIn> 
                    }
                    <NavLink to="/home">Já tem uma conta? Faça login!</NavLink>
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
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 180px;
`;
const ImageLogo = styled.img`
    width: 160px;
`;
const TextLogo = styled.div`
    font-family: 'Playball';
    font-size: 68.982px;
    line-height: 86px;
    color: #126ba5;
    width: 100%;
    display: flex;
    justify-content: center;
`;
const UserActs = styled.form`
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
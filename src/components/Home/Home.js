import styled from "styled-components";
import React, {useContext} from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";
import UserContext from "../../contexts/UserContext";
import logo from "../../assets/trackit-image.jpg";

export default function Home(){
	const {setUser} = useContext(UserContext);
	let history = useHistory();

	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [loading, setLoading] = React.useState(false);

	function ClickLogIn(event){
		event.preventDefault();  
		if(email.length>0 && password.length>0){
			setLoading(true);
			const body = {
				email,
				password 
			};

			// eslint-disable-next-line no-undef
			const request = axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, body);

			request.then(response => {
				setLoading(false);
				setUser({
					email: response.data.email,
					id: response.data.id,
					image: response.data.image,
					name: response.data.name,
					password: response.data.password,
					token: response.data.token,

				});
				localStorage.setItem("userStorage", JSON.stringify({
					email: response.data.email,
					id: response.data.id,
					image: response.data.image,
					name: response.data.name,
					password: response.data.password,
					token: response.data.token,

				}));
				history.push("/hoje");
			});
			request.catch(response => {
				setLoading(false);
				setEmail("");
				setPassword("");
				console.log(response);
				alert("E-mail ou senha incorretos.");
			});   
		}
	}

	return(
		<>
			<Header>
				<Logo>
					<ImageLogo src={logo}/>
					<TextLogo>TrackIt</TextLogo>
				</Logo>
			</Header>
			<UserActs onSubmit={ClickLogIn}>
				<InputLogIn disabled={loading} onChange={e => setEmail(e.target.value)} value={email} placeholder="email" type="email" required/>
				<InputLogIn disabled={loading} onChange={e =>setPassword(e.target.value)} value={password} placeholder="senha" type="password" required/>
				{loading?
					<ButtonLogIn><Loader type="ThreeDots" color="#FFFFFF" height={60} width={60} /></ButtonLogIn>
					:
					<ButtonLogIn type="submit" >Entrar</ButtonLogIn> 
				}
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
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const ImageLogo = styled.img`
    width: 160px;
`;
const TextLogo = styled.div`
    font-family: 'Playball', cursive;
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
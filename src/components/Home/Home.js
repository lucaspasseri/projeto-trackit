import React, {useContext} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";
import UserContext from "../../contexts/UserContext";
import logo from "../../assets/trackit-image.jpg";
import { UserActs, InputLogIn, ButtonLogIn, NavLink, ContainerAuth,
	HeaderAuth, Logo, ImageLogo, TextLogo } from "../Styles/Components";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

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
			request.catch(() => {
				setLoading(false);
				setEmail("");
				setPassword("");
				toast("E-mail ou senha incorretos.");
			});   
		}
	}

	return(
		<ContainerAuth>
			<HeaderAuth>
				<Logo>
					<ImageLogo src={logo}/>
					<TextLogo>TrackIt</TextLogo>
				</Logo>
			</HeaderAuth>
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
			<ToastContainer />
		</ContainerAuth>
	);
}
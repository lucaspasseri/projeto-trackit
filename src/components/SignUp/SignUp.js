import React, {useState} from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router-dom";
import logo from "../../assets/trackit-image.jpg";
import { UserActs, InputLogIn, ButtonLogIn, NavLink, ContainerAuth,
	HeaderAuth, Logo, ImageLogo, TextLogo } from "../Styles/Components";

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
			};

			// eslint-disable-next-line no-undef
			const request = axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/sign-up`, body);
			setLoading(true);
			request.then(()=> {
				setEmail("");
				setPassword("");
				setName("");
				setImage("");
				setLoading(false);
				history.push("/");
			});
			request.catch(() => {
				setEmail("");
				setPassword("");
				setName("");
				setImage("");
				setLoading(false);
				alert("Ocorreu algum erro no cadastro.");
			});
		}
	}
   
	return(
		<ContainerAuth>
			<HeaderAuth>
				<Logo>
					<ImageLogo src={logo} alt="tracktit logo"/>
					<TextLogo>TrackIt</TextLogo>
				</Logo>
			</HeaderAuth>
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
				<NavLink to="/">Já tem uma conta? Faça login!</NavLink>
			</UserActs>
		</ContainerAuth>    
	);
}
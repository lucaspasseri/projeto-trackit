import React, {useContext} from "react";
import { Header, Title, ImageProfile } from "../Styles/Components";
import { LogOutOutline } from "react-ionicons";
import { useHistory } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

export default function TopBar() {
	const history = useHistory();

	const {user, setUser} = useContext(UserContext);

	const userStorage = JSON.parse(localStorage.getItem("userStorage"));

	let activeUser;

	if(!user){
		if(!userStorage){
			history.push("/");
			return null;
		} else {
			setUser(userStorage);
			activeUser = userStorage;
		}
		
	} else {
		activeUser = user;
	}

	function logOut(){
		localStorage.clear();
		history.push("/");
	}

	return(
		<Header>
			<Title>TrackIt</Title>
			<ImageProfile src={activeUser.image}/>
			<LogOutOutline
				color="white"
				height="40px"
				width="40px"
				onClick={logOut}
			/>
		</Header>
	);
}
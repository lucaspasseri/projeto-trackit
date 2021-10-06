import React, {useContext} from "react";
import { Header, Title, ImageProfile } from "../Styles/Components";
import { LogOutOutline } from "react-ionicons";
import { useHistory } from "react-router-dom";

import UserContext from "../../contexts/UserContext";

export default function TopBar() {
	let history = useHistory();

	const { user } = useContext(UserContext);

	function logOut(){
		localStorage.clear();
		history.push("/");
	}

	return(
		<Header>
			<Title>TrackIt</Title>
			<div className="user-xp">
				<div>
					<ImageProfile src={user ? user.image : ""}/>
				</div>
				<div>
					<LogOutOutline
						color="white"
						height="40px"
						width="40px"
						onClick={logOut}
					/>
				</div>
			</div>
		</Header>
	);
}
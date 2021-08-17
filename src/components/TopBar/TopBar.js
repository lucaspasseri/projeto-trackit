import React from "react";
import { Header, Title, ImageProfile } from "../Styles/Components";
import PropTypes from "prop-types";
import { LogOutOutline } from "react-ionicons";
import { useHistory } from "react-router-dom";

TopBar.propTypes = {
	user: PropTypes.object
};


export default function TopBar(props) {
	const {user} = props;
	const history = useHistory();

	function logOut(){
		localStorage.clear();
		history.push("/");
	}

	return(
		<Header>
			<Title>TrackIt</Title>
			<ImageProfile src={user.image}/>
			<LogOutOutline
				color="white"
				height="40px"
				width="40px"
				onClick={logOut}
			/>
		</Header>
	);
}
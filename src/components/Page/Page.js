import {useHistory} from "react-router-dom";

export default function Page({setUser}){
    
    
	let history = useHistory();
	let userStorage;
	if(localStorage.length>0){
		userStorage = JSON.parse(localStorage.getItem("userStorage"));
		setUser(userStorage);
		history.push("/hoje");  
	}else {
		history.push("/home");
	}

	return(null);
}
import { BrowserRouter, Switch, Route} from "react-router-dom";
import React, {useState} from "react";
import styled from "styled-components";

//import Page from  "../Page/Page";
import Home from "../Home/Home";
import SignUp from "../SignUp/SignUp";
import Habit from "../Habit/Habit";
import Today from "../Today/Today";
import Historic from "../Historic/Historic";

import UserContext from "../../contexts/UserContext";
import GlobalStyle from "../Styles/GlobalStyle";

export default function App(){
	const [user, setUser] = useState(null);
	const [progress, setProgress] = useState(0);
    
	return(
		<UserContext.Provider value={{user, setUser, progress, setProgress}}>
			<GlobalStyle/>
			<BrowserRouter>
				<Switch>
					<Container>
						<Route path="/" exact component={Home} />
						<Route path="/cadastro" exact component={SignUp} />
						<Route path="/habitos" exact component={Habit} />
						<Route path="/hoje" exact component={Today} />
						<Route path="/historico" exact component={Historic}/>
					</Container>
				</Switch>   
			</BrowserRouter>
		</UserContext.Provider>
	);
}
const Container = styled.div`
    width: 100vw;
	@media screen and (max-width: 320px) {
		width: 320px;
	}	
`;
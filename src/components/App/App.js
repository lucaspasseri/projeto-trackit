import { BrowserRouter, Switch, Route} from "react-router-dom";
import React, {useState} from "react";
import styled from "styled-components";

import Page from  "../Page/Page";
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
		<UserContext.Provider value={{user,progress}}>
			<GlobalStyle/>
			<BrowserRouter>
				<Switch>
					<Container>
						<Route path="/" exact>
							<Page user={user} setUser={setUser}/>
						</Route>
						<Route path="/home" exact>
							<Home setUser={setUser}/>
						</Route>
						<Route path="/cadastro" exact component={SignUp}/>
						<Route path="/habitos" exact>
							<Habit setProgress={setProgress}/>
						</Route>
						<Route path="/hoje" exact >
							<Today setProgress={setProgress}/>
						</Route>
						<Route path="/historico" exact component={Historic}/>
					</Container>
				</Switch>   
			</BrowserRouter>
		</UserContext.Provider>
	);
}
const Container = styled.div`
    width: 375px;
`;
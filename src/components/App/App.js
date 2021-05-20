import { BrowserRouter, Switch, Route} from 'react-router-dom';
import styled from 'styled-components';
import React from 'react';

import Home from '../Home/Home';
import SignUp from '../SignUp/SignUp';
import Habit from '../Habit/Habit';
import Today from '../Today/Today';
import UserContext from '../../contexts/UserContext';

export default function App(){
    const [user, setUser] = React.useState(null);
    if(user!== null){
        console.log(user);
    }
   
    return(
        <UserContext.Provider value={user}>
            <BrowserRouter>
                <Page>
                    <Switch>
                        <Route path="/" exact>
                            <Home setUser={setUser}/>
                        </Route>
                        <Route path="/cadastro" exact component={SignUp}/>
                        <Route path="/habitos" exact component={Habit}/>
                        <Route path="/hoje" exact component={Today}/>
                        <Route path="/historico" exact component={Habit}/>
                    </Switch>
                </Page>    
            </BrowserRouter>
        </UserContext.Provider>
    );
}
const Page = styled.div`
    width: 375px;
`;
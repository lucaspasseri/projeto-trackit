import { BrowserRouter, Switch, Route} from 'react-router-dom';
import styled from 'styled-components';
import {useState} from 'react';

import Home from '../Home/Home';
import SignUp from '../SignUp/SignUp';
import Habit from '../Habit/Habit';
import Today from '../Today/Today';
import Historic from '../Historic/Historic';
import UserContext from '../../contexts/UserContext';

export default function App(){
    const [user, setUser] = useState(null);
    const [progress, setProgress] = useState(null);
   
    return(
        <UserContext.Provider value={{user,progress}}>
            <BrowserRouter>
                <Page>
                    <Switch>
                        <Route path="/" exact>
                            <Home setUser={setUser}/>
                        </Route>
                        <Route path="/cadastro" exact component={SignUp}/>
                        <Route path="/habitos" exact component={Habit}/>
                        <Route path="/hoje" exact >
                            <Today setProgress={setProgress}/>
                        </Route>
                        <Route path="/historico" exact component={Historic}/>
                    </Switch>
                </Page>    
            </BrowserRouter>
        </UserContext.Provider>
    );
}
const Page = styled.div`
    width: 375px;
`;
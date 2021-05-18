import { BrowserRouter, Switch, Route} from 'react-router-dom';
import styled from 'styled-components';

import Home from '../Home/Home';
import SignUp from '../SignUp/SignUp';
import Habit from '../Habit/Habit';
import Today from '../Today/Today';

export default function App(){
    return(
        <BrowserRouter>
            <Page >
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/cadastro" exact component={SignUp}/>
                    <Route path="/habitos" exact component={Habit}/>
                    <Route path="/hoje" exact component={Today}/>
                    <Route path="/historico" exact component={Habit}/>
                </Switch>
            </Page>    
        </BrowserRouter>
    );
}
const Page = styled.div`
    width: 375px;
`;
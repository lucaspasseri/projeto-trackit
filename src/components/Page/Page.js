import {useHistory} from 'react-router-dom';

export default function Page({user, setUser}){
    
    
    let history = useHistory();
    let userStorage;
    if(localStorage.length>0){
        userStorage = JSON.parse(localStorage.getItem("userStorage"));
        setUser(userStorage);
        history.push("/hoje"); 
        console.log(userStorage, user);  
    }else {
        history.push("/home");
    }

    return(null);
}
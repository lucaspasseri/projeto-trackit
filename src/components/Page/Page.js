import {useState} from 'react';
import {useHistory} from 'react-router-dom';

export default function Page({user, setUser}){
    
    const [savedUser, setSavedUser] = useState(localStorage.length>0);
    let history = useHistory();
    let userStorage;
    if(savedUser){
        userStorage = JSON.parse(localStorage.getItem("userStorage"));
        setUser(userStorage);
        history.push("/hoje"); 
        console.log(userStorage, user);  
    }else {
        history.push("/home");
    }

    return(null);
}
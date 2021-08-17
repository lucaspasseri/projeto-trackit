import styled from "styled-components";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";

import UserContext from "../../contexts/UserContext";

import Footer from "../Footer/Footer";
import TopBar from "../TopBar/TopBar";

export default function Historic(){

	const { user} = useContext(UserContext);
	const [ historic, setHistoric ] = useState();

	console.log(user);

	const config = {
		headers: {
			"Authorization": "Bearer "+user.token
		}
	};

	useEffect(() => {

		// eslint-disable-next-line no-undef
		const request = axios.get(`${process.env.REACT_APP_API_BASE_URL}/habits/history/daily`, config);

		request.then(response => {
			console.log(response.data);
			setHistoric(response.data);
		});
		request.catch(response=>console.log(response));
	}, []);

	const days = historic?.map(item =>item.day);
	const habits = historic?.map(item => item.habits);

	return(
		<>
			<TopBar user={user}/>
			<Body>
				<Top>
					<div>Histórico</div>
				</Top>
				<StyleHistoric>
					{!historic?
						"Em breve você poderá ver o histórico dos seus hábitos aqui!"
						:
						days?.map((item, i)=> <div key={i}>{item}</div>)
					}
					<div>
						{
							habits?.map((item,i)=> <div key={i}>{item[i].name}</div>)
						}
					</div>
				</StyleHistoric>
			</Body>
			<Footer/>
		</>
	);
}
const StyleHistoric = styled.div`

`;

const Top = styled.div`
    height: 85px;
    display: flex;
    justify-content:space-between;
    align-items: center;

    div {
        font-family: 'Lexend Deca', sans-serif;
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
    }
`;

const Body = styled.div`
    margin-top: 70px;
    margin-bottom: 70px;
    border-bottom: 1px solid #f2f2f2;
    background-color:#f2f2f2;
    padding: 0 18px;
    min-height: 520px;
    
    > div {
        font-family: 'Lexend Deca', sans-serif;
        font-size: 17.976px;
        line-height: 22px;
        color: #666666;
    }
`;
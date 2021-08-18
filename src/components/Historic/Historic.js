import styled from "styled-components";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import UserContext from "../../contexts/UserContext";

import Footer from "../Footer/Footer";
import TopBar from "../TopBar/TopBar";

export default function Historic(){
	const history = useHistory();

	const { user, setUser} = useContext(UserContext);
	const [ historic, setHistoric ] = useState();

	const userStorage = JSON.parse(localStorage.getItem("userStorage"));
	
	const weekDays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];  

	let config;

	if(!user){
		if(!userStorage){
			history.push("/");
			return null;
		} else {
			setUser(localStorage);
			config = {
				headers: {
					"Authorization": `Bearer ${localStorage.token}`
				}
			};
		}
	} else {
		config = {
			headers: {
				"Authorization": `Bearer ${user.token}`
			}
		};
	}


	useEffect(() => {

		// eslint-disable-next-line no-undef
		const request = axios.get(`${process.env.REACT_APP_API_BASE_URL}/habits/history/daily`, config);

		request.then(response => {
			console.log(response.data);
			setHistoric(response.data);
		});
		request.catch(response=>console.log(response));
	}, []);

	//const days = historic?.map(item =>item.day);
	//const habits = historic?.map(item => item.habits);

	const historico = historic?.map((item, i) => {
		return (
			<div key={i}>
				<div>{item.day+" - "+weekDays[item.habits[0].weekDay]}</div>
				<div className="day">
					{
						item.habits.map((habit, n) => {
							return (
								<div key={n} className="habit">
									<div className="habit-name">
										{habit.name}
									</div>
									<div>
										{habit.done?
											<span role="img" aria-label="correct">✅</span>
											:
											<span role="img" aria-label="wrong">❌</span>
										}
									</div>
								</div>
							);
						})
					}
				</div>
			</div>
		);
	});

	console.log(historico);

	return(
		<>
			<TopBar user={user}/>
			<Body>
				<Top>
					<div>Histórico</div>
				</Top>
				<StyleHistoric>
					{
						historico
					}
				</StyleHistoric>
			</Body>
			<Footer/>
		</>
	);
}
const StyleHistoric = styled.div`
	
	.day {
		margin: 10px 0 20px 0;
	}

	.habit {
		display: flex;
		justify-content: space-between;
		margin-bottom: 3px;
	}
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
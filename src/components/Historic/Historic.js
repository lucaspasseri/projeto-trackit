import styled from "styled-components";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import UserContext from "../../contexts/UserContext";

import Footer from "../Footer/Footer";
import TopBar from "../TopBar/TopBar";
import { Top, Body, Container } from "../Styles/Components";

export default function Historic(){
	const history = useHistory();

	const { user, setUser} = useContext(UserContext);
	const [ historic, setHistoric ] = useState();

	const userStorage = JSON.parse(localStorage.getItem("userStorage"));
	
	const weekDays = [
		"Domingo",
		"Segunda-feira",
		"Terça-feira",
		"Quarta-feira", 
		"Quinta-feira", 
		"Sexta-feira", 
		"Sábado"
	];  

	let config;

	if(!user){
		if(!userStorage){
			history.push("/");
			return null;
		} else {
			setUser(localStorage);
			config = {
				headers: {
					"Authorization": `Bearer ${userStorage.token}`
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
			setHistoric(response.data);
		});
		request.catch(response=>console.log(response));
	}, []);

	const historico = historic?.map((item, i) => {
		return (
			<div key={i}>
				<div className="day-name">{weekDays[item.habits[0].weekDay]+", "+item.day}</div>
				<div className="day-items">
					{
						item.habits.map((habit, n) => {
							return (
								<div key={n} className="habit">
									<div className="habit-name">
										{habit.name}
									</div>
									<div className="habit-status">
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

	return(
		<Container>
			<TopBar user={user}/>
			<Body>
				<Top>
					<div>Histórico</div>
				</Top>
				<StyleHistoric>
					{
						historico===undefined?
							"Carregando..."
							:
							historico
					}
				</StyleHistoric>
			</Body>
			<Footer/>
		</Container>
	);
}



const StyleHistoric = styled.div`

	.day-name {
		color: #126BA5;
	}
	
	.day-items {
		margin: 10px 0 20px 0;
	}

	.habit {
		display: flex;
		justify-content: space-between;
		margin-bottom: 5px;
		background: #FFF;
		padding: 5px 8px 5px 10px;
	}
	.habit-name {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
		word-break: break-all;
	}
	.habit-status {
		width: 30px;
		display: flex;
		justify-content: flex-end;
	}
`;
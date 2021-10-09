import React, { useState, useEffect, useContext} from "react";
import axios from "axios";
import { CheckmarkOutline } from "react-ionicons";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import UserContext from "../../contexts/UserContext";
import { useHistory } from "react-router-dom";

import CalculateProgress from "../Utils/CalculateProgress";
import Footer from "../Footer/Footer";
import TopBar from "../TopBar/TopBar";
import { Body, Container } from "../Styles/Components";
import { TopToday, Subtitle, HabitsList,
	CardToday, LeftSide, HabitName, CurrentSequence, 
	HighestSequence, RightSide} from "./Styles";

export default function Today(){
	const history = useHistory();

	const { user, setUser, setProgress } = useContext(UserContext);
    
	const weekDay = dayjs().locale("pt-br").format("dddd");
	const dayAndMonth = dayjs().locale("pt-br").format("D MMM");

	const [todayHabits, setTodayHabits] = useState();

	const userStorage = JSON.parse(localStorage.getItem("userStorage"));

	useEffect(() => {

		let config;
		if(user){
			config = {
				headers: {
					"Authorization": `Bearer ${user.token}`
				}
			};
		} else {
			setUser(userStorage);
			config = {
				headers: {
					"Authorization": `Bearer ${userStorage.token}`
				}
			};
		}

		// eslint-disable-next-line no-undef
		const request = axios.get(`${process.env.REACT_APP_API_BASE_URL}/habits/today`, config);

		request.then(response => {
			setTodayHabits(response.data);
			setProgress(CalculateProgress(response.data));  
		});
		request.catch(() => {
			history.push("/");
		});
	}, []);
    
	function habitDone(item){

		const config = {
			headers: {
				"Authorization": `Bearer ${user.token}`
			}
		};

		if(!item.done){
						
			const request = 
			// eslint-disable-next-line no-undef
				axios.post(`${process.env.REACT_APP_API_BASE_URL}/habits/${item.id}/check`,{},config);
			request.then(()=>{

				const requestGet = 
				// eslint-disable-next-line no-undef
					axios.get(`${process.env.REACT_APP_API_BASE_URL}/habits/today`, config);
				requestGet.then(response=>{
					const aux = response.data;
					setTodayHabits(aux);
					setProgress(CalculateProgress(response.data));
				});
			});
		} else {

			const request = 
				// eslint-disable-next-line no-undef
				axios.post(`${process.env.REACT_APP_API_BASE_URL}/habits/${item.id}/uncheck`,{}, config);
			request.then(()=>{

				const requestGet = 
					// eslint-disable-next-line no-undef
					axios.get(`${process.env.REACT_APP_API_BASE_URL}/habits/today`, config);

				requestGet.then(response=>{
					setTodayHabits(response.data);
					setProgress(CalculateProgress(response.data));
				});
			});
		}
	}
	function undefinedHabits(){
		if(todayHabits === undefined){
			return false;
		}else if((todayHabits.filter(item=>item.done).length/todayHabits.length)*100>0){
			return true;
		}
		return false;
	}

	return(  
		<Container>
			<TopBar />
			<Body>
				<TopToday>
					<div>{`${weekDay}, ${dayAndMonth}`}</div>
					<Subtitle status={undefinedHabits()}>
						{todayHabits === undefined?
							"Carregando..."
							:
							((todayHabits.filter(item=>item.done).length/todayHabits.length)*100>0?
								`${((todayHabits.filter(item=>item.done).length/todayHabits.length)).toFixed(2)*100}%
								dos hábitos para hoje concluidos`
								:
								todayHabits.filter(item=>item.done).length/todayHabits.length === 0?
									"0% dos hábitos para hoje concluidos"
									:
									"Nenhum hábito cadastrado para hoje"
							)
						}
					</Subtitle>
				</TopToday>
				<HabitsList>
					{todayHabits === undefined?
						<div>Carregando...</div>
						:
						(todayHabits.length>0?
							todayHabits.map(item=>
								<CardToday key={item.id}>
									<LeftSide>
										<HabitName>{item.name}</HabitName>
										<div><CurrentSequence status={item.currentSequence}>Sequência atual: <span>{item.currentSequence} dias</span></CurrentSequence></div>
										<div><HighestSequence status={item.currentSequence} highstatus={item.highestSequence}>Seu recorde: <span>{item.highestSequence} dias</span></HighestSequence></div>
									</LeftSide>
									<RightSide onClick={()=>habitDone(item)} done={item.done}>
										<CheckmarkOutline color='#ffffff' height="80px"  width="80px"/>
									</RightSide>
								</CardToday>
							)
							:
							<div></div>
						)
					}
				</HabitsList>
			</Body>
			<Footer/>
		</Container>
	);
}
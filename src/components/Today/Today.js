import React, { useState, useEffect, useContext} from "react";
import axios from "axios";
import styled from "styled-components";
import { CheckmarkOutline } from "react-ionicons";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import UserContext from "../../contexts/UserContext";
import { useHistory } from "react-router-dom";

import CalculateProgress from "../Utils/CalculateProgress";
import Footer from "../Footer/Footer";
import TopBar from "../TopBar/TopBar";
import { Body, Container } from "../Styles/Components";

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

const HabitName = styled.div`
    font-size: 19.976px;
    line-height: 25px;
    margin-bottom: 7px;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
	word-break: break-all;
`;

const Subtitle = styled.div`
    font-size: 17.976px;
    line-height: 22px;
    color: ${props=>props.status?"#8fc549":"#BABABA"};  
`;
const HighestSequence = styled.div`
    color: "#666666";
    font-family: 'Lexend Deca', sans-serif;
    font-size: 12.976px;
    line-height: 16px;

    span {
        color:${props=>props.highstatus>0 && props.highstatus>=props.status?"#8fc549":"#666666"};
    }

`;

const CurrentSequence = styled.div`
    color:"#666666";
    font-family: 'Lexend Deca', sans-serif;
    font-size: 12.976px;
    line-height: 16px;

    span {
        color:${props=>props.status>0?"#8fc549":"#666666"};
    }
`;

const LeftSide = styled.div`
    width: 70%;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 12.976px;
    line-height: 16px;
    color: #666666;
    display: flex;
    flex-direction:column;
`;
const RightSide = styled.div`
    width: 69px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${props=>props.done?"#8fc549":"#EBEBEB"};
    border: 1px solid #E7E7E7;
    box-sizing: border-box;
    border-radius: 5px;
`;

const HabitsList = styled.div`
    padding-top: 28px;
`;

const TopToday = styled.div`
    height: 85px;
    display: flex;
    flex-direction: column;
    padding-top: 28px;
    font-family: 'Lexend Deca', sans-serif;

    div:first-of-type {
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
    }
`;
export const CardToday = styled.div`
    height: 94px;
    background-color:#FFF;
    margin-bottom: 10px;
    border-radius: 5px;
    padding: 13px;
    display: flex;
    justify-content: space-between;
`; 
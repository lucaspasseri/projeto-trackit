import styled from "styled-components";
import React, {useContext, useState, useEffect} from "react";
import { TrashOutline } from "react-ionicons";
import axios from  "axios";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router-dom";

import TopBar from "../TopBar/TopBar";
import WeekDay from "../WeekDay/WeekDay";
import Footer from "../Footer/Footer";

import UserContext from "../../contexts/UserContext";

export default function Habit(){
	const history = useHistory();

	const [habitsList, setHabitsList] = useState();

	const {user, setUser, setProgress} = useContext(UserContext);
	const userStorage = JSON.parse(localStorage.getItem("userStorage"));

	let config;

	if(!user) {
		if(!userStorage){
			history.push("/");
			return null;
		}else{
			setUser(userStorage);
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
		const request = axios.get(`${process.env.REACT_APP_API_BASE_URL}/habits`, config);

		request.then(response => {
			setHabitsList(response.data);
		});
		request.catch(response=>console.log(response));

	}, []);
    
	const [loading, setLoading] = useState(false);
	const [createNewHabit, setCreateNewHabit] =  useState(false);
	const [nameNewHabit, setNameNewHabit] = useState("");
	const [selectedDays, setSelectedDays] = useState([false,false,false,false,false,false,false]);

	const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];   

	function newHabit(){
		if(createNewHabit===true){
			setCreateNewHabit(false);
		}
		else {
			setCreateNewHabit(true);
		}
	}

	function saveHabit(event){
		event.preventDefault();
		if(nameNewHabit.length > 0 && selectedDays.filter(i => i === true).length > 0){
			setLoading(true);
        
			const days = [];
			selectedDays.forEach((item, i) => {
				if(item === true){
					days.push(i);
				}
			});
			const body = {
				name: nameNewHabit,
				days: days
			};

			const request =
				// eslint-disable-next-line no-undef 
				axios.post(`${process.env.REACT_APP_API_BASE_URL}/habits`, body, config);
			request.then(()=>{

				setSelectedDays([false,false,false,false,false,false,false]);
				setNameNewHabit("");
				newHabit();
				
				const request = 
					// eslint-disable-next-line no-undef
					axios.get(`${process.env.REACT_APP_API_BASE_URL}/habits`, config);

				request.then(response=>{
					setHabitsList(response.data);
					setLoading(false);
				});
				request.catch(response=>{
					console.log(response);
					setLoading(false);
				});

				const req = 
					// eslint-disable-next-line no-undef
					axios.get(`${process.env.REACT_APP_API_BASE_URL}/habits/today`, config);

				req.then(response=>{
					const aux = response.data;
					setProgress((aux.filter(item=>item.done).length/aux.length)*100); 
					setLoading(false);
				});
				req.catch(response=>{
					console.log(response);
					setLoading(false);
				});
			});
			request.catch(error=>{
				alert(error);
				setLoading(false);
			});
		}else if(nameNewHabit.length === 0){
			alert("Insira um nome para o seu hábito.");
		}else if(selectedDays.filter(i => i === true).length === 0){
			alert("Escolha pelo menos um dia da semana.");
		}
	}
	function deleteHabit(id){
		if(window.confirm("Você tem certeza?")){
			setLoading(true);

			const request = axios.delete(
				// eslint-disable-next-line no-undef
				`${process.env.REACT_APP_API_BASE_URL}/habits/${id}`, config
			);
			
			request.then(()=>{
				const request = 
					// eslint-disable-next-line no-undef
					axios.get(`${process.env.REACT_APP_API_BASE_URL}/habits`, config);

				request.then(response => {
					setHabitsList(response.data);
					setLoading(false);
				});
				request.catch(response=>{
					console.log(response);
					setLoading(false);
				});

				const req = 
					// eslint-disable-next-line no-undef
					axios.get(`${process.env.REACT_APP_API_BASE_URL}/habits/today`, config);
				req.then(response=>{
					const aux = response.data;
					setProgress((aux.filter(item=>item.done).length/aux.length)*100); 
					setLoading(false);
				});
				req.catch(response=>{
					console.log(response);
					setLoading(false);
				});

			});
			request.catch(response=>{
				console.log(response);
				setLoading(false);
			});
		}
	}
    
	return(
		<>
			<TopBar/>
			<Body>
				<Top>
					<div>Meus hábitos</div>
					<ButtonPlus onClick={newHabit}>+</ButtonPlus>
				</Top>
				{
					<NewHabit active={createNewHabit} onSubmit={saveHabit}>
						<InputNameHabit disabled={loading} onChange={e=>setNameNewHabit(e.target.value)} value={nameNewHabit} placeholder="nome do hábito" type="text" required></InputNameHabit>
						<WeekDaysContainer>
							{(!createNewHabit && selectedDays.filter(i=>i===true).length===0)?
								null
								:
								weekDays.map((item, i)=><WeekDay disabled={loading} key={i} id={i} name={item} selectedDays={selectedDays} ></WeekDay>)
							}
						</WeekDaysContainer>
						<Buttons>
							<CancelButton onClick={newHabit}>Cancelar</CancelButton>
							{loading?
								<SaveButton><Loader type="ThreeDots" color="#FFFFFF" height={60} width={60} /></SaveButton>
								:
								<SaveButton type="submit">Salvar</SaveButton>
							}
						</Buttons>
					</NewHabit>
				}
				{habitsList === undefined?
					<div>Carregando...</div>
					:
					(habitsList.length>0?
						habitsList.map((habit,i)=>
							<HabitCard key={i}>
								<NameContainer>
									<div>{habit.name}</div>
									<div onClick={()=>deleteHabit(habit.id)}>
										<TrashOutline width="18px"></TrashOutline>
									</div>
								</NameContainer>
								<DaysContainer>
									{weekDays.map((day,i)=> <Day key={i} status={habit.days.filter(item=>item===i).length>0}> {day}</Day>)}
								</DaysContainer>
							</HabitCard>)
						: 
						<div>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</div>
					)
				}
			</Body>
			<Footer/>
		</>
	);
}

const DaysContainer = styled.div`
    display: flex;
    align-items: center;
`;

const NameContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 50%;
    align-items: center;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 19.976px;
    line-height: 25px;
    color: #666666;

    div:last-of-type{
        margin-bottom: 18px;
        margin-right: -6px;
    }
`;

const Day = styled.div`
    width: 30px;
    height: 30px;
    background: ${props=>props.status?"#cfcfcf":"#FFFFFF"};
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 19.976px;
    line-height: 25px;
    color: ${props=>props.status?"#FFFFFF":"#cfcfcf"};
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 4px;
`;

const HabitCard = styled.div`
    width: 340px;
    height: 91px;
    background: #FFFFFF;
    border-radius: 5px;
    margin-bottom: 10px;
    padding: 14px;
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

const WeekDaysContainer = styled.div`
    width: 100%;
    margin-top: 10px;
    display: flex;


    div {
        margin-right: 5px;
        display: flex;
        justify-content: center;    
    }
`;

const Buttons = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
    margin-top:20px;
`;

const SaveButton = styled.button`
    width: 84px;
    height: 35px;
    background: #52B6FF;
    border-radius: 4.63636px;
    border: none;
    color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const CancelButton = styled.div`
    width: 84px;
    height: 35px;
    background: #FFFFFF;
    border-radius: 4.63636px;
    border: none;
    color: #52B6FF;
`;

const InputNameHabit = styled.input`
    width: 100%;
    height: 45px;
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 19.976px;
    line-height: 25px;

    ::placeholder {
        color: #DBDBDB;
        padding-left: 11px;
    }
   
`; 

const NewHabit = styled.form`
    height: 180px;
    width: 340px;
    background-color: #ffffff;
    display: ${props=>props.active?"flex":"none" };
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 16px;
    margin-bottom: 20px;   
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
const ButtonPlus = styled.button`
    width: 40px;
    height: 40px;
    background: #52B6FF;
    border-radius: 4.63636px;
    border: none;
    color: #FFFFFF;
    font-size: 26.976px;
    line-height: 34px;
`;


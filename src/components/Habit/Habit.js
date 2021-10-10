import React, {useContext, useState, useEffect} from "react";
import { TrashOutline } from "react-ionicons";
import axios from  "axios";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import TopBar from "../TopBar/TopBar";
import WeekDay from "../WeekDay/WeekDay";
import Footer from "../Footer/Footer";
import CalculateProgress from "../Utils/CalculateProgress";
import { Top, Body, Container } from "../Styles/Components";
import { PlusButton, NewHabit, InputNameHabit, WeekDaysContainer,
	Buttons, CancelButton, SaveButton, CardHabit, NameContainer, Day, 
	DaysContainer} from "./Styles";

import UserContext from "../../contexts/UserContext";

export default function Habit(){
	const history = useHistory();

	const [habitsList, setHabitsList] = useState();

	const {user, setUser, setProgress} = useContext(UserContext);
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
		const request = axios.get(`${process.env.REACT_APP_API_BASE_URL}/habits`, config);

		request.then(response => {
			setHabitsList(response.data);
			const req = 
					// eslint-disable-next-line no-undef
					axios.get(`${process.env.REACT_APP_API_BASE_URL}/habits/today`, config);

			req.then(response=>{
				setProgress(CalculateProgress(response.data));
			});	
		});
		request.catch(() => {
			history.push("/");
		});
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

			const config = {
				headers: {
					"Authorization": `Bearer ${user.token}`
				}
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
				request.catch(()=>{
					setLoading(false);
				});

				const req = 
					// eslint-disable-next-line no-undef
					axios.get(`${process.env.REACT_APP_API_BASE_URL}/habits/today`, config);

				req.then(response=>{
					setProgress(CalculateProgress(response.data));
					setLoading(false);
				});
				req.catch(()=>{
					setLoading(false);
				});
			});
			request.catch(error=>{
				toast(error);
				setLoading(false);
			});
		}else if(nameNewHabit.length === 0){
			toast("Insira um nome para o seu hábito.");
		}else if(selectedDays.filter(i => i === true).length === 0){
			toast("Escolha pelo menos um dia da semana.");
		}
	}

	function deleteHabit(id){
		if(window.confirm("Você tem certeza?")){
			setLoading(true);

			const config = {
				headers: {
					"Authorization": `Bearer ${user.token}`
				}
			};

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
				request.catch(()=>{
					setLoading(false);
				});

				const req = 
					// eslint-disable-next-line no-undef
					axios.get(`${process.env.REACT_APP_API_BASE_URL}/habits/today`, config);
				req.then(response=>{
					setProgress(CalculateProgress(response.data));
					setLoading(false);
				});
				req.catch(()=>{
					setLoading(false);
				});

			});
			request.catch(()=>{
				setLoading(false);
			});
		}
	}

	const newHabitComponent = 
		<NewHabit active={createNewHabit} onSubmit={saveHabit}>
			<InputNameHabit 
				disabled={loading} 
				onChange={e=>setNameNewHabit(e.target.value)} 
				value={nameNewHabit} 
				placeholder="nome do hábito" 
				type="text">	
			</InputNameHabit>
			<WeekDaysContainer>
				{
					(!createNewHabit && selectedDays.filter(i=>i===true).length===0)?
						null
						:
						weekDays.map((item, i)=><WeekDay disabled={loading} key={i} id={i} name={item} selectedDays={selectedDays} ></WeekDay>)
				}
			</WeekDaysContainer>
			<Buttons>
				<CancelButton onClick={newHabit}>Cancelar</CancelButton>
				{
					loading?
						<SaveButton><Loader type="ThreeDots" color="#FFFFFF" height={60} width={60} /></SaveButton>
						:
						<SaveButton type="submit">Salvar</SaveButton>
				}
			</Buttons>
		</NewHabit>
	;

	const habitsListComponent = habitsList === undefined?
		<div>Carregando...</div>
		:
		(habitsList.length>0?
			habitsList.map((habit,i)=>
				<CardHabit key={i}>
					<NameContainer>
						<div>{habit.name}</div>
						<div onClick={()=>deleteHabit(habit.id)}>
							<TrashOutline width="18px"></TrashOutline>
						</div>
					</NameContainer>
					<DaysContainer>
						{weekDays.map((day,i)=> <Day key={i} status={habit.days.filter(item=>item===i).length>0}> {day}</Day>)}
					</DaysContainer>
				</CardHabit>)
			: 
			<div>
				Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!
			</div>
		)
	;
    
	return(
		<Container>
			<TopBar />
			<Body>
				<Top>
					<div>Meus hábitos</div>
					<PlusButton onClick={newHabit}>+</PlusButton>
				</Top>
				{
					newHabitComponent
				}
				{
					habitsListComponent
				}
				<ToastContainer />
			</Body>
			<Footer/>
		</Container>
	);
}
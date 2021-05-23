import styled from 'styled-components';
import React, {useContext, useState, useEffect} from 'react';
import { TrashOutline } from 'react-ionicons'
import axios from  'axios';
import Loader from "react-loader-spinner";

import WeekDay from "../WeekDay/WeekDay";
import Footer from '../Footer/Footer';

import UserContext from '../../contexts/UserContext';

export default function Habit(){
    const [habitsList, setHabitsList] = useState();
    const {user, progress} = useContext(UserContext);
    const config = {
        headers: {
            "Authorization": "Bearer "+user.token
        }
    }
    
    
    useEffect(() => {
		const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);

		request.then(response => {
            const obj = response.data.map(item=>item);
            setHabitsList(obj);
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
    function saveHabit(){
        if(nameNewHabit.length >0 && selectedDays.filter(i => i===true).length > 0){
            setLoading(true);
        
            const days = [];
            selectedDays.forEach((item,i) => {
                if(item===true){
                    days.push(i);
                }
            });
            const body = {
                name: nameNewHabit,
                days: days
            };

            

            const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", body, config);
            request.then(response=>{
                setSelectedDays([false,false,false,false,false,false,false]);
                setNameNewHabit("");
                newHabit();
                const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);
                request.then(response=>{
                    
                    const obj = response.data.map(item=>item);
                    setHabitsList(obj);
                    setLoading(false);
                });
                request.catch(response=>{
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
        }else if(selectedDays.filter(i => i===true).length===0){
            alert("Escolha pelo menos um dia da semana.");
        }
    }
    function deleteHabit(id){
        if(window.confirm("Você tem certeza?")){
            setLoading(true);
            const request = axios.delete(
                "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/"+id, config
            );
            request.then(response=>{
                const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);

                request.then(response => {
                    const obj = response.data.map(item=>item);
                    setHabitsList(obj);
                    setLoading(false);
                });
                request.catch(response=>{
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
            <Header>
                <Title>TrackIt</Title>
                <ImageProfile src={user.image}/>
            </Header>
            <Body>
                <Top>
                    <div>Meus hábitos</div>
                    <ButtonPlus onClick={newHabit}>+</ButtonPlus>
                </Top>
                {
                    <NewHabit active={createNewHabit}>
                        <InputNameHabit disabled={loading} onChange={e=>setNameNewHabit(e.target.value)} value={nameNewHabit} placeholder="nome do hábito"></InputNameHabit>
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
                                <SaveButton onClick={saveHabit}>Salvar</SaveButton>
                            }
                        </Buttons>
                    </NewHabit>
                }
                {habitsList === undefined?
                    "Carregando..."
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
            <Footer progress={progress}></Footer>
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

    button {
        margin-right: 5px;
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
const CancelButton = styled.button`
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

const NewHabit = styled.div`
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

const Header = styled.div`
    height: 70px;
    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    position: fixed;
    width:375px;
    top: 0;
    left: 0;
    display: flex; 
    justify-content: space-between;
    align-items: center;
    padding: 0 18px;
`;
const Title = styled.div`
    font-family: 'Playball', cursive;
    font-size: 38.982px;
    line-height: 49px;
    color: #FFFFFF;
`;
const ImageProfile = styled.img`
    height: 51px;
    width: 51px;
    border-radius:100%;
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


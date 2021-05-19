import styled from 'styled-components';
import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';

import UserContext from '../../contexts/UserContext';

export default function Habit(){

    const user = useContext(UserContext);

    const [createNewHabit, setCreateNewHabit] =  useState(false);
    const [nameNewHabit, setNameNewHabit] = useState("");
    const [listHabits, setListHabits] = useState([]);

    const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

    if(user === null){
        return(
            <>
                <div>Relogar</div>
                <Link to="/"><button>Home</button></Link>
            </>
            
        );
    }

    function newHabit(){
        if(createNewHabit===true){
            setCreateNewHabit(false);
        }
        else {
            setCreateNewHabit(true);
        }
    }
    function saveHabit(){
        if(nameNewHabit.length !== ""){
            setListHabits([...listHabits, nameNewHabit]);
            setNameNewHabit("");
            newHabit();
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
                {createNewHabit? <NewHabit>
                    <InputNameHabit onChange={e=>setNameNewHabit(e.target.value)} value={nameNewHabit} placeholder="nome do hábito"></InputNameHabit>
                    <WeekDays>{weekDays.map((item, i)=> <ButtonWeekDay key={i}>{item}</ButtonWeekDay>)}</WeekDays>
                    <Buttons>
                        <CancelButton onClick={newHabit}>Cancelar</CancelButton>
                        <SaveButton onClick={saveHabit}>Salvar</SaveButton>
                    </Buttons>

                </NewHabit>: null}
                {listHabits.length>0? listHabits.map(habit=><HabitCard>{habit}</HabitCard>):
                    <div>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</div>}
            </Body>
            <Footer>
                <div>Hábitos</div>
                <div>Hoje</div>
                <div>Histórico</div>
            </Footer>
        </>
    );
}

const WeekDays = styled.div`
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
    
    *{
        margin-left: 20px;
    }
`;

const HabitCard = styled.div`
    width: 340px;
    height: 91px;
    background: #FFFFFF;
    border-radius: 5px;
    margin-bottom: 10px;    
`;

const SaveButton = styled.button`
    width: 84px;
    height: 35px;
    background: #52B6FF;
    border-radius: 4.63636px;
    border: none;
    color: #FFFFFF;
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

const ButtonWeekDay = styled.button`
    width: 30px;
    height: 30px;
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 19.976px;
    line-height: 25px;
    color: #DBDBDB;
`;

const NewHabit = styled.div`
    height: 180px;
    width: 340px;
    background-color: #ffffff;
    display: flex;
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
const Body = styled.div`
    margin-top: 70px;
    background-color:#f2f2f2;
    height: 100px;
    height: 520px;
    padding: 0 18px;
    
    div {
        font-family: 'Lexend Deca', sans-serif;
        font-size: 17.976px;
        line-height: 22px;
        color: #666666;
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

const Footer = styled.div`
    height: 70px;
    background: #FFFFFF;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 17.976px;
    line-height: 22px;
    color: #52B6FF;
`;
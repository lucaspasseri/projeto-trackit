import React, {useContext, useState, useEffect} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { CheckmarkOutline } from 'react-ionicons'
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import UserContext from '../../contexts/UserContext';

import Footer from '../Footer/Footer';

export default function Today({setProgress}){

    const todayDate = dayjs().locale("pt-br").format('dddd');
    const {user} = useContext(UserContext);
    const [todayHabits, setTodayHabits] = useState([]);
    const config = {
        headers: {
            "Authorization": "Bearer "+user.token
        }
    }
    
    useEffect(() => {
		const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);

		request.then(response => {
            setTodayHabits(response.data);
            
		});
        request.catch(response=>console.log(response));
	}, []);

    setProgress((todayHabits.filter(item=>item.done).length/todayHabits.length)*100);

    function habitDone(item){
        if(!item.done){
            const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${item.id}/check`,{},config);
            request.then(response=>{
                const requestGet = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);
                requestGet.then(response=>{
                    setTodayHabits(response.data);
                });
                requestGet.catch(response=>console.log(response));
            });
            request.catch(response=>console.log(response));
        }else {
            const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${item.id}/uncheck`,{}, config);
            request.then(response=>{
                const requestGet = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);
                requestGet.then(response=>{
                    setTodayHabits(response.data);
                });
                requestGet.catch(response=>console.log(response));
            });
            request.catch(response=>console.log(response));
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
                    <div>{todayDate}</div>
                    <Subtitle status={todayHabits.filter(item=>item.done).length/todayHabits.length>0}>
                        {
                            (todayHabits.filter(item=>item.done).length/todayHabits.length)*100>0?
                                `${(todayHabits.filter(item=>item.done).length/todayHabits.length)*100}% dos hábitos concluidos`
                            :
                                "Nenhum hábito concluido ainda"
                        }
                    </Subtitle>
                </Top>
                <HabitsList>
                    {todayHabits.length>0? todayHabits.map(item=>
                        <HabitCard key={item.id}>
                            <LeftSide>
                                <HabitName>{item.name}</HabitName>
                                <div><CurrentSequence status={item.currentSequence}>Sequência atual: <span>{item.currentSequence} dias</span></CurrentSequence></div>
                                <div><HighestSequence status={item.currentSequence} highstatus={item.highestSequence}>Seu recorde: <span>{item.highestSequence} dias</span></HighestSequence></div>
                            </LeftSide>
                            <RightSide onClick={()=>habitDone(item)} done={item.done}>
                                <CheckmarkOutline color='#ffffff' height="80px"  width="80px"/>
                            </RightSide>
                        </HabitCard>):<div></div>}
                </HabitsList>
            </Body>
            <Footer progress={(todayHabits.filter(item=>item.done).length/todayHabits.length)*100}></Footer>
        </>
    );
}

const HabitName = styled.div`
    font-size: 19.976px;
    line-height: 25px;
    margin-bottom: 7px;
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
    background: ${props=>props.done?'#8fc549':'#EBEBEB'};
    border: 1px solid #E7E7E7;
    box-sizing: border-box;
    border-radius: 5px;
`;
const HabitCard = styled.div`
    height: 94px;
    background-color:#FFF;
    margin-bottom: 10px;
    border-radius: 5px;
    padding: 13px;
    display: flex;
    justify-content: space-between;
`;

const HabitsList = styled.div`
    padding-top: 28px;
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
    flex-direction: column;
    padding-top: 28px;
    font-family: 'Lexend Deca', sans-serif;

    div:first-of-type {
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
    }
`;
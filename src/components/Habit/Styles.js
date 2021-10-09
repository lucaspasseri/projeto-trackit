import styled from "styled-components";

export const DaysContainer = styled.div`
	display: flex;
	align-items: center;
`;

export const NameContainer = styled.div`
	display: flex;
	justify-content: space-between;
	height: 62px;
	align-items: center;
	font-family: 'Lexend Deca', sans-serif;
	font-size: 19.976px;
	line-height: 25px;
	color: #666666;
	
	div:first-of-type{
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		word-break: break-all;
	}

	div:last-of-type{
		margin-right: -6px;
		margin-top: -40px;
	}
`;

export const Day = styled.div`
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

export const CardHabit = styled.div`
	background: #FFFFFF;
	border-radius: 5px;
	margin-bottom: 10px;
	padding: 14px;
`;



export const WeekDaysContainer = styled.div`
	width: 100%;
	margin-top: 10px;
	display: flex;

	div {
		margin-right: 5px;
		display: flex;
		justify-content: center;    
	}
`;

export const Buttons = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-items: center;
	margin-top:20px;
`;

export const SaveButton = styled.button`
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
export const CancelButton = styled.div`
	width: 84px;
	height: 35px;
	background: #FFFFFF;
	border-radius: 4.63636px;
	color: #52B6FF;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const InputNameHabit = styled.input`
	width: 100%;
	height: 45px;
	background: #FFFFFF;
	border: 1px solid #D5D5D5;
	border-radius: 5px;
	font-family: 'Lexend Deca', sans-serif;
	font-size: 19.976px;
	line-height: 25px;
	padding-left: 11px;

	::placeholder {
        color: #DBDBDB;
    }
   
`; 

export const NewHabit = styled.form`
    height: 180px;
    width: 340px;
    background-color: #ffffff;
    display: ${props=>props.active?"flex":"none" };
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 16px;
    margin-bottom: 20px;
		
		@media screen and (max-width: 320px) {
		width: 285px;
	}	
`;

export const ButtonPlus = styled.button`
    width: 40px;
    height: 40px;
    background: #52B6FF;
    border-radius: 4.63636px;
    border: none;
    color: #FFFFFF;
    font-size: 26.976px;
    line-height: 34px;
`;
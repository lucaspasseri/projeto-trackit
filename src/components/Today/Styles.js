import styled from "styled-components";

export const HabitName = styled.div`
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

export const Subtitle = styled.div`
	font-size: 17.976px;
	line-height: 22px;
	color: ${props=>props.status?"#8fc549":"#BABABA"};  
`;
export const HighestSequence = styled.div`
	color: "#666666";
	font-family: 'Lexend Deca', sans-serif;
	font-size: 12.976px;
	line-height: 16px;

	span {
		color:${props=>props.highstatus>0 && props.highstatus>=props.status?"#8fc549":"#666666"};
	}

`;

export const CurrentSequence = styled.div`
	color:"#666666";
	font-family: 'Lexend Deca', sans-serif;
	font-size: 12.976px;
	line-height: 16px;

	span {
		color:${props=>props.status>0?"#8fc549":"#666666"};
	}
`;

export const LeftSide = styled.div`
	width: 70%;
	font-family: 'Lexend Deca', sans-serif;
	font-size: 12.976px;
	line-height: 16px;
	color: #666666;
	display: flex;
	flex-direction:column;
`;
export const RightSide = styled.div`
	cursor: pointer;
	width: 69px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${props=>props.done?"#8fc549":"#EBEBEB"};
	border: 1px solid #E7E7E7;
	box-sizing: border-box;
	border-radius: 5px;
`;

export const HabitsList = styled.div`
	padding-top: 28px;
`;

export const TopToday = styled.div`
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
import styled from "styled-components";

export const customStyles = {
	overlay:{
		backgroundColor: "rgba(89,89,88,0.25)"
	},
	content: {
		backgroundColor: "#fff",
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		borderRadius: "5px",
		transform: "translate(-50%, -50%)",
	},
};
export const Title = styled.h2`
	color: #126BA5;
	font-weight: 700;
	font-size: 15px;
	padding-bottom: 6px;
`;

export const SubTitle = styled.h5`
	color: #FF4455;
	font-weight: 700;
	font-size: 12px;
	padding-bottom: 20px;
`;

export const Buttons = styled.div`
	display: flex;
	justify-content: space-evenly;
`;

export const Button = styled.button`
		border-radius: 5px;
		border: none;
		background-color: #52B6FF;
		color: #fff;
		font-weight: 700;
		cursor: pointer;
		height: 30px;
		width: 80px;
`;
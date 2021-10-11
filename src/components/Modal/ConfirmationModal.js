import React from "react";
import Modal from "react-modal";
import {customStyles, Title, SubTitle, Buttons, Button} from "./Styles";

export default function ConfirmationModal(props){
	// eslint-disable-next-line react/prop-types
	const {isOpen, setIsOpen, deleteHabit, habitId} = props;
	Modal.setAppElement("#root");

	function closeModal(){
		setIsOpen(false);
	}

	function reply(choose){
		if(!choose){
			setIsOpen(false);
			return;
		}
		deleteHabit(habitId);
		setIsOpen(false);
	}
	return( 
		<Modal
			isOpen={isOpen}
			onRequestClose={closeModal}
			style={customStyles}
		>
			<Title>
				{"Deseja apagar esse hábito?"}
			</Title>
			<SubTitle>
				{"Ação irreversível."}
			</SubTitle>
			<Buttons>
				<Button onClick={()=>reply(true)}>Sim</Button>
				<Button onClick={()=>reply(false)}>Não</Button>
			</Buttons>
		</Modal>
	);
}
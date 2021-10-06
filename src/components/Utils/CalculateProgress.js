export default function CalculateProgress(habitsArray){
	const aux = (habitsArray.filter(item=>item.done).length/habitsArray.length)*100;
	if(aux){
		return aux;
	}
	return 0;
}

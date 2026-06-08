import { MdEdit } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

function ExerciseRow({thisExercise, onDelete, setExerciseToEdit}){
    const navigate = useNavigate()
    function toEdit(){
        setExerciseToEdit(thisExercise)
        navigate('/edit')
    }

    return (
        <tr>
            <td> <MdEdit onClick={toEdit}/> </td>
            <td> {thisExercise.date?.split('T')[0]}</td>
            <td> {thisExercise.name}</td>
            <td> {thisExercise.reps}</td>
            <td> {thisExercise.weight}</td>
            <td> {thisExercise.unit}</td>
            <td> <RiDeleteBin2Fill onClick={() => onDelete(thisExercise._id)}/> </td>
        </tr>
    )
}

export default ExerciseRow;
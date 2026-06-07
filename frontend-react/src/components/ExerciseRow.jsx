//  HTML Row component
//      Fetches a single document into a single <tr>. 
//      To ensure that date displays as YYYY-MM-DD, append .date?.split('T')[0] 
//          to the param, which will remove the timestamp.
//      Includes a clickable React Icon Links to an external site. for Edit which 
//          loads the Edit page.
//      Includes a clickable React Icon for Delete, which immediately deletes the 
//          row/document.

// Each row includes 2 React Icons:
//      Delete → calls DELETE /exercises/:id
//      Edit → navigates to Edit Exercise page.
        //use fetch() - see m9 examples

import { FiEdit2, FiEdit3 } from "react-icons/fi";
import { MdEdit, MdOutlineEdit, MdDelete, MdDeleteOutline } from "react-icons/md";
import { RiDeleteBin2Fill, RiDeleteBin2Line } from "react-icons/ri";

import { useNavigate } from 'react-router-dom';

function ExerciseRow({thisExercise, onDelete, setExerciseToEdit}){
    //can these two be combined?
    //also not successfully pasing along the object to the edit page
    const navigate = useNavigate()
    function toEdit(){
        setExerciseToEdit(thisExercise)
        navigate('/edit')
    }

    return (
        <tr>
            <td> <FiEdit2 onClick={toEdit}/> </td>
            <td> {thisExercise.date?.split('T')[0]}</td>
            <td> {thisExercise.name}</td>
            <td> {thisExercise.reps}</td>
            <td> {thisExercise.weight}</td>
            <td> {thisExercise.unit}</td>
            <td> <RiDeleteBin2Fill onClick={() => onDelete(thisExercise._id)}/> </td>
        </tr>
    )
}

// need to figure out how to route onclick
// need to figure out how to make route handler calls

export default ExerciseRow;
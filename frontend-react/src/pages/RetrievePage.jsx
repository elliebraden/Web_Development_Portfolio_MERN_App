import {useState, useEffect} from 'react'
import ExerciseTable from "../components/ExerciseTable";


function RetrievePage({setExerciseToEdit}){
    
    const [exercises, setExercises] = useState([])

    //calls backend to retrieve all exercises
    const loadExercises = async() => {
        const response = await fetch('/exercises')
        const Data = await response.json()
        setExercises(Data)
    }

    //called on load of page
    useEffect(() => {
        loadExercises()
    }, []);

    //called on click of 'delete' icon
    const onDelete = async _id => {
        const deleteResponse = await fetch(`/exercises/${_id}`, 
            {method: 'DELETE'})
        //call load exercise if successful to properly display valid exercises
        if (deleteResponse.status === 204) {
            loadExercises()
        }
    }
        
    return(
        <ExerciseTable 
            exercisesData={exercises} 
            onDelete={onDelete}
            setExerciseToEdit={setExerciseToEdit}/>
    )
}

export default RetrievePage;
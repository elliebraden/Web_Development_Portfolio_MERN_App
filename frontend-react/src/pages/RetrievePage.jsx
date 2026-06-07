import {useState, useEffect} from 'react'
import ExerciseTable from "../components/ExerciseTable";


function RetrievePage({setExerciseToEdit}){
    
    const [exercises, setExercises] = useState([])

    const loadExercises = async() => {
        const responce = await fetch('/exercises')
        const Data = await responce.json()
        setExercises(Data)
    }

    useEffect(() => {
        loadExercises()
    }, []);

    const onDelete = async _id => {
        const deleteResponce = await fetch(`/exercises/${_id}`, 
            {method: 'DELETE'})
        //callload exercise if successful
        if (deleteResponce.status === 204) {
            loadExercises()
        } else{
            console.error(`Failed to delete movie with id = ${_id}, 
                status code = ${response.status}`)
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
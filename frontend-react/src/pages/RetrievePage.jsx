import {useState, useEffect} from 'react'
import ExerciseTable from "../components/ExerciseTable";


function RetrievePage({setExerciseToEdit}){
    
    const [exercises, setExercises] = useState([])

    //calls backend to retrieve all exercises
    const loadExercises = async() => {
        const responce = await fetch('/exercises')
        const Data = await responce.json()
        setExercises(Data)
    }

    //called on load of page
    useEffect(() => {
        loadExercises()
    }, []);

    //called on click of 'delete' icon
    const onDelete = async _id => {
        const deleteResponce = await fetch(`/exercises/${_id}`, 
            {method: 'DELETE'})
        //call load exercise if successful to properly display valid exercises
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
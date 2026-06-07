import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function EditPage({exerciseToEdit}){
    const [date, setDate] = useState(exerciseToEdit.date.split('T')[0])
    const [name, setName] = useState(exerciseToEdit.name)
    const [reps, setReps] = useState(exerciseToEdit.reps)
    const [weight, setWeight] = useState(exerciseToEdit.weight)
    const [unit, setUnit] = useState(exerciseToEdit.unit)
    
    const navigate = useNavigate();

    const updateExercise = async event => {
        event.preventDefault()
        const updatedExercise = {date:date!==''?date:undefined, name, reps, weight, unit}
        const createResponce = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedExercise),
            headers: { 'Content-Type': 'application/json'}
        });
        if (createResponce.status === 200) {
            alert("Exercise successfullly updated!")
        } else {
            alert("Exercise unable to be updated.")
        }
        //back to home
        navigate('/')
    }

    return(
        <form onSubmit={updateExercise}> 
            <fieldset>
                <legend></legend>
                <p>
                    <label htmlFor='date'> Date: </label>
                    <input 
                        id='date'
                        type='date'
                        value={date}
                        max={new Date().toISOString().split('T')[0]}
                        onChange={e => setDate(e.target.value)}
                        required>
                    </input>
                </p>
                <p>
                    <label htmlFor='name'> Exercise: </label>
                    <input 
                        id='name'
                        type='text'
                        placeholder="name of exercise"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required>
                    </input>
                </p>
                <p>
                    <label htmlFor='reps'> Reps: </label>
                    <input
                        id='reps'
                        type='number'
                        min={1}
                        value={reps}
                        onChange={e => setReps(e.target.valueAsNumber)}
                        required>
                    </input>
                </p>
                <p>
                    <label htmlFor='weight'> Weight: </label>
                    <input
                        id='weight'
                        type='number'
                        min={0}
                        value={weight}
                        onChange={e => setWeight(e.target.valueAsNumber)}
                        required>
                    </input>
                </p>
                <p>
                    <label htmlFor='unit'> Unit: </label>
                    <select
                        id='unit'
                        value={unit}
                        onChange={e => setUnit(e.target.value)}
                        required>
                        <option value=''>Select Unit</option>
                        <option value='kgs'>kgs</option>
                        <option value='lbs'>lbs</option>
                        <option value='miles'>miles</option>
                    </select>
                </p>
                <button>Save Changes</button>
            </fieldset> 
        </form>
    )
}

export default EditPage
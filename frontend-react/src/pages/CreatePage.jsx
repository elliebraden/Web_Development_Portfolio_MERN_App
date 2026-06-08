import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function CreatePage(){
    const [date, setDate] = useState('')
    const [name, setName] = useState('')
    const [reps, setReps] = useState(1)
    const [weight, setWeight] = useState(0)
    const [unit, setUnit] = useState('')

    const navigate = useNavigate();

    //called on submision of form
    const addExercise = async event => {
        event.preventDefault()
        const newExercise = {date:date!==''?date:undefined, name, reps, weight, unit}
        //backend request ot create exercise
        const createResponce = await fetch(`/exercises`, {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: { 'Content-Type': 'application/json'}
        });
        //inform user of success or failure
        if (createResponce.status === 201) {
            alert("Exercises Added! \nKeep up the good Work!")
        } else {
            alert("Exercise unable to be added.")
        }
        //back to home
        navigate('/')
    }

    return(
        <form onSubmit={addExercise}> 
            <fieldset>
            <p>
                <label htmlFor='date'> Date: </label>
                <input 
                    id='date'
                    type='date'
                    max={new Date().toISOString().split('T')[0]}
                    value={date}
                    onChange={e => setDate(e.target.value)}>
                </input>
            </p>
            </fieldset>
            <fieldset>
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
            </fieldset> 
            <fieldset>
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
            </fieldset>
            <button>Save Exercise</button>
        </form>
    ) 
}

export default CreatePage;
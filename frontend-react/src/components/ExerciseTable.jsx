import ExerciseRow from './ExerciseRow'

function ExerciseTable({exercisesData, onDelete, setExerciseToEdit}){
    return (
        <table>
            <thead> 
                <tr>
                    <th></th>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Unit</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {exercisesData.map((exercise) => 
                    <ExerciseRow thisExercise={exercise} key={exercise._id} 
                    onDelete={onDelete}
                    setExerciseToEdit={setExerciseToEdit}></ExerciseRow>)}
            </tbody>
        </table>
    )
}

export default ExerciseTable;
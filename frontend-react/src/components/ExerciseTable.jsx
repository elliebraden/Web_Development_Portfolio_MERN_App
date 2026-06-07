//  HTML Table component
//      Maps the data from the collection of documents by calling the Row 
//      component into the <tbody> of the <table>.
import ExerciseRow from './ExerciseRow'

function ExerciseTable({exercisesData, onDelete, setExerciseToEdit}){
    return (
        <table>
            <caption> </caption>
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
// need to figure out how to bring in database info and then map?

export default ExerciseTable;
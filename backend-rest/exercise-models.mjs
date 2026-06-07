import mongoose from 'mongoose';
import 'dotenv/config';

let connection = undefined;

/**
 * This function connects to the MongoDB server.
 */
export async function connect(){
    try{
        await mongoose.connect(process.env.MONGODB_CONNECT_STRING);
        connection = mongoose.connection;
        // console.log("Successfully connected to MongoDB using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

//define schema
const exercisesSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: {type: String, required: true},
    date: {type: Date, default: Date.now, required: true},
}, {collection: 'exercises'});

//create Exercise class
const Exercise = mongoose.model("exercises", exercisesSchema);

//create a new exercise
export async function createExercise(paramArray){
    const newExercise = await new Exercise(paramArray)
    return newExercise.save()
}

//retireve all exercises
export async function retrieveAll(){
    return await Exercise.find().exec()
}

//retrieve an exercise by id
export async function retireveExercise(id){
    return await Exercise.findById(id).exec() 
}

//updates an existing exercises by id
export async function updateExercise(updateArray, id){
    return await Exercise.findOneAndUpdate({_id: id}, updateArray).exec()
}

//deletes an exercises by id
export async function deleteExercise(id){
    return await Exercise.deleteOne({_id: id}).exec()
}
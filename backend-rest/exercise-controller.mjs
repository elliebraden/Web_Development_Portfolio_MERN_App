import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import validator from 'validator';
import * as exercises from './exercise-models.mjs';


const app = express();
app.use(express.json())

const PORT = process.env.PORT;

// //need an app.listen
app.listen(PORT, async () => {
    await exercises.connect(false)
    // console.log(`Server listening on port ${PORT}...`);
});

//validation
function validation(reqBody){
// Ensure name is not empty.
    if (validator.isEmpty(reqBody['name'])){
        return false
    };
    // Ensure reps is greater than 0.
    if (typeof(reqBody['reps']) !== 'number' || reqBody['reps'] <= 0){
        return false
    };
    // Ensure weight is equal to or greater than 0.
    if (typeof(reqBody['weight']) !== 'number' || reqBody['weight'] < 0){
        return false
    }
    // Ensure unit is one of these values: "kgs", "lbs", or "miles".
    if (!['kgs', 'lbs', 'miles'].includes(reqBody['unit'])){ 
        return false
    };
    // If date is provided, ensure it is valid.
    if (reqBody['date'] && !validator.isDate(reqBody['date'])){
        return false
    };
    return true
};


//POST/exercises
app.post('/exercises', asyncHandler(async(req, res) => {
    //validate
    if (!validation(req.body)){
        sendErrorMesssage(res, 400, "Invalid request")
        return
    }
    //call CRUD in model
    const newExercise = await exercises.createExercise(req.body)
    res.status(201).json(newExercise)
}));

//GET/exercises
app.get('/exercises', asyncHandler(async(req,res) => {
    //call CRUD in model
    const exercisesArray = await exercises.retrieveAll()
    res.status(200).json(exercisesArray)
}));

//GET/exercises/:id
app.get('/exercises/:id', asyncHandler(async(req,res) => {
    //call CRUS in model
    const thisExercise = await exercises.retireveExercise(req.params.id)
    if (thisExercise === null){
        return sendErrorMesssage(res, 404, "Not Found")
    }
    res.status(200).json(thisExercise)
}));

//PUT/exercises/:id
app.put('/exercises/:id', asyncHandler(async(req,res) => {
    //validate
    if (!validation(req.body)){
        sendErrorMesssage(res, 400, "Invalid request")
        return
    }
    const updated = await exercises.updateExercise(req.body, req.params.id)
    if (updated === undefined){
        sendErrorMesssage(res, 404, "Not Found")
        return
    }
    res.status(200).json(updated)
}));

//DELETE/exercises/:id
app.delete('/exercises/:id', asyncHandler(async(req,res) => {
    const deleted = await exercises.deleteExercise(req.params.id)
    if (deleted.deletedCount === 0){
        sendErrorMesssage(res, 404, "Not found")
        return
    }
    res.status(204).send()
}));

//return failure helper method
function sendErrorMesssage(res, code, message) { 
    res.status(code).json({"Error": message})
}
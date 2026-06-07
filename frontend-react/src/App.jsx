import './index.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from "react";
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';
import RetrievePage from './pages/RetrievePage';

function App() {

  const [exerciseToEdit, setExerciseToEdit] = useState()

  return (
    <div >
      <header>
        <h1> app title </h1>
        <p> unique text about your app. Keep it short. </p>
      </header>
      <main>
        <Router>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/create">Create</Link>
          </nav>
          <main>
            <Routes>
              <Route path="/" element={<RetrievePage setExerciseToEdit={setExerciseToEdit}/>} ></Route>
              <Route path="/create" element={<CreatePage />}></Route>
              <Route path="/edit" element={<EditPage exerciseToEdit={exerciseToEdit} />}></Route>
            </Routes> 
          </main>
        </Router>
      </main>
      <footer>
        <p>&copy; 2026 Ellie Braden</p>
    </footer>
    </div>
  );
}

export default App;
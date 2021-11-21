import './App.css';
import { useEffect, useState } from 'react';
import MovieDashboard from './components/Movies/MoviesDashboard'
import axios from 'axios';
import BookingDashboard from './components/Booking/Booking Dashboard/BookingDashboard';

function App() {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () =>{
    try{
    const response = await axios.get('https://crudcrud.com/api/bd57acad2641444dbc5c475bab877b0e/movies');
    setMovies(response.data);
    }
    catch(e){}
  }

  useEffect(() =>{
    fetchMovies()
  },[]);

  const newBookingHandler= () => {
    fetchMovies();
  }

  return (
    <div className="App">
      <BookingDashboard movieDetails={movies} onNewBooking={newBookingHandler}/>
      <MovieDashboard movieDetails={movies} />
    </div>
  );
}

export default App;

import React,{useState} from 'react'
import './BookingForm.css'

const BookingForm = (props) =>{
    const [movieId, setMovieId]=useState('')
    const [ticketsBooked,setTicketsBooked]=useState('')

    const movieIdChangeHandler = (event) =>{
        setMovieId(event.target.value)
    }

    const ticketsBookedChangeHandler = (event) =>{
        setTicketsBooked(event.target.value)
    }

    const submitHandler = (event) =>{
        event.preventDefault();
        props.onEnterBookingDetails({
            movieId:movieId,
            ticketsBooked:ticketsBooked
        })
    }

    return(
        <div className="booking-dashboard">
        <h3>Booking Dashboard</h3>
        <form name="bookingForm" onSubmit={submitHandler}>
        <label>MOVIE ID</label> &nbsp;<input type="text" name="movieId" value={movieId} onChange={movieIdChangeHandler}/>&nbsp;
        Number of Tickets to Book &nbsp;<input type="number" name="noOfTickets" value={ticketsBooked} onChange={ticketsBookedChangeHandler}/>&nbsp;
        <button type="submit" name="book">Book</button>
        </form>
        {props.message}
        </div>
    )
}

export default BookingForm;
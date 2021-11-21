import BookingForm from "../BookingForm/BookingForm";
import {  useState } from "react";
import axios from "axios";

const BookingDashboard = (props) => {
    const [message,setMessage]=useState('');
    const movieDetails=props.movieDetails;

    function bookingDetailsValidation(bookingDetails){
        
        for(const i in movieDetails){

            const tickets=parseInt(movieDetails[i]['booked-tickets'])+parseInt(bookingDetails['ticketsBooked']);
            
            if(movieDetails[i]['_id'] === bookingDetails['movieId'] && movieDetails[i]['total-tickets']>=tickets){
                
                const updateMovieDetails = {
                    'name':movieDetails[i]['name'],
                    'total-tickets':movieDetails[i]['total-tickets'],
                    'booked-tickets':tickets
                }
                
                setMessage(`movie ${bookingDetails['movieId']} booked`)
                return ([bookingDetails['movieId'],updateMovieDetails]);
            }
        }
        setMessage(`booking with ${bookingDetails['movieId']} cannot be done`)
        return [];
    }

    const enterBookingDetailsHandler = async (bookingDetails) =>{
        
        const result = bookingDetailsValidation(bookingDetails)
        if(result.length > 0){
            const movieId = result[0];
            const payload = result[1];
            await axios.put(`https://crudcrud.com/api/bd57acad2641444dbc5c475bab877b0e/movies/${movieId}`,payload);
            props.onNewBooking();
        }
    }

    return(
        <BookingForm message={message} onEnterBookingDetails={enterBookingDetailsHandler} />
    );
}

export default BookingDashboard;

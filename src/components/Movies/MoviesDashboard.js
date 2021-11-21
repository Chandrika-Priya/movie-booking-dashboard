import React from 'react';
import "./MoviesDashboard.css";

const MovieDashboard = (props) =>{
    const movieDetails = props.movieDetails;
    const rows=[];

    movieDetails.map(movie => {
        return(
        rows.push(
            <tr key={movie['_id']}>
                <td>{movie['name']}</td>
                <td>{movie["_id"]}</td>
                <td>{movie["total-tickets"]}</td>
                <td>{movie["booked-tickets"]}</td>
            </tr>
        ))
    })

    return(
        <div className="movie-dashboard">
        <table>
            <caption><b>Movies</b></caption>
            <thead>
                <tr>
                <th>Movie Name</th>
                <th>Id</th>
                <th>Total Tickets</th>
                <th>Booked Tickets</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
        </div>
    )
}

export default MovieDashboard;
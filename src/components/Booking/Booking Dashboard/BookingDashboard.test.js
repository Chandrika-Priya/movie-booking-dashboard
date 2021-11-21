import React from "react";
import BookingDashboard from "./BookingDashboard";
import {configure, shallow} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import axios from "axios";

configure({
    adapter:new Adapter()
});

jest.mock('../BookingForm/BookingForm');
jest.mock('axios');

describe("New Booking",() =>{

    it("should display booking cannot be done if movie id is not available",() =>{
        const newBookingHandler = jest.fn()
        const setState = jest.fn();
        const useStateSpy = jest.spyOn(React,'useState')
        useStateSpy.mockImplementation((init) => [init,setState])

        const wrapper = shallow(<BookingDashboard movieDetails={[]} onNewBooking={newBookingHandler}/>)
        let bookingDashboard = wrapper.find('BookingForm')
        let bookingDashboardProps = bookingDashboard.props()
        bookingDashboardProps.onEnterBookingDetails({movieId:1,ticketsBooked:3})

        expect(setState).toHaveBeenCalledWith('booking with 1 cannot be done')
    })

    it("should display booking is done if movie id is available",async () =>{
        const onNewBooking = jest.fn()
        const setState = jest.fn();
        const useStateSpy = jest.spyOn(React,'useState')
        useStateSpy.mockImplementation((init) => [init,setState])
        
        const movies = [{'_id':'1','name':'movie 1','total-tickets':'10','booked-tickets':'0'}]
        const wrapper = shallow(<BookingDashboard movieDetails={movies} onNewBooking={onNewBooking}/>)
        let bookingDashboard = wrapper.find('BookingForm')
        let bookingDashboardProps = bookingDashboard.props()
        bookingDashboardProps.onEnterBookingDetails({movieId:'1',ticketsBooked:3})
        axios.put.mockResolvedValue()

        expect(setState).toHaveBeenCalledWith('movie 1 booked')
        expect(await onNewBooking).toHaveBeenCalledTimes(1)
    })
})
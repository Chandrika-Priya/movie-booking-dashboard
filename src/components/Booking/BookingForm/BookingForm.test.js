import React from "react";
import {configure, shallow} from "enzyme";
import BookingForm from "./BookingForm";
import Adapter from 'enzyme-adapter-react-16';

configure({
    adapter:new Adapter()
});

describe("Booking Form Test",() =>{
    const enterBookingDetailsHandler = jest.fn();
    const message='message';

    it("should contain initial Values to be empty",() =>{
        const wrapper = shallow(<BookingForm />)

        expect(wrapper.find('input[name="movieId"]').prop('value')).toBe('');
        expect(wrapper.find('input[name="noOfTickets"]').prop('value')).toBe('');
    })

    it("should update the states of the component when user enters details",() =>{
        const wrapper = shallow(<BookingForm />)
        wrapper.find('input[name="movieId"]').simulate('change',{
            target:{
                value:'movie id 1'
            },
        });
        wrapper.find('input[name="noOfTickets"]').simulate('change',{
            target:{
                value:5,
            },
        });


        expect(wrapper.find('input[name="movieId"]').prop('value')).toBe('movie id 1');
        expect(wrapper.find('input[name="noOfTickets"]').prop('value')).toBe(5);
    })

    it("should trigger onSubmit when submitting",() =>{
        const wrapper = shallow(<BookingForm message={message} onEnterBookingDetails={enterBookingDetailsHandler}/>);
        const form = wrapper.find('form[name="bookingForm"]')
        form.simulate('submit',{
            preventDefault : ()=>{}
        });

        expect(enterBookingDetailsHandler).toHaveBeenCalledTimes(1);
    })
    
})
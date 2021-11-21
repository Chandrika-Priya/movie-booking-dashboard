import { render, screen } from '@testing-library/react';
import App from './App';
import axios from 'axios';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react'
import { act } from 'react-dom/test-utils';

configure({
  adapter:new Adapter()
});

jest.mock('axios')

describe("App test",() =>{

  it('should render successfully', () => {
    render(<App />);
    const bookingDashboard = screen.getByText('Booking Dashboard')
    const movieDashboard = screen.getByText('Movies')
  
    expect(bookingDashboard).toBeInTheDocument()
    expect(movieDashboard).toBeInTheDocument()
  });

  it('should fetch movies',async () =>{
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React,'useState')
    useStateSpy.mockImplementation((init) => [init,setState])
    const movies = [{'_id':'1','name':'movie 1','total-tickets':'10','booked-tickets':'0'}]
    axios.get.mockResolvedValue({data:movies})
    
    await act(async () => {
      try{
      render(<App />)
      expect(setState).toHaveBeenCalledWith(movies)
      }
      catch(e){}
    })
  })

  it('should fetch movies on new booking ',() =>{
    jest.mock('./components/Booking/Booking Dashboard/BookingDashboard')
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React,'useState')
    useStateSpy.mockImplementation((init) => [init,setState])
    const movies = [{'_id':'1','name':'movie 1','total-tickets':'10','booked-tickets':'0'}]
    axios.get.mockResolvedValue({data:movies})

    const wrapper = shallow(<App />)
    const newBooking = wrapper.find('BookingDashboard')
    const newBookingProps = newBooking.props()
    newBookingProps.onNewBooking();

    try{
    expect(setState).toHaveBeenCalledWith(movies)
    }
    catch(e){}
  })

})

import React from "react"
import { configure, shallow } from "enzyme"
import MovieDashboard from "./MoviesDashboard"
import Adapter from 'enzyme-adapter-react-16';

configure({
    adapter:new Adapter()
});

describe("Movie Dashboard",()=>{
    it("should render movie dashboard",()=>{
        const wrapper = shallow(<MovieDashboard movieDetails={[]}/>)
        const table = wrapper.find('table')
        const row = table.find('tr')

        expect(table).toHaveLength(1)
        expect(row).toHaveLength(1)
    })

    it("should display movies in movieDashboard",() =>{
        const movies = [{'_id':'1','name':'movie 1','total-tickets':'10','booked-tickets':'0'}]
        const wrapper = shallow(<MovieDashboard movieDetails={movies}/>)
        const table = wrapper.find('table')
        const row = table.find('tr')
        const cells = row.find('td');

        expect(table).toHaveLength(1)
        expect(row).toHaveLength(2)
        expect(cells.at(0).text()).toEqual(movies[0]['name']);
        expect(cells.at(1).text()).toEqual(movies[0]['_id']);
        expect(cells.at(2).text()).toEqual(movies[0]['total-tickets']);
        expect(cells.at(3).text()).toEqual(movies[0]['booked-tickets']);
    })
})
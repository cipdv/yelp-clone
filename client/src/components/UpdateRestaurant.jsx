import React, { useState, useContext, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder'
import {RestaurantContext} from '../contexts/RestaurantContext'

const UpdateRestaurant = (props) => {

    //useParams hook from react-router
    const {id} = useParams()

    //history api to be able to send us back to homepage
    let history = useHistory()

    //always need to make inputs controlled when using forms in react
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [priceRange, setPriceRange] = useState("")

    //bring in restaurant context
    const {restaurants} = useContext(RestaurantContext)

    useEffect(() => {
        const fetchData = async () => {
            const response = await RestaurantFinder.get(`/${id}`)
            setName(response.data.data.restaurant.name);
            setLocation(response.data.data.restaurant.location);
            setPriceRange(response.data.data.restaurant.price_range)
        }
        fetchData();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
            name,
            location, 
            price_range: priceRange
        })
        history.push("/")
    }
    
    return (
        <div>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input value={name} onChange={e => setName(e.target.value)} type="text" id="name" className="form-control"/>
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input value={location} onChange={e => setLocation(e.target.value)} type="text" id="location" className="form-control"/>
                </div>
                <div className="form-group">
                    <label htmlFor="price_range">Price</label>
                    <input value={priceRange} onChange={e => setPriceRange(e.target.value)} type="number" id="price_range" className="form-control"/>
                </div>
                <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default UpdateRestaurant

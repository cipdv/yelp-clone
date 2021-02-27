import React, {useContext, useEffect} from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantContext } from '../contexts/RestaurantContext'
import {useHistory} from 'react-router-dom'

const RestaurantList = (props) => {
    
    //use history hook from react router dom to represent history of the browser
    let history = useHistory();

    const {restaurants, setRestaurants} = useContext(RestaurantContext)

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get("/");
                setRestaurants(response.data.data.restaurants);
            } catch (err) {
                console.log(err)
            }
        }

        fetchData();
    }, [])
    
    //click function for delete button
    const handleDelete = async (e, id) => {
        try {
            e.stopPropagation();
            const response = await RestaurantFinder.delete(`/${id }`);
            setRestaurants(restaurants.filter(restaurant => {
                return restaurant.id !== id
            }));
        } catch (err) {
            console.log(err)
        }
    }

    //click function for update button
    const handleUpdate = async (e, id) => {
        e.stopPropagation();
        history.push(`/restaurants/${id}/update`);
    }

    //click function for selecting table row
    const handleRestaurantSelect = async (id) => {
        history.push(`/restaurants/${id}`)
    }

    return (
        <div className="list-group">
            <table className="table table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th scope="col">Restaurant</th>
                        <th scope="col">Location</th>
                        <th scope="col">Price Range</th>
                        <th scope="col">Ratings</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants && restaurants.map(restaurant=>{
                        return(
                            <tr onClick={()=> handleRestaurantSelect(restaurant.id)} key={restaurant.id}>
                                <td data-label="Restaurant">{restaurant.name}</td>
                                <td data-label="Location">{restaurant.location}</td>
                                <td data-label="Price Range">{"$".repeat(restaurant.price_range)}</td>
                                <td data-label="Ratings">reviews</td>
                                <td onClick={(e)=>handleUpdate(e, restaurant.id)} data-label="Edit"><button className="btn btn-warning">Update</button></td>
                                <td onClick={(e)=>handleDelete(e, restaurant.id)} data-label="Delete"><button className="btn btn-danger">Delete</button></td>
                            </tr>
                        )                       
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default RestaurantList

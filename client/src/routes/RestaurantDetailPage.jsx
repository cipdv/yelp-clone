import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder';
import AddReview from '../components/AddReview';
import Reviews from '../components/Reviews';
import StarRating from '../components/StarRating';
import {RestaurantContext} from '../contexts/RestaurantContext'

const RestaurantDetailPage = () => {

    const {id} = useParams(); 

    const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantContext);

    useEffect(()=> {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get(`/${id}`)
                setSelectedRestaurant(response.data.data)
            } catch (err) {
                console.log(err)
            }          
        }
        fetchData();
    }, [])

    return (
        <div>
            {selectedRestaurant && (
                <>
                    <h1>{selectedRestaurant.restaurant.name}</h1>
                    <div className="mt-3">
                        <Reviews reviews={selectedRestaurant.reviews} />    
                    </div>
                    <AddReview />
                </>
            )}
        </div>
    )
}

export default RestaurantDetailPage

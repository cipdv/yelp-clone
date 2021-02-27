import React, { useState } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import {useHistory, useLocation, useParams} from 'react-router-dom'

const AddReview = () => {

    const {id} = useParams();
    const history = useHistory();
    const location = useLocation();

    const [name, setName] = useState("");
    const [rating, setRating] = useState("rating");
    const [reviewText, setReviewText] = useState("");

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        try {
            const response = await RestaurantFinder.post(`/${id}/addReview`, {
                name,
                review: reviewText,
                rating
            })
            history.push("/")
            history.push(location.pathname)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="mb-2">
            <form action="">
                <div className="form-row">
                    <div className="form-group col-8">
                        <label htmlFor="name">Name</label>
                        <input value={name} onChange={e=>setName(e.target.value)} className="form-control" id="name" placeholder="name" />
                    </div>
                    <div className="form-group col-4">
                        <label htmlFor="rating">Rating</label>
                        <select value={rating} onChange={e=>setRating(e.target.value)} id="rating" className="custom-select">
                            <option disabled>Rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="review">Review</label>
                    <textarea value={reviewText} onChange={e=>setReviewText(e.target.value)} id="Review" className="form-control"></textarea>
                </div>
                <button onClick={handleSubmitReview} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default AddReview

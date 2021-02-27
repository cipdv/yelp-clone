import React, {useState, useContext} from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantContext } from '../contexts/RestaurantContext';

const AddRestaurant = () => {

    const {addRestaurants} = useContext(RestaurantContext);

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("Price Range");

    const handleSubmit = async (e) => { 
        e.preventDefault();
        try {
            const response = await RestaurantFinder.post("/", {
                name,
                location,
                price_range: priceRange
            })
            addRestaurants(response.data.data.restaurant)
        } catch (err) {

        }

    }

    return (
        <div className="mb-4">
            <form action="">
                <div className="form-row">
                    <div className="form-col">
                        <input value={name} onChange={e=> setName(e.target.value)} type="text" className="form-control" placeholder="name"/>
                    </div>
                    <div className="form-col">
                        <input value={location} onChange={e=> setLocation(e.target.value)} type="text" className="form-control" placeholder="location"/>
                    </div>
                    <div className="form-col">
                        <select value={priceRange} onChange={e=> setPriceRange(e.target.value)} className="custom-select my-1 mr-sm-2">
                            <option value="disabled">Price Range</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
                        </select>
                    </div>
                    <button type="submit" onClick={handleSubmit} className="btn-primary btn">Add</button>
                </div>
            </form>
        </div>
    )
}

export default AddRestaurant

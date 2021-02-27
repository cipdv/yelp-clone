require('dotenv').config();
const express = require ('express');
const cors = require ('cors');
const db = require ('./db');

const app = express ();

// //middleware practice
// app.use((req, res, next)=>{
//     console.log('this is middleware');
//     next();
// })

//cors middleware
app.use(cors());

//express json middleware
app.use(express.json());

//retrieve all restaurants
app.get("/api/v1/restaurants", async (req, res)=> {
    try {
        const results = await db.query("select * from restaurants");    
        res.status(200).json({
            "status": "sucess",
            "results": results.rows.length,
            "data": {
                "restaurants": results.rows
            }   
        });
    } catch (err) {
        console.log(err);
    }
});

//retrieve a single restaurant
app.get("/api/v1/restaurants/:id", async (req, res)=> {
    try {
        //retrieve a single restaurant
        const restaurant = await db.query("select * from restaurants where id=$1", [req.params.id]);
        //retrieve the review for that restaurant
        const reviews = await db.query("select * from reviews where restaurant_id=$1", [req.params.id]);

        res.status(200).json({
            status: "success",
            data: {
                restaurant: restaurant.rows[0],
                reviews: reviews.rows
            }
        });
        
    } catch (err) {
        console.log(err);
    }
    
});

//create a restaurant
app.post("/api/v1/restaurants", async (req, res)=>{
    try {
        const results = await db.query("insert into restaurants (name, location, price_range) values ($1, $2, $3) returning *", [req.body.name, req.body.location, req.body.price_range])
        res.status(201).json({
            status: "success",
            data: {
                restaurant: results.rows[0]
            }
        })
    } catch (err) {
        console.log(err);
    }
});

//update a restaurant
app.put("/api/v1/restaurants/:id", async (req, res)=>{
    try {
        const results = await db.query("update restaurants set name = $1, location = $2, price_range = $3 where id = $4 returning *", [req.body.name, req.body.location, req.body.price_range, req.params.id]);
        res.status(200).json({
            status: "success",
            data: {
                restaurant: results.rows[0]
            }
        })
    } catch (err) {
        console.log(err);
    }
});

//delete a restaurant
app.delete("/api/v1/restaurants/:id", async (req, res)=> {
    try {
        const results = await db.query("delete from restaurants where id = $1", [req.params.id]);
        res.status(204).json({
            status: "successfully deleted"
        })
    } catch (err) {
        console.log(err);
    }

    
})

app.post("/api/v1/restaurants/:id/addReview", async (req, res)=>{
    try {
        const newReview = await db.query("insert into reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *;", [req.params.id, req.body.name, req.body.review, req.body.rating])
        res.status(201).json({
            status: "successfully added review",
            data: {
                review: newReview.rows[0]
            }
        })
    } catch (error) {
        console.log(error)
    }
})

const PORT = process.env.PORT || 3001;
app.listen (PORT, ()=> {
    console.log (`server running on port ${PORT}`);
    console.log(`you're doing great Cip, keep it up! :)`)
});



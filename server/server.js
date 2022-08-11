require('dotenv').config();
const express = require('express');
const cors = require('cors');
//automatically looks for index.js inside this folder
const db = require('./db');

const morgan = require("morgan");

const app = express();

//third party logging middleware
//app.use(morgan("tiny"));
app.use(morgan("dev"));

//express middleware
app.use(cors());
app.use(express.json());

// Get all meme uploads
app.get("/api/v1/meme-uploads", async (req, res) => {
    //console.log("get all meme route handler ran");
    try {
        //const results = await db.query("SELECT * FROM meme_uploads");
        const memeUploadsRatingsData = await db.query("select * from meme_uploads left join (select meme_upload_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by meme_upload_id) reviews on meme_uploads.id = reviews.meme_upload_id;");
        //console.log("results", results);
        //console.log("memeUploadsRatingsData", memeUploadsRatingsData);
        //console.log(results);
        res.status(200).json({
            status: "success (local pg data)",
            results: memeUploadsRatingsData.rows.length,
            data: {
                memes: memeUploadsRatingsData.rows,
            }
        });
    } catch (err) {
        console.log(err);
    }
});

// Get a specific meme upload
app.get("/api/v1/meme-uploads/:id", async (req, res) => {
    console.log(req.params.id);

    try {
        const memeUpload = await db.query(
            "select * from meme_uploads left join (select meme_upload_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by meme_upload_id) reviews on meme_uploads.id = reviews.meme_upload_id where id=$1;", [req.params.id]
        );

        const reviews = await db.query(
            "SELECT * FROM reviews WHERE meme_upload_id = $1", [req.params.id]
        );

        //console.log(results.rows[0]);
        res.status(200).json({
            status: "success (local pg data)",
            data: {
                memes: memeUpload.rows[0],
                reviews: reviews.rows
            },
        });
    } catch (err) {
        console.log(err);
    }

});

// Create a new meme upload
app.post("/api/v1/meme-uploads", async (req, res) => {
    //console.log("get meme route handler ran");
    
    try {
        const results = await db.query(
            "INSERT INTO meme_uploads (upload_filename, file_type) VALUES ($1, $2) RETURNING *", [req.body.upload_filename, req.body.file_type]
        );

        //console.log(results);
        res.status(202).json({
            status: "accepted (local pg data)",
            results: results.rows.length,
            data: {
                memes: results.rows[0],
            }
        });


    } catch (error) {
        console.log(error);
    }
});

// Update a meme upload
app.put("/api/v1/meme-uploads/:id", async (req, res) => {
    //console.log("put (update) meme route handler ran");

    try {
        const results = await db.query(
            "UPDATE meme_uploads SET upload_filename = $1, file_type = $2 WHERE id = $3 RETURNING *", [req.body.upload_filename, req.body.file_type, req.params.id]
        );
        //console.log(results);
        res.status(200).json({
            status: "success (local pg data)",
            data: {
                meme: results.rows[0],
            }
        });
    } catch (err) {
        console.log(err);
    }
});

// Delete a meme upload
app.delete("/api/v1/meme-uploads/:id", async (req, res) => {
    //console.log("delete meme route handler ran");
    
    try {
        const results = await db.query(
            "DELETE FROM meme_uploads WHERE id = $1", [req.params.id]
        );
        res.status(204).json({
            status: "success (local pg data)",
        });
    } catch (err) {
        console.log(err);
    }
});

app.post("/api/v1/meme-uploads/:id/addReview", async (req, res) => {
    //console.log("post review route handler ran");
    try {
       const newReview = await db.query(
        "INSERT INTO reviews (meme_upload_id, name, review, rating) VALUES ($1, $2, $3, $4) returning *;", 
        [req.params.id, req.body.name, req.body.review, req.body.rating]
       );
         res.status(201).json({
            status: "success (local pg data)",
            data: {
                review: newReview.rows[0],
            },
        });
    } catch (error) {
        console.log(error);
    }
});


const port = process.env.PORT || 3001;

//console.log("running npm start");
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
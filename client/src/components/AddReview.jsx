import React, {useState} from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import MemeUploadsFinder from '../apis/MemeUploadsFinder';

const AddReview = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    console.log(id);
    const [name, setName] = React.useState('');
    const [reviewText, setReviewText] = React.useState('');
    const [rating, setRating] = React.useState('Rating');
    
    const handleSubmitReview = async (e) => {
        e.preventDefault();
        try {
            const response = await MemeUploadsFinder.post(`/${id}/addReview`, 
            {
                name,
                review: reviewText,
                rating,
            });
            navigate('/');
            navigate(location.pathname);
            //console.log(response);
        } catch (error) {
            console.log(error);
        }
    };
    return (
    <div className="mb-2">
        <form action="">
            <div className="form-row">
                <div className="form-group col-8">
                    <label htmlFor="filename">Filename:</label>
                    <input value={name} onChange={e => setName(e.target.value)} id="filename" placeholder="filename" type="text" className="form-control" />
                </div>
                <div className="form-group col-4">
                    <label htmlFor="rating">Rating</label>
                    <select value={rating} onChange={e => setRating(e.target.value)}
                    id="rating" className="custom-select">
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
                <label htmlFor="Review">Review</label>
                <textarea value={reviewText} onChange={e => setReviewText(e.target.value)} id="Review" className="form-control"></textarea>
                <button type="submit" onClick={handleSubmitReview} className="btn btn-primary">Submit</button>
            </div>
        </form>
    </div>
  )
}

export default AddReview
import React, {useEffect} from 'react';
import { useContext } from 'react';
import MemeUploadsFinder from '../apis/MemeUploadsFinder';
import { MemeUploadsContext } from '../context/MemeUploadsContext';
import { useNavigate } from 'react-router-dom';
import e from 'cors';
import StarRating from './StarRating';

const MemeUploadsList = (props) => {
    const { memeUploads, setMemeUploads } = useContext(MemeUploadsContext);
    //let history = useHistory();
    let navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await MemeUploadsFinder.get('/');
                console.log(response.data.data);
                setMemeUploads(response.data.data.memes);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        try {
            const response = await MemeUploadsFinder.delete(`/${id}`);
            console.log(response); //setMemeUploads(memeUploads.filter(memeUpload => memeUpload.id !== id));
            setMemeUploads(memeUploads.filter(memeUpload => memeUpload.id !== id));
        } catch (error) {
            console.log(error);
        }

    }

    const handleUpdate = (e, id) => {
        e.stopPropagation();
        try {
            navigate(`/meme-uploads/${id}/update`);    
        } catch (error) {
            console.log(error);
        }
    };

    const handleMemeUploadSelect = (id) => {
        try {
            navigate(`/meme-uploads/${id}`);
        } catch (error) {
            console.log(error);
        }
    };

    const renderRating = (memeUpload) => {
        if (!memeUpload.count) {
            return (
                <span className="text-warning">0 Reviews</span>
            );
        }
        return(
            <>
            <StarRating rating={memeUpload.average_rating} />
            <span className="text-warning ml-1">({memeUpload.count})</span>
            </>
            
        );
        
    }
    
  return (
    <div className='list-group'>
        <table className="table table-hover table-dark">
            <thead>
                <tr className="bg primary">
                    <th scope="col">Upload Filename</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Updated At</th>
                    <th scope="col">File Type</th>
                    <th scope="col">Reviews</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {memeUploads && memeUploads.map((memeUpload) => {
                    return (
                        <tr onClick={() => handleMemeUploadSelect(memeUpload.id)} key={memeUpload.id}>
                            <td>{memeUpload.upload_filename}</td>
                            <td>{memeUpload.created_at}</td>
                            <td>{memeUpload.updated_at}</td>
                            <td>{memeUpload.file_type}</td>
                            <td>{renderRating(memeUpload)}</td>
                            <td>
                                <button onClick={(e) => handleUpdate(e, memeUpload.id)} className="btn btn-warning">Edit</button>
                            </td>
                            <td>
                                <button onClick={(e) => handleDelete(e, memeUpload.id)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    )
                })}
                {/* <tr>
                    <td>meme1.jpg</td>
                    <td>today</td>
                    <td>now</td>
                    <td>jpg</td>
                    <td>
                        <button className="btn btn-warning">Update</button>
                    </td>
                    <td>
                        <button className="btn btn-danger">Delete</button>
                    </td>
                </tr>
                <tr>
                    <td>meme1.jpg</td>
                    <td>today</td>
                    <td>now</td>
                    <td>jpg</td>
                    <td>
                        <button className="btn btn-warning">Update</button>
                    </td>
                    <td>
                        <button className="btn btn-danger">Delete</button>
                    </td>
                </tr> */}
            </tbody>
        </table>
    </div>
  )
}

export default MemeUploadsList
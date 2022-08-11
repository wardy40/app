import React from 'react'
import { useEffect } from 'react';
import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom'
import { MemeUploadsContext } from '../context/MemeUploadsContext';
import MemeUploadsFinder from '../apis/MemeUploadsFinder'; 
import { useNavigate } from 'react-router-dom';

const UpdateMemeUpload = (props) => {
    const {id} = useParams();
    const { memeUploads } = useContext(MemeUploadsContext);
    const [filename, setFilename] = useState("");
    const [filetype, setFiletype] = useState("");
    let navigate = useNavigate();
    
    console.log(props);

    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await MemeUploadsFinder.get(`/${id}`);
                console.log(response.data.data.memes);
                setFilename(response.data.data.memes.upload_filename);
                setFiletype(response.data.data.memes.file_type);

            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await MemeUploadsFinder.put(`/${id}`, {
                upload_filename: filename,
                file_type: filetype
            });
            console.log(response);
            navigate('/');
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div>
            <form action="">
                <div className="form-group">
                    <label htmlFor="filename">Filename:</label>
                    <input value={filename} onChange={(e)=>setFilename(e.target.value)} type="text" className="form-control" id="filename" />
                </div>
                <div className="form-group">
                    <label htmlFor="filetype">Filetype:</label>
                    <input value={filetype} onChange={(e)=>setFiletype(e.target.value)} type="text" className="form-control" id="filetype" />
                </div>
                <button onClick={handleSubmit} type="submit" className="btn btn-primary" id="submit" placeholder="submit">Update</button>
            </form>
        </div>
    )
}

export default UpdateMemeUpload
import React from 'react'
import { useState, useContext } from 'react'
import MemeUploadsFinder from '../apis/MemeUploadsFinder';
import { MemeUploadsContext } from '../context/MemeUploadsContext';

const AddMemeUpload = () => {
    const { addMemeUpload } = useContext(MemeUploadsContext);
    const [filename, setFilename] = useState('');
    const [filetype, setFiletype] = useState('');
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await MemeUploadsFinder.post('/', {
                upload_filename: filename,
                file_type: filetype
            });
            addMemeUpload(response.data.data.memes);
            console.log(response.data.data.memes);
        } catch (error) {
            console.log(error);
        }
    }
    return (
    <div className="mb-4">
        <form action="upload.php" method="post" encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="filename">Filename:</label>
            <input 
                value={filename} 
                onChange={e => setFilename(e.target.value)} 
                type="text" 
                className='form-control'
                name="filename" 
                id="filename" 
            />
          </div>
          <div className="form-group">
            <label htmlFor="filetype">Filetype:</label>
            <input 
                value={filetype} 
                onChange={e => setFiletype(e.target.value)} 
                type="text" 
                className="form-control" 
                id="filetype" 
                name="filetype" 
            />
          </div>
          <button onClick={handleSubmit} type="submit" className="btn btn-primary">Upload</button>
        </form>
    </div>
  )
}

export default AddMemeUpload
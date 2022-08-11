import React, { useState, createContext } from 'react';

export const MemeUploadsContext = createContext();

export const MemeUploadsContextProvider = (props) => {
    const [memeUploads, setMemeUploads] = useState([]);
    const [selectedMemeUpload, setSelectedMemeUpload] = useState(null);
    const addMemeUpload = (memeUpload) => {
        setMemeUploads([memeUpload, ...memeUploads]);
    }
    return (
        <MemeUploadsContext.Provider value={{ memeUploads, setMemeUploads, addMemeUpload, selectedMemeUpload, setSelectedMemeUpload }}>
        {props.children}
        </MemeUploadsContext.Provider>
    );
};
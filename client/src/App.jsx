import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import MemeUploadDetail from './routes/MemeUploadDetail';
import Home from "./routes/Home";
import MemeUploadUpdatePage from "./routes/MemeUploadUpdatePage";
import MemeUploadDetail from "./routes/MemeUploadDetail";
import { MemeUploadsContextProvider } from './context/MemeUploadsContext';


const App = () => {
    return (
        <MemeUploadsContextProvider>
        <div className='container'>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/meme-uploads/:id" element={<MemeUploadDetail />} />
                    <Route path="/meme-uploads/:id/update" element={<MemeUploadUpdatePage />} />
                </Routes>
            </Router>
        </div>            
        </MemeUploadsContextProvider>

    );
}

export default App;
import React, {useContext, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { MemeUploadsContext } from '../context/MemeUploadsContext';
import MemeUploadsFinder from '../apis/MemeUploadsFinder';
import Reviews from '../components/Reviews';
import AddReview from '../components/AddReview';
import StarRating from '../components/StarRating';

const MemeUploadDetail = () => {
  const {id} = useParams();
  const { selectedMemeUpload, setSelectedMemeUpload } = useContext(MemeUploadsContext);

  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await MemeUploadsFinder.get(`/${id}`);
        //console.log(response);
        setSelectedMemeUpload(response.data.data);
      } catch (error) {
        console.log(error);
      }

    }
    fetchData();
    },[]);

  return (
    <div>{selectedMemeUpload && (
      <>
      <h1 className="text-center display-1">{selectedMemeUpload.memes.upload_filename}</h1>
      <div className="text-center">
        <StarRating rating={selectedMemeUpload.memes.average_rating} />
        <span className="text-warning ml-1">
          {selectedMemeUpload.memes.count 
            ? `(${selectedMemeUpload.memes.count})`
            : "(0)"}
        </span>
      </div>
      <div className="mt-3">
        <Reviews reviews={selectedMemeUpload.reviews}/>
      </div>
      <AddReview />
      </>
    )}</div>
  )
}

export default MemeUploadDetail
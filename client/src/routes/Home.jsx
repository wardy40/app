import React from 'react'
import AddMemeUpload from '../components/AddMemeUpload'
import Header from '../components/Header'
import MemeUploadsList from '../components/MemeUploadsList'

const Home = () => {
  return (
    <div>
        <Header />
        <AddMemeUpload />
        <MemeUploadsList />
    </div>
  )
}

export default Home
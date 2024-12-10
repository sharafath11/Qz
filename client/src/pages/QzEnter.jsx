import React from 'react'
import Header from '../components/Header'
import Qz from '../components/randomQzComponents/Qz'
import { useParams } from 'react-router-dom'

const QzEnter = () => {
  const params=useParams()
  return (
    <>
     <Header/>
     <Qz params={params.cat}/>
    </>
  )
}

export default QzEnter
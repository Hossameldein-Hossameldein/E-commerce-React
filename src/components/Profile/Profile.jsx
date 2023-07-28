import React from 'react'

export default function Profile({currentUser}) {
  return <>
  
  <h2 className='text-center'>welcome {currentUser.name} </h2>
  
  </>
}

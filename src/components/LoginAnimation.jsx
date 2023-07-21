import React from 'react'
import './LoginAnimation_style.css'

function LoginAnimation() {
  return (
    <div className='loading'>
    <div className='loadcontainer'>
      <div className='loader'>
        <div className='loader--dot'></div>
        <div className='loader--dot'></div>
        <div className='loader--dot'></div>
        <div className='loader--dot'></div>
        <div className='loader--dot'></div>
        <div className='loader--dot'></div>
      </div>
    </div></div>
  )
}

export default LoginAnimation
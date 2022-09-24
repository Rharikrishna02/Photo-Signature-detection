import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Loading.css'
function Loading () {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/response')
    }, 10009)
  })
  return (
    <div className="form">
      <form>
        <div>
          <h1>We are processing your request please wait</h1>
        </div>
      </form>
    </div>
  );
}
export default Loading;
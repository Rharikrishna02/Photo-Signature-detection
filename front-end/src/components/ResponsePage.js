import React,{useEffect,useState} from "react";
import {Link} from 'react-router-dom'
import axios from "axios";
import './ResponsePage.css'
import close from './close.png'
const ResponsePage = (props) => {
	const [output,setOutput]=useState('hide');
	const [output1,setOutput1]=useState('hide');
	useEffect(()=>{
		axios.get('http://127.0.0.1:5000/response').then((response)=>{
		  console.log(response.data);
		  if(response.data==='5'){
			setOutput('show');
			setOutput1('hide');
		  }
		  else{
			setOutput1('show');
			setOutput('hide');
		  }
		  
		})
	  })
    return(
	<div className="container">
  		<form className={output}>
		  <h1>THANK YOU</h1>
		  	<div class="circle">
  				<div class="check-mark"></div>
			</div>
			<p className="separator">Your form has been submitted successfully.</p>
			<p>You will receive your hall ticket before 1week of examination.</p>
    		<div className="row">
      			<Link to='/'><button className="submition">Home</button></Link>
    		</div>
  		</form>
		<form className={output1}>
		  <h1 className="error-h1">ERROR IN FORM</h1>
		  <div className="closer">
		  <img src={close} alt="close icon"/>
		  </div>
			<p className="separator">Your application has been rejected.</p>
			<p>Upload your Profile photo and Signature correctly</p>
    		<div className="row">
      			<Link to='/'><button className="submition">Home</button></Link>
    		</div>
  		</form>
  	</div>
    );
}
export default ResponsePage;
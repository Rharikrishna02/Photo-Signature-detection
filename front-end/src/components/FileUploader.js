import React,{useState} from "react";
import storage from "./Firebase";
import './FileUploader.css'
import { ref, uploadBytesResumable,getDownloadURL} from "firebase/storage";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import axios from "axios"
import {useNavigate} from 'react-router-dom'
function FileUploader(){
  const [progress, setProgress]=useState(0);
  const [value, setValue] = useState();
  const [name,setName]=useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  var photo_file,sign_file,sign_file1;
  //uploadFile(file);
  const dataSubmit= () => {
    return checked ? setIsDisabled(true) : setIsDisabled(false);
  };
  const uploadFile = (file) =>{
 if (!file) return;
 const storageRef = ref(storage, `photo/${name}`);
const uploadTask=uploadBytesResumable(storageRef,file);
uploadTask.on("state changed",(snapshot) =>{
const prog=Math.round(
snapshot.bytesTransferred / snapshot.totalBytes *100);
setProgress(prog);
} ,(err)=>console.log(err),
()=>{
  getDownloadURL(uploadTask.snapshot.ref)
  .then( Url=> console.log(Url))
});
};
const uploadFile1 = (file) =>{
  if (!file) return;
  const storageRef = ref(storage, `sign/${name}`);
 const uploadTask=uploadBytesResumable(storageRef,file);
 uploadTask.on("state changed",(snapshot) =>{
 const prog=Math.round(
 snapshot.bytesTransferred / snapshot.totalBytes *100);
 setProgress(prog);
 } ,(err)=>console.log(err),
 ()=>{
   getDownloadURL(uploadTask.snapshot.ref)
   .then( Url=> console.log(Url))
 });
 };
 const uploadFile2 = (file) =>{
  if (!file) return;
  const storageRef = ref(storage, `sign1/${name}`);
 const uploadTask=uploadBytesResumable(storageRef,file);
 uploadTask.on("state changed",(snapshot) =>{
 const prog=Math.round(
 snapshot.bytesTransferred / snapshot.totalBytes *100);
 setProgress(prog);
 } ,(err)=>console.log(err),
 ()=>{
   getDownloadURL(uploadTask.snapshot.ref)
   .then( Url=> console.log(Url))
 });
 };
  const onCheckboxClick = () => {
    setChecked(!checked);
    return dataSubmit();
  };
  const imageUpload=(e)=>{
    console.log(e.target.files[0].name);
    photo_file=e.target.files[0];
    uploadFile(photo_file);
  }
  const imageUpload1=(e)=>{
    console.log(e.target.files[0].name);
    sign_file=e.target.files[0];
    uploadFile1(sign_file);
  }
  const imageUpload2=(e)=>{
    console.log(e.target.files[0].name);
    sign_file1=e.target.files[0];
    uploadFile2(sign_file1);
  }
  const submit_files= async(e)=>{
    try{
    axios({
        method:'POST',
        url:'http://127.0.0.1:5000/file_receiver',
        data:{
        name : name
        }
      });
      navigate('/loading');
    }
    catch(error){
      console.log(error);
    }
  }
    return(
        <div className="container">
  <form onSubmit={submit_files}>
    <h2>Government Job Exam Registration</h2>
    <div className="row">
      <h4>Your details</h4>
      <div className="input-group">
      <div className="col-3">
            <input className="effect-2" type="text" placeholder="Full Name" onChange={(e) => {setName(e.target.value);}} />
              <span className="focus-border"></span>
          </div>
      </div>
      <div className="input-group">
      <div className="col-3">
            <input className="effect-2" type="text"  placeholder="Qualification"/>
              <span className="focus-border"></span>
          </div>
      </div>
      <div className="input-group input-group-icon1">
        <PhoneInput type="text" placeholder="Mobile number" value={value} onChange={setValue}/>
      </div>
      
    </div>
    <div className="row">
      <div className="col-half">
        <h4>Date of Birth</h4>
        <div className="input-group">
          <div className="col-third">
            <input type="text" placeholder="DD"/>
          </div>
          <div className="col-third">
            <input type="text" placeholder="MM"/>
          </div>
          <div className="col-third">
            <input type="text" placeholder="YYYY"/>
          </div>
        </div>
      </div>
      <div className="col-half">
        <h4>Gender</h4>
        <div className="input-group">
          <input id="gender-male" type="radio" name="gender" value="male"/>
          <label for="gender-male">Male</label>
          <input id="gender-female" type="radio" name="gender" value="female"/>
          <label for="gender-female">Female</label>
        </div>
      </div>
    </div>
    <div className="row">
      <h4>Passport size photo</h4>
        <div>
        <input type="file" accept="image/*" onChange={imageUpload}/>
        </div>
      <div className="row">
      <div className="col-half">
      <h4>Signature</h4>
        <div>
          <input type="file" accept="image/*" onChange={imageUpload1}/>
        </div>
      </div>
      <div className="col-half">
      <h4>Confirm Signature</h4>
        <div>
          <input type="file" accept="image/*" onChange={imageUpload2}/>
        </div>
      </div>
    </div>
    </div>
    <div className="row">
      <h4>Terms and Conditions</h4>
      <div>
        <input id="terms" type="checkbox" onClick={onCheckboxClick}/>
        <label for="terms">I hereby confirm that all the above details provided by me are correct to my knowledge</label>
      </div>
    </div>
    <div className="row">
      <button className="submition" type="submit" disabled={isDisabled}>Submit</button>
    </div>
  </form>
  </div>
    );
}
export default FileUploader;
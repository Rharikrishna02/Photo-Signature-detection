import './App.css';
import FileUploader from './components/FileUploader';
import {BrowserRouter as Router,Routes, Route } from "react-router-dom";
import ResponsePage from './components/ResponsePage';
import Loading from './components/Loading.js'
function App() {
  return (
    <>
        {
        <Router>
          <Routes>
          <Route path="/" exact element={<FileUploader />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/response" element={<ResponsePage />} />
          </Routes>
        </Router>
        }
      </>
  );
}

export default App;

import pyrebase
firebaseConfig = {
  "apiKey": "AIzaSyCmElQkfPfzgnTg64dUR9rLcJXboTGVvXI",
  "authDomain": "nighteye-bf367.firebaseapp.com",
  "databaseURL": "https://nighteye-bf367-default-rtdb.firebaseio.com",
  "projectId": "nighteye-bf367",
  "storageBucket": "nighteye-bf367.appspot.com",
  "messagingSenderId": "971547841314",
  "appId": "1:971547841314:web:c6b64c7350247e92f70b7b"
};
firebase=pyrebase.initialize_app(firebaseConfig)
strage=firebase.storage()
path_on_cloud="photo/Abhindra"
strage.child(path_on_cloud).download("photo/imag.png")
print("Done")
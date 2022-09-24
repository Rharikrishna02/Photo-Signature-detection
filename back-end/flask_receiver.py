from crypt import methods
from unicodedata import name
from flask import Flask, request,jsonify
from flask_cors import CORS
import cv2
from skimage.metrics import structural_similarity as ssim
THRESHOLD = 85
import pyrebase
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades +'haarcascade_frontalface_alt.xml')
firebaseConfig = {
  "apiKey": "AIzaSyCmElQkfPfzgnTg64dUR9rLcJXboTGVvXI",
  "authDomain": "nighteye-bf367.firebaseapp.com",
  "databaseURL": "https://nighteye-bf367-default-rtdb.firebaseio.com",
  "projectId": "nighteye-bf367",
  "storageBucket": "nighteye-bf367.appspot.com",
  "messagingSenderId": "971547841314",
  "appId": "1:971547841314:web:c6b64c7350247e92f70b7b"
};
app = Flask(__name__)
print(app)
CORS(app)

def fire_base(name,cnt):
   firebase=pyrebase.initialize_app(firebaseConfig)
   strage=firebase.storage()
   path_on_cloud="photo/"+name
   strage.child(path_on_cloud).download("photo/imag.png")
   cnt+=1;
   path_on_cloud="sign/"+name
   strage.child(path_on_cloud).download("sign/imag.png")
   cnt+=1;
   path_on_cloud="sign1/"+name
   strage.child(path_on_cloud).download("sign1/imag.png")
   cnt+=1;
   return cnt

def photo_detector():
   img = cv2.imread('/home/krishnapriya/photodetection/back-end/photo/imag.png')
   gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
   faces = face_cascade.detectMultiScale(gray, 1.3, 5)
   face_cnt=len(faces)
   if face_cnt==1:
      return 1
   return 0

def match(path1, path2):
    img1 = cv2.imread(path1)
    img2 = cv2.imread(path2)
    img1 = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY)
    img2 = cv2.cvtColor(img2, cv2.COLOR_BGR2GRAY)
    img1 = cv2.resize(img1, (300, 300))
    img2 = cv2.resize(img2, (300, 300))
    cv2.waitKey(0)
    cv2.destroyAllWindows()
    similarity_value = "{:.2f}".format(ssim(img1, img2)*100)
    return float(similarity_value)

def sign_verifier():
   path1="/home/krishnapriya/photodetection/back-end/sign/imag.png"
   path2="/home/krishnapriya/photodetection/back-end/sign1/imag.png"
   result = match(path1,path2)
   if(result <= THRESHOLD):
      return 0
   else:
      return 1
@app.route('/response',methods=['GET'])
def responser():
   file1 = open("myfile.txt","r+")
   counter1=file1.read(1)
   return jsonify(counter1)

@app.route('/file_receiver', methods =['POST'])
def test():
   if request.method == 'POST':
      data = request.json['name']
      cnt=fire_base(data,0)
      cnt+=photo_detector()
      cnt+=sign_verifier()
      count=str(cnt)
      file1 = open("myfile.txt","w")
      file1.write(count)
      file1.close()
      return jsonify('show')

      
if __name__ == '__main__':
    app.run(debug = True)
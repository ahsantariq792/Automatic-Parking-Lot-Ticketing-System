import json
import os
from flask import Flask, request
import cv2
import numpy as np
import pytesseract
from flask_cors import CORS
import pymongo
from datetime import datetime
from time import strftime

# mongodb
mongo = pymongo.MongoClient("mongodb+srv://ahsan:1234@garage-system.vay66.mongodb.net/?retryWrites=true&w=majority",
                            maxPoolSize=50, connect=False)

db = pymongo.database.Database(mongo, 'vehicles')
vehicles = pymongo.collection.Collection(db, 'vehicles')

app = Flask(__name__)
CORS(app)

# path of tesseract library
pytesseract.pytesseract.tesseract_cmd = r'D:\Python\Lib\Tesseract\tesseract.exe'

cascade = cv2.CascadeClassifier("haarcascade_russian_plate_number.xml")

# image locally
UPLOAD_FOLDER = "./uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.secret_key = 'This is your secret key to utilize session in Flask'

# taking date for creating timestamp
dt = datetime.now()

# actual date and time now (For Arrival Time)
current_time = strftime("%Y-%m-%d %H:%M:%S")


def extract_num(img_filename):
    img = cv2.imread(img_filename)
    # Img To Gray
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    nplate = cascade.detectMultiScale(gray, 1.1, 4)

    # crop portion
    for (x, y, w, h) in nplate:
        wT, hT, cT = img.shape
        a, b = (int(0.02 * wT), int(0.02 * hT))
        plate = img[y + a:y + h - a, x + b:x + w - b, :]

        # make the img more darker to identify LPR
        kernel = np.ones((1, 1), np.uint8)
        plate = cv2.dilate(plate, kernel, iterations=1)
        plate = cv2.erode(plate, kernel, iterations=1)
        plate_gray = cv2.cvtColor(plate, cv2.COLOR_BGR2GRAY)
        # (thresh, plate) = cv2.threshold(plate_gray, 127, 255, cv2.THRESH_BINARY)
        (thresh, plate) = cv2.threshold(plate_gray, 150, 180, cv2.THRESH_BINARY)

        # read the text on the plate
        read = pytesseract.image_to_string(plate)
        read = ''.join(e for e in read if e.isalnum())
        stat = read[0:2]
        print("Number Plate", read)

        timems = datetime.timestamp(dt)

        # saving data in database
        vehicles.insert_one({'numberplate': read, "timems": timems, "arrival_time": current_time})

        # putting rectangle on number plate
        cv2.rectangle(img, (x, y), (x + w, y + h), (51, 51, 255), 2)
        cv2.rectangle(img, (x - 1, y - 40), (x + w + 1, y), (51, 51, 255), -1)
        cv2.putText(img, read, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 255, 255), 2)

        # showing number plate
        cv2.imshow("plate", plate)

        # replacing result image with number plate
        cv2.imwrite("images/result.png", plate)

        return read

    cv2.imshow("Result", img)
    if cv2.waitKey(0) == 113:
        exit()
    cv2.destroyAllWindows()


@app.route("/", methods=["POST"])
def upload_file():
    print("api hit")

    if request.method == "POST":
        file = request.files["file"]
        path = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
        file.save(path)
        print("api hit")
        extract_num(path)
        return "ok"


# Search Cars
@app.route("/searchcars", methods=["POST"])
def SearchCars():
    search = request.json['search']
    print(search)
    return search


# Get Details of Car
@app.route('/carsdetails', methods=["GET"])
def CarDetail(search):
    print('cardetails', search)
    x = list(vehicles.find({'numberplate': 'KL2158086'}, {'numberplate': 1, 'timems': 1, '_id': 0}))
    for i in x:
        print(x)
        print(i)
    plate = json.dumps(x)
    return plate


# Get data and search it
@app.route('/carsdetails2', methods=["GET", "POST"])
def CarDetail2():
    if request.method == "POST":
        search = request.json['search']
        print("search number plate",search)
        x = list(vehicles.find({'numberplate': search}, {'numberplate': 1, 'timems': 1, 'arrival_time': 1, '_id': 0}))
        for i in x:
            print(x)
            print(i)

        # parking time in ms (previously saved)
        time1 = x[0]['timems']

        # departure time in ms (now)
        dt2 = datetime.now()
        time2 = datetime.timestamp(dt2)

        print("time1", time1)
        print("time2", time2)

        # parked time of car
        finaltime = time2 - time1
        print("finaltime", finaltime)
        finaltimehours = (finaltime / (60 * 60));  # parked time in hours
        print("finaltime", finaltimehours)

        # actual departure time (now)
        depttime = strftime("%Y-%m-%d %H:%M:%S")

        Rate = 20

        amount = finaltimehours * Rate
        x[0].update({"deptimems": time2, 'deptime': depttime, 'carparkedtime': finaltimehours, 'totalAmount': amount})
        plate = json.dumps(x)
        vehicles.find_one_and_update({'numberplate': search}, {
            '$set': {"deptimems": time2, 'deptime': depttime, 'carparkedtime': finaltimehours,
                     'totalAmount': amount, }})
        print(plate)
        return plate


if __name__ == "__main__":
    app.run(debug=True)

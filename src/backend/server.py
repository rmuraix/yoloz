import io
from flask import Flask, render_template, send_from_directory, request, send_file
from PIL import Image
from ultralytics import YOLO

app = Flask(__name__, template_folder="../../dist")


def prediction(img):
    model = YOLO("./src/ml/tomato_weight.pt")
    return model(img)


@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")


@app.route("/api/data", methods=["POST"])
def result():
    if "image" in request.files:
        image_file = request.files["image"]
        image = Image.open(image_file)
        results = prediction(image)
        boxes = results[0].boxes
        img: Image
        for r in results:
            img_array = r.plot()
            img = Image.fromarray(img_array[..., ::-1])

        output = io.BytesIO()
        img.save(output, format="PNG")
        output.seek(0)
        return send_file(output, mimetype="image/png")


@app.route("/<path:filename>", methods=["GET"])
def resource(filename):
    return send_from_directory("../../dist", filename)


@app.route("/assets/<path:filename>", methods=["GET"])
def assets_resource(filename):
    return send_from_directory("../../dist/assets", filename)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

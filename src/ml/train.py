from ultralytics import YOLO

model = YOLO("yolov8s.pt")
# fine tuning
model.train(data="../../dataset/tomato/data.yaml", epochs=200)
# test
model = YOLO("./tomato_weight.pt")
results = model.predict("../../dataset/test", save=True, save_txt=True)

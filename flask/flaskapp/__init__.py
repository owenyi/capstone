from flask import Flask

app = Flask(__name__)
app.debug = True

@app.route("/")
def helloworld():
    return "Hello Flask World!"

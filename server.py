from flask import Flask, render_template

app = Flask(__name__, static_url_path='', static_folder='dist', template_folder='dist')
# not sure what this do: app.add_url_rule('/', 'root', lambda: app.send_static_file('index.html'))

@app.route('/')
def index():
    return render_template('index.html');

if __name__ == "__main__":
    app.run(debug=True)

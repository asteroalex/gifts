from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

# Хранилище подарков
gifts = []

@app.route('/')
def index():
    return render_template('index.html')  # Отображает HTML

@app.route('/add_gift', methods=['POST'])
def add_gift():
    data = request.json
    if not data:
        return jsonify({'error': 'Нет данных'}), 400

    gift = {
        'date': data.get('date'),
        'cost': data.get('cost'),
        'quantity': data.get('quantity'),
        'title': data.get('title'),
        'url': data.get('url'),
    }

    gifts.append(gift)
    return jsonify(gift), 201

if __name__ == '__main__':
    app.run(debug=True)

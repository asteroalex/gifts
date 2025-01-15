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

import os

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))  # Получает порт из переменной окружения или использует 5000
    app.run(host='0.0.0.0', port=port)        # Запускает сервер на всех интерфейсах
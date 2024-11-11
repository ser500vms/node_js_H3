const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const COUNTER_FILE = path.join(__dirname, 'counters.json');

// Функция для чтения счетчиков из файла
function readCounters() {
    if (fs.existsSync(COUNTER_FILE)) {
        const data = fs.readFileSync(COUNTER_FILE);
        return JSON.parse(data);
    }
    return {};
}

// Функция для записи счетчиков в файл
function writeCounters(counters) {
    fs.writeFileSync(COUNTER_FILE, JSON.stringify(counters, null, 2));
}

// Обработчик для главной страницы
app.get('/', (req, res) => {
    let counters = readCounters();
    counters['/'] = (counters['/'] || 0) + 1; // Увеличиваем счетчик для главной страницы
    writeCounters(counters); // Запваем обновленные счетчики в файл
    res.send(`<h1>Главная страница</h1><p>Количество просмотров: ${counters['/']}</p>`);
});

// Обработчик для страницы "О нас"
app.get('/about', (req, res) => {
    let counters = readCounters();
    counters['/about'] = (counters['/about'] || 0) + 1; // Увеличиваем счетчик для страницы "О нас"
    writeCounters(counters); // Записываемленные счетчики в файл
    res.send(`<h1>О нас</h1><p>Количество просмотров: ${counters['/about']}</p>`);
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
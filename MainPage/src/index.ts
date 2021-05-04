import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '../public')));

const {PORT} = process.env;

// home page
app.get('/', (req, res) => {
    res.render('pages/home');
});

// kham pha
app.get('/kham-pha', (req, res) => {
    res.render('pages/news');
});

// kham pha detail
app.get('/detail', (req, res) => {
    res.render('pages/news-detail');
});

// insa facebook
app.get('/insa-facebook', (req, res) => {
    res.render('pages/social');
});

// insa pos
app.get('/insa-pos', (req, res) => {
    res.render('pages/pos');
});

// insa web
app.get('/insa-website', (req, res) => {
    res.render('pages/web');
});

// insa shopee
app.get('/insa-shopee', (req, res) => {
    res.render('pages/ecom');
});

// insa contact
app.get('/lien-he', (req, res) => {
    res.render('pages/contact');
});

// price
app.get('/bao-gia', (req, res) => {
    res.render('pages/price');
});

app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
});

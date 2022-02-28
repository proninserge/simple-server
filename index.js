const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const posts = require('./posts.json');

const app = express();

app.use(bodyParser.json(), cors());

app.post('/login', (req, res) => {
    const token = jwt.sign({user: 'user name', admin: true}, 'secretstring', {expiresIn: '5d'});
    try {
        if (!(req.body.email === 'test@gmail.com' && req.body.password === '123456')) {
            throw new Error('This user not found');
        }
        res.status(200).send({accessToken: token});
    } catch (e) {
        res.status(400).send('User not found');
        console.log(e);
    }
});

app.get('/articles', (req, res) => {
    res.send(posts);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`app listening to port ${port}`)
});
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const game = require('./game/data');

app.use(express.static('public'))

app.get('/api/game', (req,res)=> {
    res.send({msg:'Message from the game api!'});
});

app.get('/game/start', (req, res)=> {
    res.send(game.start);
});

app.get('/game/loc/:id', (req, res)=> {
    let room = req.params.id;
    if (room) {
        res.send(game[room]);
    } else {
        res.send({error: 'This location does not exist'});
    }
});

app.listen(PORT, ()=> {
    console.log('app listening on port %s', PORT);
});


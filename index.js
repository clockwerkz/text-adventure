const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'))

app.get('/api/game', (req,res)=> {
    res.send({msg:'Message from the game api!'});
});

app.listen(PORT, ()=> {
    console.log('app listening on port %s', PORT);
});


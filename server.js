const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + '/dist/projet'));


app.listen(PORT);

// PathLocationStrategy
app.get('/*', function(req, res) {

    res.sendFile(path.join(__dirname + '/dist/projet/index.html'));

})

console.log('Console listening!');
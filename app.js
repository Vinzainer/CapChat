var express = require('express');
var fs = require('fs');
var unzip = require('unzip')
const fileUpload = require('express-fileupload');
var app = express();

app.use(express.static('public'));
app.use(fileUpload());
app.set('view engine', 'ejs');

app.get('/',function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('index.html', function (err,data) {
        res.end(data);
    });
});

app.get('/test',function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('test.html', function (err,data) {
        res.end(data);
    });
});

app.get('/generate',function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('generate.html', function (err,data) {
        res.end(data);
    });
});

app.post('/generate', (req, res) => {
    if (req.files) {
        const name = req.body.nom
        const category = req.body.categorie
        const neutres = req.files.neutres
        const singuliers = req.files.singuliers

        console.log(name)
        console.log(category)

        var dir = `${__dirname}/store`

        neutres.mv(dir + "/neutres/" + neutres.name)

        singuliers.mv(dir + "/singuliers/" + singuliers.name)

        fs.createReadStream(dir + "/neutres/" + neutres.name).pipe(unzip.Extract({ path: dir + "/neutres/" }));

        res.send("Upload successful")
    } else {
        res.send('There are no files')
    }
})

app.listen(8080);
console.log('Server running at http://127.0.0.1:8080/');

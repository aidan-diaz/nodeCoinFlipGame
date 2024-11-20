const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const server = http.createServer(function(req, res) {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/api') {
    if('choice' in params){
      if(params['choice'] == 'heads' || params['choice'] == 'tails'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        //make the server pick a random heads or tails obj from the array and return it
        const serverChoice = randomCoinFlip[Math.floor( Math.random() * 2 )]
        res.end(JSON.stringify(serverChoice));
      }
      else if(params['choice'] !== 'heads' || params['choice'] !== 'tails'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        const serverChoice = randomCoinFlip[2]
        res.end(JSON.stringify(serverChoice));
      }
    }
  }
  else if (page == '/css/style.css'){
    res.writeHead(200, {'Content-Type': 'text/css'});
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
  }else if (page == '/js/main.js'){
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }else if (page == '/css/assets/coinHeads.jpg') {
    res.writeHead(200, {'Content-Type': 'image/jpg'});
    fs.readFile('css/assets/coinHeads.jpg', function(err, data) {
        if (err) {
            res.writeHead(404);
            res.end("File not found");
        } else {
            res.write(data);
            res.end();
        }
    });
} else if (page == '/css/assets/coinTails.jpg') {
    res.writeHead(200, {'Content-Type': 'image/jpg'});
    fs.readFile('css/assets/coinTails.jpg', function(err, data) {
        if (err) {
            res.writeHead(404);
            res.end("File not found");
        } else {
            res.write(data);
            res.end();
        }
    });
}else if (page == '/css/assets/coinTails.jpg') {
    res.writeHead(200, {'Content-Type': 'image/jpg'});
    fs.readFile('css/assets/coinTails.jpg', function(err, data) {
        if (err) {
            res.writeHead(404);
            res.end("File not found");
        } else {
            res.write(data);
            res.end();
        }
    });
}else{
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8383);


const randomCoinFlip = 
[
  {
    status: 'success',
    decision: 'heads'
  }, 

  {
    status: 'success',
    decision: 'tails'
  },
  {
    status: 'error',
    decision: 'please enter heads or tails.'
  }
]
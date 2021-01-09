const fs = require('fs');

const requestHandler = (req, res) => {
   const url = req.url;
   const method = req.method;

   if(url === '/') {
      res.write('<html>');
      res.write('<head><title>Node Practice</title></head>');
      res.write('<body><form action="/create-users" method="POST"><input type="text" name="username"><button type="submit">Submit</button><form></body>')
      res.write('</html>');
      return res.end();
   }

   if(url === 'users') {
      res.write('<html>');
      res.write('<head><title>Node Practice</title></head>');
      res.write('<body><ul><li>Tegar Pratama</li><li>Zalvava</li><li>Nabila Muthia</li></ul></body>')
      res.write('</html>');
      return res.end();
   }

   if(url === '/create-users' && method === 'POST') {
      const body = [];
      req.on('data', (chunk) => {
         console.log(chunk);
         body.push(chunk);
      });

      return req.on('end', () => {
         const parsedBody = Buffer.concat(body).toString();
         console.log(parsedBody.split('=')[1]);
      });

      res.statusCode = 302;
      res.setHeader('Location', '/');
      res.end();
   }
};

module.exports = requestHandler;
const express = require('express');

const app = express();

app.use('/', express.static('src/html'));
app.use('/bundled', express.static('bundled'));

app.listen(3000, (err) => {
  if (!err) {
    console.log('Server listening on port 3000.  Navigate to http://localhost:3000/');
  }
});

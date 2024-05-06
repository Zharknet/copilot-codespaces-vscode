// Create web server
// Import express module
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

// Create express application
const app = express();

// Use body-parser middleware
app.use(bodyParser.json());

// Create a route to handle POST requests to /comments endpoint
app.post('/comments', (req, res) => {
  // Read the comments.json file
  fs.readFile('./comments.json', 'utf8', (err, data) => {
    // If there is an error, send a 500 status code
    if (err) {
      return res.sendStatus(500);
    }

    // Parse the data
    const comments = JSON.parse(data);

    // Add the new comment to the comments array
    comments.push(req.body);

    // Write the comments array back to the comments.json file
    fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
      // If there is an error, send a 500 status code
      if (err) {
        return res.sendStatus(500);
      }

      // Send a 201 status code
      res.sendStatus(201);
    });
  });
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
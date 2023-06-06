const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const folderPath = '/newFolder'; // Replace with the actual folder path

// API endpoint to create a text file with the current timestamp
app.post('/createFile', (req, res) => {
  const currentDate = new Date().toISOString().split('T')[0];
  const fileName = `${currentDate}.txt`;
  const filePath = path.join(folderPath, fileName);
  const fileContent = new Date().toString();

  fs.writeFile(filePath, fileContent, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Failed to create file');
    } else {
      console.log(`File ${fileName} created successfully`);
      res.send('File created successfully');
    }
  });
});

// API endpoint to retrieve all text files in the folder
app.get('/getFiles', (req, res) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).send('Failed to read folder');
    } else {
      const textFiles = files.filter((file) => file.endsWith('.txt'));
      res.send(textFiles);
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

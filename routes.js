// routes.js
const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const fs = require("fs");
const GoogleDriveHelper = require('./helper/googleDrive.helper');

const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];

function authorize() {
  const credentials = require('./credentials.json'); // Path to your Google API credentials
  const { client_secret, client_id, redirect_uri } = credentials;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uri[0]);

  return new Promise((resolve, reject) => {
    fs.readFile('token.json', (err, token) => {
      if (err) {
        reject("error while reading token token.json file")
      }
      oAuth2Client.setCredentials(JSON.parse(token));
      resolve(oAuth2Client);
    });
  });
}



router.get('/files', async (req, res) => {
  try {
    const auth = await authorize();
    const files = await GoogleDriveHelper.listFiles(auth);
    res.json(files);
  } catch (error) {
    console.error('Error listing files', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/download/:fileId', async (req, res) => {
  try {
    const auth = await authorize();
    const fileId = req.params.fileId;
    const downloadedFile = await GoogleDriveHelper.downloadFile(auth, fileId);
    res.send(downloadedFile);
  } catch (error) {
    console.error('Error downloading file', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/fileUsers/:fileId', async (req, res) => {
  try {
    const auth = await authorize();
    const fileId = req.params.fileId;
    const usersWithAccess = await GoogleDriveHelper.listFileUsers(auth, fileId);
    res.json(usersWithAccess);
  } catch (error) {
    console.error('Error listing file users', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;

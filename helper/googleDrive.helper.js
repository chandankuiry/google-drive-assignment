// googleDrive.helper.js
const fs = require('fs');
const { google } = require('googleapis');
const drive = google.drive('v3');

class GoogleDriveHelper {
  static async listFiles(auth) {
    const response = await drive.files.list({
      auth,
      pageSize: 10,
      fields: 'nextPageToken, files(id, name)',
    });

    const files = response.data.files;
    return files;
  }

  static async downloadFile(auth, fileId) {
    const response = await drive.files.get(
      { fileId, alt: 'media' },
      { responseType: 'stream', auth }
    );

    const dest = fs.createWriteStream('downloadedFile.txt');
    response.data
      .on('end', () => console.log('File downloaded successfully'))
      .on('error', (err) => console.error('Error downloading file', err))
      .pipe(dest);

    return 'Downloaded file!';
  }

  static async listFileUsers(auth, fileId) {
    const response = await drive.permissions.list({ auth, fileId });

    const usersWithAccess = response.data.permissions.map((permission) => {
      return {
        id: permission.id,
        email: permission.emailAddress,
      };
    });

    return usersWithAccess;
  }
}

module.exports = GoogleDriveHelper;

# Google Drive API Integration

## Prerequisites
Before running the project, make sure you have the following:

1. **Google API Credentials:**
   - Visit the [Google Cloud Console](https://console.cloud.google.com/).
   - Create a new project.
   - Enable the Google Drive API for your project.
   - Create OAuth 2.0 credentials and download the `credentials.json` file.
   - Save the `credentials.json` file in the project root.

2. **Node.js and npm:**
   - Install Node.js and npm on your machine.

## Package Installation
Install the required npm packages by running the following command:
```bash
    npm install
```

## Run project
Start the server by running:

```bash
npm start
```

The server will run on http://localhost:3000. Make sure to configure your Google API credentials as mentioned in the Prerequisites section.

## APIs
1. **List Files:**

 **Endpoint:**
     /files
**Method:**
     GET
**Description:**
     Lists files available in the connected Google Drive.


2. **Download File**

**Endpoint:**
    /download/:fileId
**Method:**
    GET
**Description:**
    Downloads a specific file from Google Drive.
**Parameters:**
    fileId (required): The ID of the file to be downloaded.



3. **List File Users**

**Endpoint:**
    /fileUsers/:fileId
**Method:**
    GET
**Description:**
    Lists all users with access to a specific file.
**Parameters:**
    fileId (required): The ID of the file.


### Conclusion
This project demonstrates basic integration with the Google Drive API, including listing files, downloading files, and monitoring real-time changes in file access.

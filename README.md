# Basic ExpressJS  Authentication System

#### An ExpressJS API Gateway that takes care of the following:

- Accept User Information
- Check User Information
- Save user in the MongoDB database
- Login user by verifying credentials
- Return appropriate response

#### Requirements
- NodeJS >= 16.13.x
- NPM >= 8.13.x
- MongoDB URI. [Click here](https://www.mongodb.com/docs/guides/atlas/connection-string/) for the instruction to setup a free online MongoDB Atlas account. You can use local MongoDB as well.

#### Setup
1. Browse to the directory `basic-authentication-template` and open the `.env` file in any text editor. Make the following changes. Replace `<Paste your MongoDB URI>` with MongoDB URI 

> MONGODB_URI=\<Paste your MongoDB URI here> 

2. Open command line (Cmd/Powershell/Terminal).
3. Navigate to your current workspace. i.e. basic-authentication-template folder.
4. Enter the following commands:
> npm install
> npm start
5. Now you have an ExpressJS application running at port 3000 by default unless you have specified any other port in the `.env` file.


#### Endpoints

**Default BaseURL on localhost**:`http://localhost:3000`

1. **POST /signup**

    Input Fields:
    - fname : string,
    - lname : string,
    - email : string,
    - password: string
    
    Output format:
    {
        status: 'sucess'/'failed',
        _id/error: Return objectID of user if successful and error details if it fails
    }


2. **POST /login**
    
    Input Fields:
    - email : string,
    - password: string
    
    Output format:
    {
        status: 'sucess'/'failed',
        _id/error: Return objectID of user if successful and error details if it fails
    }


#### Postman Collection

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/11043007-c50a84c6-9438-44fe-9a05-773e910e4ded?action=collection%2Ffork&collection-url=entityId%3D11043007-c50a84c6-9438-44fe-9a05-773e910e4ded%26entityType%3Dcollection%26workspaceId%3D2d9beaf4-8093-416d-98fb-e5b8bffe85ce#?env%5Bdevelopment%5D=W3sia2V5IjoiYmFzZVVSTCIsInZhbHVlIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6ImRlZmF1bHQiLCJzZXNzaW9uVmFsdWUiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJzZXNzaW9uSW5kZXgiOjB9XQ==)


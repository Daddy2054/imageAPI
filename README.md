# Image Processing API

Udacity Nanodegree: Full Stack Javascript Developer
chapter: Backend Development with Node.js author:daddy2054

## Application Architecture

An API endpoint for resizing images, using express.js as server.
with request to endpoint, resized file is written to thumbnail folder.

## How to Deploy

```
$ git clone https://github.com/Daddy2054/imageAPI.git
$ cd imageAPI
$ npm install
$ npm run build
$ npm run start
```

## API Endpoint

The API exposes 1 REST API endpoint:

| **Endpoint**      | **Description**                    | **Parameters**                                                  |
| ----------------- | ---------------------------------- | --------------------------------------------------------------- |
| `GET /api/images` | Activates serverside image resizer | ?filename="file name"&width="width in px"&height="height in px" |

## Invocation

 ### default config:

 server: http://localhost:3000
 endpoint: /api/images
 parameters:
 filename=sammy.png (already provided in input folder)
 width=100 (size in px)
 height=100 (size in px)
```
http://localhost:3000/api/images/?filename=sammy.png&width=100&height=100
```
## How to use

1. drop image file in folder "assets/full"
2. make an request to an endpoint with correct parameters
3. Find resized file in folder "assets/thumbnail"
4. In case the resized file already exists, it will be in the response, without invocation of resizing function.
5. in case the user's error, status code 400 will be returned with error message shown to the user.

## How to test

```
$ npm run test
$ npm run prettier
$ npm run lint
```

### What is tested

1. endpoint: "/api"
2. endpoint "/api/images"
3. parameters missing
4. image processing
5. processing error for wrong file type (package.json, already in folder)
6. error for file do not exist

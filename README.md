# Angular-Fullstack Image Upload Example

This is an example of how to post an image from the client to the server with Yeoman and the angular-fullstack generator. Some of the challenges involeded in doing this is that the angular app appends a security token on all the requests, which means you cannot just post to the endpoint with a form. You need to use angular. Added a directive and a service to handle angular side of post.
For more details visit this [blog post](https://uncorkedstudios.com/blog/multipartformdata-file-upload-with-angularjs)

The server uses multer to save the image, and has a custom Storage Engine to Save the file to disk.

### Images located at
````
/client/assets/images/

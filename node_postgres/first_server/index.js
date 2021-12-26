const http = require('http');
//creates a server on the http(hyper text transfer protocall) format
const hostname = 'localhost';
//hostname allows us to identify the server on different web apps eg. youtube.com ect..
const port = 3000;
//portnumber for the server to shkow running processes
const server = http.createServer((request ,response) => {
    const {url} = request;
    console.log(url);

    if(url === "/translations") {
        response.end("Your on translations");
    }

    if(url === "/testEndPoint"){
        response.end("Your on test endpoint");
    }
    response.end('Welcome to Node!');
})
//createServer is a function to handle incoming request from the client and give back a response
server.listen(port, hostname, () => {
    console.log(`Server running at ${hostname}: ${port}`);
});
//starts a server up to listen to requests by providing our specified port and hostname

# Multi Container App

- Client
- Server
- Worker


### Tech 
- React
- Postgres
- Redis
- Nginx


#### Nginx
Create a folder ngnix and create a file `default.conf`
- Tell Nginx that there is an 'upstream server' at client:3000 and api:5000.
- `client` is the same name as we have in decker compose file, same for `api`. 
- We would expose port 80.
- If anyone comes for '/' send them to client upstream
- if anyone goes to '/api' send to api upstream
- we rewrite the incoming request and remove the '/api' from it.
- Then create a new docker file to configure the nginx.
- For hot reload we need to configure nginx to allow websocket to web devserver  
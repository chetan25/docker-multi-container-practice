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

#### Travis
- Add your docker logins to your Travis account for the repository.
- Than we will login using a single line command into docker
    `echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_ID" --password-stdin`
- Travis on every push to master will build our test react app and run test.
- Build our docker image for all our apps.
- Than push them to docker hub.

#### AWS Elastic BeanStalk
- We will create a 'Dockerrun.aws.josn' file that will tell AWS where to pul our images, what resources to allocate, how to setup port mapping, etc.
- This is similar to docker-compose for local development.
- It uses Elastic container service(ECS) to run container.
- ECS has task definiton file, that tells how to run the container.
- `essential` in the container definition file means, the containe is essential, so if that crashes, close all other containers automatically.
- At least one container have to be marked as "essential".
- In order for EB to talk to RDS(Postgress) and EC(Redis) inside a VPC, we would create security group and asssing to them, and set a security rule saying "Allow any traffic from any ither AWS service that belong to that group"
- 

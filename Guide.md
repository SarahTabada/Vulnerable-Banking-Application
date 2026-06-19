# Quick guide to actually running everything
This details a quick guide to running the full project

## Main steps
Install Docker - look on website
Run the docker command
Application will now run on localhost (simply type "localhost" in url)

## Docker Commands

### Reset and New Run of Everything
```
docker compose down -v --rmi all; docker compose build; docker compose up -d
add --no-cache to build to really rebuild everything
```
This removes the old volumes(DB), builds everything from the images, and spins everything up

### Just run everyhting without the reset
```
docker compose up -d
```

### Just rebuild the code
```
docker compose build; docker compose up -d
```

### Rebuild 1 Service
```
docker compose up -d --no-deps --build <service_name>
```

## Coding

The application is segmented into two main parts (minus the MySQL and traefik folder which contain minimal configuration)
 - Frontend
 - Flask Backend (SQL people go here because ORM)
Each has their own guide for what is there and the uses of each folder 

### Testing

Since docker takes like 30 seconds to spin up, it is better to write/run test cases since that is good practice anyway. Test cases are simple to write I promise. Also you can easily check which fail and which succeed <br>
Please write tests after completing a page/api call in the testing folders to ensure everything works properly <br>
Please please please this will make life 100% easier.

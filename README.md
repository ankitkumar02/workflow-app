Username: test

Password: test

npm install

npm start

docker build -f Dockerfile.prod -t workflow-app:v1 .

docker run -it -p 1234:80 --rm workflow-app:v1

docker build -f Dockerfile.prod -t my-app:v1 .

docker tag my-app:v1 791974319924.dkr.ecr.us-east-1.amazonaws.com/my-app:v1

docker push 791974319924.dkr.ecr.us-east-1.amazonaws.com/my-app:v1

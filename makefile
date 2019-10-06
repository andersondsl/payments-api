build:
	docker-compose -f ./swagger/docker-compose.yaml up -d && docker-compose up -d && docker-compose ps

down: 
	docker-compose -f ./swagger/docker-compose.yaml down && docker-compose down

cd api
docker build -t storyline_api . 
docker tag storyline_api:latest crshlab/storyline_api:0.1.0
docker push crshlab/storyline_api:0.1.0

# docker tag storyline_front:latest crshlab/storyline_front:latest
# docker push crshlab/storyline_front:latest
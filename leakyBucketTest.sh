#!/bin/bash

# Start the server
# node index.js &

# Wait for the server to start up
# sleep 2

REQ=9

for (( i = 0 ; i<$REQ ; i++ )); do
    curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/leakyBucket
done


# if [ "$http_code" == "429" ]; then
#   echo "Rate limiting is working"
# else
#   echo "Rate limiting is not working"
# fi

# Wait for the token bucket to refill
# sleep 5

# # Send another request (should succeed)
# http_code=$(curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/tokenBucket)
# if [ "$http_code" == "200" ]; then
#   echo "Rate limiting has reset"
# else
#   echo "Rate limiting is not working"
# fi

sleep 5
# Stop the server
kill $(lsof -t -i:3000)
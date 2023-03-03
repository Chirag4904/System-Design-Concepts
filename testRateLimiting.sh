#!/bin/bash

# Start the server
node index.js &

# Wait for the server to start up
sleep 2

# Send the first two requests (should succeed)
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/

# Send the third request (should be rate limited)
http_code=$(curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/)
if [ "$http_code" == "429" ]; then
  echo "Rate limiting is working"
else
  echo "Rate limiting is not working"
fi

# Wait for the token bucket to refill
sleep 5

# Send another request (should succeed)
http_code=$(curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/)
if [ "$http_code" == "200" ]; then
  echo "Rate limiting has reset"
else
  echo "Rate limiting is not working"
fi

sleep 3
# Stop the server
kill $(lsof -t -i:3000)
(curl localhost:8080/v1/updateContext -s -S --header 'Content-Type: application/json' --header 'Accept: application/json' -d @- | python -mjson.tool) <<EOF
{
  "contextElements": [
    {
      "type": "Room",
      "isPattern": "false",
      "id": "Inventing Room",
      "attributes": [
      {
        "name": "River level",
        "type": "integer",
        "value": "50"
      }
      ]
    }
  ],
  "updateAction": "APPEND"
}
EOF
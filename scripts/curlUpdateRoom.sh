(curl localhost:8080/v1/updateContext -s -S --header 'Content-Type: application/json' --header 'Accept: application/json' -d @- | python -mjson.tool) <<EOF
{
  "contextElements": [
    {
      "type": "Room",
      "isPattern": "false",
      "id": "Inventing Room",
      "attributes": [
      {
        "name": "Temperature",
        "type": "float",
        "value": "24"
      },
      {
        "name": "Pressure",
        "type": "integer",
        "value": "750"
      },
      {
        "name": "Experimental Chewing Gum size",
        "type": "float",
        "value": "23"
      },
      {
        "name": "Experiments volatility",
        "type": "string",
        "value": "medium"
      },
      {
        "name": "Occupation",
        "type": "integer",
        "value": "100"
      }
      ]
    }
  ],
  "updateAction": "APPEND"
}
EOF
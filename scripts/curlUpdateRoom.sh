(curl localhost:8080/v1/updateContext -s -S --header 'Content-Type: application/json' --header 'Accept: application/json' -d @- | python -mjson.tool) <<EOF
{
    "contextElements": [
        {
            "type": "Room",
            "isPattern": "false",
            "id": "Chocolate Room",
            "attributes": [
              {
                "name": "temperature",
                "type": "float",
                "value": "25"
            },
            {
                "name": "pressure",
                "type": "integer",
                "value": "775"
            },
           {
               "name": "river_level",
               "type": "string",
               "value": "low"
            },
            {
               "name": "waterfall_speed",
               "type": "float",
               "value": "25"
            }
           ]
       }
   ],
    "updateAction": "UPDATE"
}
EOF
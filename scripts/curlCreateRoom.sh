(curl localhost:8080/v1/updateContext -s -S --header 'Content-Type: application/json' --header 'Accept: application/json' -d @- | python -mjson.tool) <<EOF
{
    "contextElements": [
        {
            "type": "Transportation",
            "isPattern": "false",
            "id": "Elevator",
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
                "name": "Floor",
                "type": "integer",
                "value": "1"
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
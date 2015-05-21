(curl localhost:8080/v1/updateContext -s -S --header 'Content-Type: application/json' --header 'Accept: application/json' -d @- | python -mjson.tool) <<EOF
{
    "entities": [
        {
            "type": "Room",
            "isPattern": "false",
            "id": "Chocolate Room"
        }
    ],
    "attributes": [
        "temperature",
        "pressure",
        "river_level",
        "waterfall_speed"
    ],
    "reference": "http://138.4.7.25:1028/contextResponse",
    "duration": "P1M",
    "notifyConditions": [
        {
            "type": "ONCHANGE",
            "condValues": [
                "Temperature",
                "Pressure",
                "River level",
                "Waterfall speed",
            ]
        }
    ],
    "throttling": "PT5S"
};
EOF
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
                "value": 0
            },
            {
                "name": "Pressure",
                "type": "integer",
                "value": 0
            },
            {
                "name": "Experimental Chewing Gum size",
                "type": "float",
                "value": 0.0
            },
            {
                "name": "Experiments volatility",
                "type": "string",
                "value": "xxxx"
            },
            {
                "name": "Occupation",
                "type": "integer",
                "value": 0
            }
           ]
       }
   ],
    "updateAction": "APPEND"
}
EOF

(curl localhost:8080/v1/updateContext -s -S --header 'Content-Type: application/json' --header 'Accept: application/json' -d @- | python -mjson.tool) <<EOF
{
    "contextElements": [
        {
            "type": "Room",
            "isPattern": "false",
            "id": "Chocolate Room",
            "attributes": [
              {
                "name": "Temperature",
                "type": "float",
                "value": 0
            },
            {
                "name": "Pressure",
                "type": "integer",
                "value": 0
            },
            {
                "name": "Waterfall speed",
                "type": "float",
                "value": 0.0
            },
            {
                "name": "River level",
                "type": "integer",
                "value": "0"
            },
            {
                "name": "Occupation",
                "type": "integer",
                "value": 0
            }
           ]
       }
   ],
    "updateAction": "APPEND"
}
EOF


(curl localhost:8080/v1/updateContext -s -S --header 'Content-Type: application/json' --header 'Accept: application/json' -d @- | python -mjson.tool) <<EOF
{
    "contextElements": [
        {
            "type": "Room",
            "isPattern": "false",
            "id": "Television Room",
            "attributes": [
              {
                "name": "Temperature",
                "type": "float",
                "value": 0
            },
            {
                "name": "Pressure",
                "type": "integer",
                "value": 0
            },
            {
                "name": "TVs on",
                "type": "integer",
                "value": 0
            },
            {
                "name": "Power consumed",
                "type": "float",
                "value": "0.0"
            },
            {
                "name": "Occupation",
                "type": "integer",
                "value": 0
            }
           ]
       }
   ],
    "updateAction": "APPEND"
}
EOF

(curl localhost:8080/v1/updateContext -s -S --header 'Content-Type: application/json' --header 'Accept: application/json' -d @- | python -mjson.tool) <<EOF
{
    "contextElements": [
        {
            "type": "Room",
            "isPattern": "false",
            "id": "Willy wonka office",
            "attributes": [
              {
                "name": "Temperature",
                "type": "float",
                "value": 0
            },
            {
                "name": "Pressure",
                "type": "integer",
                "value": 0
            },
            {
                "name": "Occupation",
                "type": "integer",
                "value": 0
            }
           ]
       }
   ],
    "updateAction": "APPEND"
}
EOF

(curl localhost:8080/v1/updateContext -s -S --header 'Content-Type: application/json' --header 'Accept: application/json' -d @- | python -mjson.tool) <<EOF
{
    "contextElements": [
        {
            "type": "Room",
            "isPattern": "false",
            "id": "Big hall",
            "attributes": [
              {
                "name": "Temperature",
                "type": "float",
                "value": 0
            },
            {
                "name": "Pressure",
                "type": "integer",
                "value": 0
            },
            {
                "name": "Occupation",
                "type": "integer",
                "value": 0
            }
           ]
       }
   ],
    "updateAction": "APPEND"
}
EOF

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
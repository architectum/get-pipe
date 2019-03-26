- ### -
    **GET** [/api/v4/patients/**{{**` patientId `**}}**/treatments](http://34.245.46.125/api/v4/patients/{{patientId}}/treatments)

- ### -
    **GET** [/api/v4/patients/**{{**` patientId `**}}**/treatments/**{{**` treatmentId `**}}**](http://34.245.46.125/api/v4/patients/{{patientId}}/treatments/{{treatmentId}})

- ### -
    **POST** [/api/v4/patients/**{{**` patientId `**}}**/treatment/full](http://34.245.46.125/api/v4/patients/{{patientId}}/treatment/full)
    >### Payload 
    ```js
    {
        "title": "Some treatmentqqq",
        "prescriptions": [
            {
                "title": "survey",
                "type": "survey",
                "data": {
                    "questions": [{
                        "title": "do you believe in mighty power rangers?",
                        "type": "survey",
                        "required": false
                    }]
                },
                "notifications": {
                    "mood": 1,
                    "status": "alive"
                },
                "start": "2019-01-13 00:00:00",
                "end": "2019-01-25 00:00:00",
                "frequency": {
                    "type": "weekly",
                    "days": [
                        {
                            "day": 1,
                            "schedule": [
                                { "time": "12:00" }
                            ]
                        },
                        {
                            "day": 2,
                            "schedule": [
                                { "time": "12:00" }
                            ]
                        },
                        {
                            "day": 3,
                            "schedule": [
                                { "time": "12:00" }
                            ]
                        }
                    ]
                }
            },
            {
                "title": "Nice text",
                "type": "text",
                "data": {
                    "text": "HGello doge. Whatja sodj ;ghi jao;'s are you?"
                },
                "start": "2019-01-10 00:00:00",
                "end": "2019-01-25 00:00:00",
                "frequency": {}
            }
        ]
    }
    ```

## Doctor:
- ### All treatments of patient
    **GET** [/api/v4/patients/**{{**` patientId `**}}**/treatments](https://get-pipe.ivanets.now.sh/api/v4/patients/{{patientId}}/treatments)

- ### Exact treatment
    **GET** [/api/v4/patients/**{{**` patientId `**}}**/treatments/**{{**` treatmentId `**}}**](https://get-pipe.ivanets.now.sh/api/v4/patients/{{patientId}}/treatments/{{treatmentId}})

- ### Create treatment
    **POST** [/api/v4/patients/**{{**` patientId `**}}**/treatment/full](https://get-pipe.ivanets.now.sh/api/v4/patients/{{patientId}}/treatment/full)
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


## Patient:

- ### All treatments for patient
    **GET** [/api/v4/profile/treatments](https://get-pipe.ivanets.now.sh/api/v4/profile/treatments)

- ### Patient creates treatment for himself
    **POST** [/api/v4/profile/treatments](https://get-pipe.ivanets.now.sh/api/v4/profile/treatments)
    >### Payload 
    ```js
    {
        "title": "Some treatmentqqq",
        "prescriptions": [
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

- ### Patient creates treatment for himself
    **POST** [/api/v4/profile/template](https://get-pipe.ivanets.now.sh/api/v4/profile/template)
    >### Payload 
    ```js
    {
        "title": "TEST TREATMENT",
        "saveAsTemplate": true,
        "prescriptions": [
            {
                "title": "survey",
                "type": "survey",
                "data": {
                    "questions": [{
                        "title": "what?",
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
                    "text": "1312321312321"
                },
                "start": "2019-01-10 00:00:00",
                "end": "2019-01-25 00:00:00",
                "frequency": {}
            }
        ]
    }
    ```
    ### Response
    ```js
    {
        "data": {
            "id": "0ea0d3fb-d8ec-4961-89cf-be3891424d43",
            "starred": false,
            "started": false,
            "version": 0,
            "title": "TEST TREATMENT",
            "folder": "5c503f8a757b1f7439bcf9e0",
            "prescribedBy": "3bdcd4c3-b29c-4bc9-828f-49a1dc62f34d",
            "updatedAt": "2019-03-17T05:27:03.606Z",
            "createdAt": "2019-03-17T05:27:03.606Z"
        }
    }
    ```


- ### Patient creates treatment for himself
    **POST** [/api/v4/profile/templates?folder=:id](https://get-pipe.ivanets.now.sh/api/v4/profile/templates)
    >### Query
    ```js
    {}
    ```
    
    ### Response
    ```js
    {
        "data": [
            {
                "id": "0ea0d3fb-d8ec-4961-89cf-be3891424d43",
                "title": "Some treatmentqqq",
                "star": false,
                "started": false,
                "created": "2019-03-18 05:27:03"
            }
        ]
    }
    ```
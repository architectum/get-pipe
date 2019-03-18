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


- ### All treatments for patient
    **GET** [/api/v4/profile/treatments](https://get-pipe.ivanets.now.sh/api/v4/profile/treatments)





- ### Patient creates treatment for himself
    **POST** [/api/v4/profile/templates/**{{**` templateId `**}}**](https://get-pipe.ivanets.now.sh/api/v4/profile/templates/0ea0d3fb-d8ec-4961-89cf-be3891424d43)
    >### Payload 
    ```js
    {
        "data": {
            "template": {
                "id": "0ea0d3fb-d8ec-4961-89cf-be3891424d43",
                "title": "Some treatmentqqq",
                "star": false,
                "started": false,
                "created": "2019-03-18 05:27:03",
                "prescriptions": [
                    {
                        "title": "survey",
                        "type": "weekly",
                        "data": {
                            "questions": [
                                {
                                    "title": "do you believe in mighty god?",
                                    "type": "survey",
                                    "required": false
                                }
                            ]
                        },
                        "start": "2019-01-13 00:00:00",
                        "end": "2019-01-25 00:00:00",
                        "repeats": null,
                        "treatment": "0ea0d3fb-d8ec-4961-89cf-be3891424d43",
                        "days": [
                            {
                                "day": 1,
                                "schedule": [
                                    {
                                        "time": "12:00"
                                    },
                                    {
                                        "time": "12:00"
                                    },
                                    {
                                        "time": "12:00"
                                    }
                                ]
                            },
                            {
                                "day": 2,
                                "schedule": [
                                    {
                                        "time": "12:00"
                                    },
                                    {
                                        "time": "12:00"
                                    },
                                    {
                                        "time": "12:00"
                                    }
                                ]
                            },
                            {
                                "day": 3,
                                "schedule": [
                                    {
                                        "time": "12:00"
                                    },
                                    {
                                        "time": "12:00"
                                    },
                                    {
                                        "time": "12:00"
                                    }
                                ]
                            }
                        ],
                        "id": "036a28a9-307a-40dd-96a1-91ff008782cc",
                        "created": "2019-03-18 05:27:03",
                        "notifications": {
                            "mood": 1,
                            "status": "alive"
                        }
                    },
                    {
                        "title": "Nice text",
                        "type": "daily",
                        "data": {
                            "text": "HGello doge. Whatja sodj ;ghi jao;'s are you?"
                        },
                        "start": "2019-01-10 00:00:00",
                        "end": "2019-01-25 00:00:00",
                        "repeats": null,
                        "treatment": "0ea0d3fb-d8ec-4961-89cf-be3891424d43",
                        "days": [],
                        "id": "e53cfa98-e3b5-416f-a3e0-8309bea39573",
                        "created": "2019-03-18 05:27:03",
                        "notifications": {}
                    }
                ]
            }
        }
    }
    ```

- ### Doctor | create template
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


- ### Doctor | get templates by folder
    **POST** [/api/v4/profile/templates?folder=**{{**` folderId `**}}**](https://get-pipe.ivanets.now.sh/api/v4/profile/templates)
    >### Query
    ```js
    folder - folder_id
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
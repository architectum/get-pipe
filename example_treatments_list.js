module.exports = {
    "data": {
        "treatments": [
            {
                "id": "34cf27c4-3885-42ad-a9f1-2cb902cedf27",
                "patient": "18fdfc23-dcf3-4682-b1c0-9232da662078",
                "prescribedBy": "3bdcd4c3-b29c-4bc9-828f-49a1dc62f34d",
                "title": "Home visit",
                "starred": false,
                "started": false,
                "createdAt": "2019-02-26T14:19:36.744Z",
                "updatedAt": "2019-02-26T14:19:36.744Z",
                "version": 0,
                "doctor": {
                    "id": "3bdcd4c3-b29c-4bc9-828f-49a1dc62f34d",
                    "roleId": 2,
                    "countryId": 237,
                    "firstName": "Vlad",
                    "lastName": "Doctor",
                    "addressId": 87,
                    "photo": "https://new-back-storage.s3.amazonaws.com/avatars/unnamed-1549974339253-upload.jpg",
                    "appIconBadge": 0,
                    "telephoneId": "077a89c9-b47f-4f3f-bcb5-fbb0f43be12b",
                    "createdAt": "2019-02-04T12:39:38.456Z",
                    "updatedAt": "2019-02-12T12:26:15.346Z",
                    "version": 2
                },
                "prescriptions": [
                    {
                        "interval": {
                            "start": "2019-02-19T00:00:00.000Z",
                            "repeats": 1
                        },
                        "treatment": "34cf27c4-3885-42ad-a9f1-2cb902cedf27",
                        "data": {
                            "type": "homeVisit",
                            "date": "2019-02-19T12:00:00.000Z",
                            "address": "Your home"
                        },
                        "frequency": {},
                        "createdAt": "2019-02-26T14:19:36.750Z",
                        "prescribedBy": "3bdcd4c3-b29c-4bc9-828f-49a1dc62f34d",
                        "id": "40744028-33a1-490e-9fc3-64842cec25d1",
                        "title": "Appointment",
                        "type": "appointment"
                    }
                ]
            },
            {
                "id": "334ceaa0-3926-4341-94d3-acc14e405a2d",
                "patient": "18fdfc23-dcf3-4682-b1c0-9232da662078",
                "prescribedBy": "3bdcd4c3-b29c-4bc9-828f-49a1dc62f34d",
                "title": "Call",
                "starred": false,
                "started": false,
                "createdAt": "2019-02-26T14:13:26.935Z",
                "updatedAt": "2019-02-26T14:13:26.935Z",
                "version": 0,
                "doctor": {
                    "id": "3bdcd4c3-b29c-4bc9-828f-49a1dc62f34d",
                    "roleId": 2,
                    "countryId": 237,
                    "firstName": "Vlad",
                    "lastName": "Doctor",
                    "addressId": 87,
                    "photo": "https://new-back-storage.s3.amazonaws.com/avatars/unnamed-1549974339253-upload.jpg",
                    "appIconBadge": 0,
                    "telephoneId": "077a89c9-b47f-4f3f-bcb5-fbb0f43be12b",
                    "createdAt": "2019-02-04T12:39:38.456Z",
                    "updatedAt": "2019-02-12T12:26:15.346Z",
                    "version": 2
                },
                "prescriptions": [
                    {
                        "interval": {
                            "start": "2019-02-19T00:00:00.000Z",
                            "repeats": 1
                        },
                        "treatment": "334ceaa0-3926-4341-94d3-acc14e405a2d",
                        "data": {
                            "type": "call",
                            "date": "2019-02-19T12:00:00.000Z"
                        },
                        "frequency": {},
                        "createdAt": "2019-02-26T14:13:26.940Z",
                        "prescribedBy": "3bdcd4c3-b29c-4bc9-828f-49a1dc62f34d",
                        "id": "1a9273ee-d214-423f-8b04-18b1d7a77986",
                        "title": "Appointment",
                        "type": "appointment"
                    }
                ]
            },
            {
                "id": "a0b63761-58b6-4be5-8534-2a41c0f28eb5",
                "patient": "18fdfc23-dcf3-4682-b1c0-9232da662078",
                "prescribedBy": "3bdcd4c3-b29c-4bc9-828f-49a1dc62f34d",
                "title": "Activity",
                "starred": false,
                "started": false,
                "createdAt": "2019-02-27T15:23:16.064Z",
                "updatedAt": "2019-02-27T15:23:16.064Z",
                "version": 0,
                "doctor": {
                    "id": "3bdcd4c3-b29c-4bc9-828f-49a1dc62f34d",
                    "roleId": 2,
                    "countryId": 237,
                    "firstName": "Vlad",
                    "lastName": "Doctor",
                    "addressId": 87,
                    "photo": "https://new-back-storage.s3.amazonaws.com/avatars/unnamed-1549974339253-upload.jpg",
                    "appIconBadge": 0,
                    "telephoneId": "077a89c9-b47f-4f3f-bcb5-fbb0f43be12b",
                    "createdAt": "2019-02-04T12:39:38.456Z",
                    "updatedAt": "2019-02-12T12:26:15.346Z",
                    "version": 2
                },
                "prescriptions": [
                    {
                        "interval": {
                            "start": "2018-01-01T00:00:00.000Z",
                            "repeats": 3
                        },
                        "treatment": "a0b63761-58b6-4be5-8534-2a41c0f28eb5",
                        "data": {
                            "type": "running",
                            "measurements": [
                                {
                                    "type": "distance",
                                    "measure": "1km"
                                },
                                {
                                    "type": "heartRate",
                                    "measure": "110"
                                }
                            ]
                        },
                        "frequency": {
                            "type": "weekly",
                            "days": [
                                1,
                                2,
                                3
                            ],
                            "time": [
                                "12:00"
                            ]
                        },
                        "createdAt": "2019-02-27T15:23:16.070Z",
                        "prescribedBy": "3bdcd4c3-b29c-4bc9-828f-49a1dc62f34d",
                        "id": "f5a47867-ff18-44ac-98a2-859470fd02a5",
                        "title": "Run, Forest!",
                        "type": "activity"
                    }
                ]
            },
            {
                "id": "7ec3d218-953e-449b-a271-8c501a18b031",
                "patient": "18fdfc23-dcf3-4682-b1c0-9232da662078",
                "prescribedBy": "3bdcd4c3-b29c-4bc9-828f-49a1dc62f34d",
                "title": "Hello there",
                "starred": false,
                "started": false,
                "createdAt": "2019-02-27T15:16:49.809Z",
                "updatedAt": "2019-02-27T15:16:49.809Z",
                "version": 0,
                "doctor": {
                    "id": "3bdcd4c3-b29c-4bc9-828f-49a1dc62f34d",
                    "roleId": 2,
                    "countryId": 237,
                    "firstName": "Vlad",
                    "lastName": "Doctor",
                    "addressId": 87,
                    "photo": "https://new-back-storage.s3.amazonaws.com/avatars/unnamed-1549974339253-upload.jpg",
                    "appIconBadge": 0,
                    "telephoneId": "077a89c9-b47f-4f3f-bcb5-fbb0f43be12b",
                    "createdAt": "2019-02-04T12:39:38.456Z",
                    "updatedAt": "2019-02-12T12:26:15.346Z",
                    "version": 2
                },
                "prescriptions": [
                    {
                        "interval": {
                            "start": "2019-01-01T00:00:00.000Z",
                            "end": "2019-01-10T00:00:00.000Z"
                        },
                        "treatment": "7ec3d218-953e-449b-a271-8c501a18b031",
                        "data": {
                            "url": "http://www.engr.colostate.edu/me/facil/dynamics/files/bird.avi"
                        },
                        "frequency": {
                            "type": "daily",
                            "days": [
                                1
                            ],
                            "time": [
                                "12:00"
                            ]
                        },
                        "createdAt": "2019-02-27T15:16:49.816Z",
                        "prescribedBy": "3bdcd4c3-b29c-4bc9-828f-49a1dc62f34d",
                        "id": "4f7ac1c1-8219-47ec-be38-bc3a466754a3",
                        "title": "Video item title",
                        "type": "video"
                    },
                    {
                        "interval": {
                            "start": "2019-02-19T00:00:00.000Z",
                            "repeats": 1
                        },
                        "treatment": "7ec3d218-953e-449b-a271-8c501a18b031",
                        "data": {
                            "type": "homeVisit",
                            "date": "2019-02-19T12:00:00.000Z",
                            "address": "Your home"
                        },
                        "frequency": {},
                        "createdAt": "2019-02-27T15:16:49.816Z",
                        "prescribedBy": "3bdcd4c3-b29c-4bc9-828f-49a1dc62f34d",
                        "id": "0a621585-0e65-4630-af7f-e53af0f4f207",
                        "title": "Appointment",
                        "type": "appointment"
                    },
                    {
                        "interval": {
                            "start": "2018-01-01T00:00:00.000Z",
                            "end": "2018-01-20T00:00:00.000Z"
                        },
                        "treatment": "7ec3d218-953e-449b-a271-8c501a18b031",
                        "data": {
                            "url": "https://img-9gag-fun.9cache.com/photo/av8ARrn_460s.jpg"
                        },
                        "frequency": {
                            "type": "weekly",
                            "days": [
                                1,
                                2,
                                3
                            ],
                            "time": [
                                "12:00"
                            ]
                        },
                        "createdAt": "2019-02-27T15:16:49.815Z",
                        "prescribedBy": "3bdcd4c3-b29c-4bc9-828f-49a1dc62f34d",
                        "id": "eb8abcad-7044-46c3-be56-cac95d986408",
                        "title": "Image item title",
                        "type": "image"
                    },
                    {
                        "interval": {
                            "start": "2018-01-01T00:00:00.000Z",
                            "repeats": 3
                        },
                        "treatment": "7ec3d218-953e-449b-a271-8c501a18b031",
                        "data": {
                            "text": "This is text for the item"
                        },
                        "frequency": {
                            "type": "weekly",
                            "days": [
                                1,
                                2,
                                3
                            ],
                            "time": [
                                "12:00"
                            ]
                        },
                        "createdAt": "2019-02-27T15:16:49.815Z",
                        "prescribedBy": "3bdcd4c3-b29c-4bc9-828f-49a1dc62f34d",
                        "id": "ef918631-8c02-441e-a70b-645c514b9dd2",
                        "title": "Text item title",
                        "type": "text"
                    },
                    {
                        "interval": {
                            "start": "2018-01-01T00:00:00.000Z",
                            "repeats": 3
                        },
                        "treatment": "7ec3d218-953e-449b-a271-8c501a18b031",
                        "data": {
                            "questions": [
                                {
                                    "answers": [
                                        "asd1",
                                        "asd2"
                                    ],
                                    "title": "What",
                                    "type": "single",
                                    "required": true
                                },
                                {
                                    "answers": [
                                        "asd1",
                                        "asd2"
                                    ],
                                    "title": "What",
                                    "type": "multiple",
                                    "required": true
                                },
                                {
                                    "title": "What",
                                    "type": "open",
                                    "required": false
                                }
                            ]
                        },
                        "frequency": {
                            "type": "weekly",
                            "days": [
                                1,
                                2,
                                3
                            ],
                            "time": [
                                "12:00"
                            ]
                        },
                        "createdAt": "2019-02-27T15:16:49.816Z",
                        "prescribedBy": "3bdcd4c3-b29c-4bc9-828f-49a1dc62f34d",
                        "id": "f2f4a633-9023-4ae4-a7a4-17e53633112c",
                        "title": "Survey for you",
                        "type": "survey"
                    },
                    {
                        "interval": {
                            "start": "2018-01-01T00:00:00.000Z",
                            "repeats": 3
                        },
                        "treatment": "7ec3d218-953e-449b-a271-8c501a18b031",
                        "data": {
                            "dosageForm": "pill",
                            "medicine": "a82a2569-c5d8-4987-9a11-464b55857858",
                            "amount": 1,
                            "directions": "Do not put this in your anus!"
                        },
                        "frequency": {
                            "type": "weekly",
                            "days": [
                                {
                                    "day": 1,
                                    "doses": [
                                        {
                                            "dose": "2",
                                            "time": "12:00"
                                        }
                                    ]
                                }
                            ]
                        },
                        "createdAt": "2019-02-27T15:16:49.816Z",
                        "prescribedBy": "3bdcd4c3-b29c-4bc9-828f-49a1dc62f34d",
                        "id": "de167f0c-97f8-4a43-89fb-615417770eca",
                        "title": "Nice medicine",
                        "type": "medicine"
                    },
                    {
                        "interval": {
                            "start": "2018-01-01T00:00:00.000Z",
                            "repeats": 3
                        },
                        "treatment": "7ec3d218-953e-449b-a271-8c501a18b031",
                        "data": {},
                        "frequency": {
                            "type": "weekly",
                            "days": [
                                1,
                                2,
                                3
                            ],
                            "time": [
                                "12:00"
                            ]
                        },
                        "createdAt": "2019-02-27T15:16:49.815Z",
                        "prescribedBy": "3bdcd4c3-b29c-4bc9-828f-49a1dc62f34d",
                        "id": "e6708815-9178-4650-9a1b-502894b90c28",
                        "title": "New Christ",
                        "type": "wellBarometer"
                    },
                    {
                        "interval": {
                            "start": "2018-01-01T00:00:00.000Z",
                            "end": "2018-01-20T00:00:00.000Z"
                        },
                        "treatment": "7ec3d218-953e-449b-a271-8c501a18b031",
                        "data": {
                            "food": [
                                {
                                    "type": "main",
                                    "title": "Vodka"
                                },
                                {
                                    "type": "greens",
                                    "title": "Vodka"
                                },
                                {
                                    "type": "drinks",
                                    "title": "Much vodka"
                                },
                                {
                                    "type": "snacks",
                                    "title": "Vodka"
                                },
                                {
                                    "type": "desserts",
                                    "title": "Vodka"
                                }
                            ]
                        },
                        "frequency": {
                            "type": "weekly",
                            "days": [
                                1,
                                2,
                                3
                            ],
                            "time": [
                                "12:00"
                            ]
                        },
                        "createdAt": "2019-02-27T15:16:49.816Z",
                        "prescribedBy": "3bdcd4c3-b29c-4bc9-828f-49a1dc62f34d",
                        "id": "5ab2a48a-8c03-4def-9f6c-f85718fe6567",
                        "title": "Nutrition item title",
                        "type": "nutrition"
                    }
                ]
            }
        ]
    }
}
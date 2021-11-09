"""
    @apiDefine unathorized
    @apiErrorExample {json} Error-Response:
    HTTP 401 Unauthorized
    {
        "detail": "Учетные данные не были предоставлены."
    } 
"""
"""
    @apiDefine notcredits
    @apiErrorExample {json} Error-Response:
    HTTP 451 Unavailable For Legal Reasons
    {
        "status": "not enought credits"
    } 
"""
"""
    @api {get} /user/get-user/ 1.1 Retrieve user info
    @apiName 1.1 Get user info
    @apiGroup User
    @apiVersion  0.1.0
    
    @apiHeader {String} Authorization token send in token ihg6trfqwfb

    @apiSampleRequest https://hype-fans.com/user/get-user/

    @apiSuccessExample {json} Success-Response:
    HTTP/1.1 200 OK
    {
        "pk": 13,
        "email": "root@gmail.com",
        "avatar": "http://hype-fans.com/media/user/hNh33fnFWzms.png",
        "background_photo": "http://hype-fans.com/media/user/s0rczgspK2FE.png",
        "username": "ROOT",
        "first_name": "ger",
        "bio": "тестовый\r\nну очень тестовый\r\nну максимально тестовый",
        "birthday_date": "1970-01-01T00:00:00",
        "location": {
            "code": "AU",
            "name": "Australia"
        },
        "subscribtion_price": 12222,
        "message_price": 1,
        "post_amount": 4,
        "fans_amount": 5,
        "repheral_link": "https://hype-fans.com/root",
        "repheral_users": [],
        "blocked_users": [],
        "email_notifications": false,
        "push_notifications": true,
        "hide_online": true,
        "allow_comments": true,
        "show_post_amount": true,
        "show_fans_amount": true,
        "show_watermark": false,
        "validated_email": false,
        "validated_user": true,
        "credit_amount": 145,
        "earned_credits_amount": 0,
        "is_online": false
    }
    @apiUse unathorized
"""
"""
    @api {post} /auth/token/login/ 1.2 User login
    @apiName 1.2 User login
    @apiGroup User
    @apiVersion  0.1.0
    @apiSampleRequest https://hype-fans.com/auth/token/login/
   
    @apiParam  {String} email User email
    @apiParam  {String} password User password
     
    @apiSuccessExample {json} Success-Response:
    HTTP/1.1 200 OK
    {
        "auth_token": "0f5ee811d67c2745018236ac73bed6b4837cf806"
    }
"""

"""
    @api {post} /auth/token/logout/ 1.3 User logout
    @apiName 1.3 User logout
    @apiGroup User
    @apiVersion  0.1.0
    @apiHeader {String} Authorization Authorization token

    @apiSampleRequest https://hype-fans.com/auth/token/logout/
      
    @apiSuccessExample {json} Success-Response:
    HTTP/1.1 204 No Content
"""

"""
    @api {get} /auth/users/me/ 1.4 User base info
    @apiName 1.4 User base info
    @apiGroup User
    @apiVersion  0.1.0
    @apiHeader {String} Authorization Authorization token

    @apiSampleRequest https://hype-fans.com/auth/users/me/
    @apiSuccess (200) {String} username User username
    @apiSuccess (200) {Number} id User id
    @apiSuccess (200) {String} email User email
    
    @apiSuccessExample {json} Success-Response:
    HTTP/1.1 200 OK
    {
        "username": "root",
        "id": 1,
        "email": "root@gmail.com"
    }
    @apiUse unathorized
"""

"""
    @api {get} /user/get-settings/ 1.5 User settings
    @apiName 1.5 User settings
    @apiGroup User
    @apiVersion  0.1.0
    @apiHeader {String} Authorization Authorization token

    @apiSampleRequest https://hype-fans.com/user/get-settings/
    @apiSuccess (200) {Number} pk User id
    @apiSuccess (200) {Boolean} email_notifications User email_notifications
    @apiSuccess (200) {Boolean} push_notifications User push_notifications
    @apiSuccess (200) {Boolean} hide_online User hide_online
    @apiSuccess (200) {Boolean} allow_comments User allow_comments
    @apiSuccess (200) {Boolean} show_post_amount User show_post_amount
    @apiSuccess (200) {Boolean} show_fans_amount User show_fans_amount
    @apiSuccess (200) {Boolean} show_watermark User show_watermark
    @apiSuccess (200) {Boolean} validated_email User validated_email
    @apiSuccess (200) {Boolean} validated_user User validated_user
    @apiSuccess (200) {Number} credit_amount User credit_amount
    @apiSuccess (200) {Number} earned_credits_amount User earned_credits_amount
    @apiSuccess (200) {Boolean} is_online User is_online
    
    @apiSuccessExample {json} Success-Response:
    HTTP/1.1 200 OK
    {
        "pk": 1,
        "email_notifications": false,
        "push_notifications": false,
        "hide_online": false,
        "allow_comments": true,
        "show_post_amount": true,
        "show_fans_amount": true,
        "show_watermark": false,
        "validated_email": false,
        "validated_user": false,
        "credit_amount": 0,
        "earned_credits_amount": 0,
        "is_online": true
    }
    @apiUse unathorized
"""

"""
    @api {post} /user/create-user/ 1.6 Create user
    @apiName 1.6 Create user
    @apiGroup User
    @apiVersion  0.1.0

    @apiParam (200) {String} emaiil User unique email required
    @apiParam (200) {String} username User unique username required
    @apiParam (200) {String} password User password required

    @apiSampleRequest https://hype-fans.com/user/create-user/
    
    @apiSuccess (200) {String} auth_token User auth token
    
    @apiSuccessExample {json} Success-Response:
    HTTP 201 Created
    {
        "auth_token": "9ae6d101ac8fb9b3d0d97032fdbe4896be715546"
    }
"""


"""
    @api {post} /user/get-profile/:username 1.7 Get profile
    @apiName 1.7 Get profile
    @apiGroup User
    @apiVersion  0.1.0
    @apiHeader {String} Authorization Authorization token

    @apiSampleRequest https://hype-fans.com/user/get-profile/test
    
    @apiSuccess (200) {String} user User object
    @apiSuccess (200) {Array} posts Post objects
    
    @apiSuccessExample {json} Success-Response:
    HTTP 202 Accepted
    {
        "pk": 2,
        "email": "test@gmail.com",
        "avatar": "",
        "background_photo": "",
        "username": "test",
        "first_name": null,
        "bio": null,
        "birthday_date": "1970-01-01T00:00:00",
        "location": "",
        "subscribtion_price": 0,
        "message_price": 0,
        "post_amount": 1,
        "fans_amount": 0,
        "repheral_link": null,
        "repheral_users": [],
        "blocked_users": [],
        "email_notifications": false,
        "push_notifications": false,
        "hide_online": false,
        "allow_comments": true,
        "show_post_amount": true,
        "show_fans_amount": true,
        "show_watermark": false,
        "validated_email": false,
        "validated_user": false,
        "credit_amount": 0,
        "earned_credits_amount": 0,
        "is_online": true,
        "posts": [
            {
                "post": {
                    "pk": 1,
                    "name": "test name",
                    "description": "test description",
                    "enabled_comments": true,
                    "price_to_watch": 12,
                    "publication_date": 1634926833.13153,
                    "reply_link": "test-hype",
                    "likes_amount": 0,
                    "comments_amount": 0,
                    "favourites_amount": 0,
                    "attachments": [
                        {
                            "id": 1,
                            "_file": "https://hype-fans.com/media/post_file/iLearning_-_%D1%81%D0%BE%D0%B7%D0%B4%D0%B0%D1%82%D1%8C_%D0%BF%D0%BB%D0%B0%D0%BD_-_02.jpg",
                            "file_type": 1
                        }
                    ],
                    "payed": false,
                    "liked": false,
                    "like_id": null,
                    "favourite": false
                }
            }
        ]
    }
    @apiUse unathorized

"""


"""
    @api {put} /user/partial-update/ 1.8 User partial update
    @apiName 1.8 User partial update
    @apiGroup User
    @apiVersion  0.1.0

    @apiHeader {String} Authorization Authorization token

    @apiParam (not-required) {String} email
    @apiParam (not-required) {File} avatar send with form-data
    @apiParam (not-required) {File} background_photo send with form-data
    @apiParam (not-required) {String} username
    @apiParam (not-required) {String} first_name
    @apiParam (not-required) {String} bio
    @apiParam (not-required) {String} birthday_date in format yyyy-mm-dd
    @apiParam (not-required) {Number} subscribtion_price
    @apiParam (not-required) {Number} message_price
    @apiParam (not-required) {Number} post_amount
    @apiParam (not-required) {Number} fans_amount
    @apiParam (not-required) {String} repheral_link
    @apiParam (not-required) {Array} repheral_users User id's referal
    @apiParam (not-required) {Array} blocked_users User id's array to block
    @apiParam (not-required) {Boolean} email_notifications
    @apiParam (not-required) {Boolean} push_notifications
    @apiParam (not-required) {Boolean} hide_online
    @apiParam (not-required) {Boolean} allow_comments
    @apiParam (not-required) {Boolean} show_post_amount
    @apiParam (not-required) {Boolean} show_fans_amount
    @apiParam (not-required) {Boolean} show_watermark
    @apiParam (not-required) {Boolean} validated_email
    @apiParam (not-required) {Boolean} validated_user
    @apiParam (not-required) {Number} credit_amount
    @apiParam (not-required) {Number} earned_credits_amount
    @apiParam (not-required) {Boolean} is_online

    @apiSampleRequest https://hype-fans.com/user/partial-update/
    
    @apiSuccess (200) {String} auth_token User auth token
    
    @apiSuccessExample {json} Success-Response:
    HTTP 200 OK
    {
        "email": "root@gmail.com",
        "avatar": null,
        "background_photo": null,
        "username": "root",
        "first_name": null,
        "bio": null,
        "birthday_date": "1970-01-01T00:00:00",
        "location": {
            "code": "AF",
            "name": "Afghanistan"
        },
        "post_amount": 0,
        "fans_amount": 0,
        "repheral_link": null,
        "repheral_users": [],
        "blocked_users": [],
        "email_notifications": false,
        "subscribtion_price": 0,
        "message_price": 0,
        "push_notifications": false,
        "hide_online": false,
        "allow_comments": true,
        "show_post_amount": true,
        "show_fans_amount": true,
        "show_watermark": true,
        "validated_email": false,
        "validated_user": false,
        "credit_amount": 0,
        "earned_credits_amount": 0,
        "is_online": true
    }

    @apiUse unathorized
"""


"""
    @api {post} /user/create-subscription/ 1.9 Create subscription
    @apiName 1.9 Create subscription
    @apiGroup User
    @apiVersion  0.1.0

    @apiHeader {String} Authorization Authorization token

    @apiParam (not-required) {Number} start_date Subscription start date timestamp
    @apiParam (not-required) {Number} end_date Subscription end date timestamp
    @apiParam (required) {Number} source User subscribed id
    @apiParam (required) {Number} target User subscribed to id

    @apiSampleRequest https://hype-fans.com/user/create-subscription/
    
    @apiSuccess (200) {Number} id subscription id
    @apiSuccess (200) {Number} end_date subscription end date timestamp
    @apiSuccess (200) {Number} start_date subscription start date timestamp
    @apiSuccess (200) {Number} source User subscribed id
    @apiSuccess (200) {Number} target User subscribed to id

    @apiSuccessExample {json} Success-Response:
    HTTP 200 OK
    {
        "id": 1,
        "end_date": 1635532511.128156,
        "source": 1,
        "start_date": 1634927816.677206,
        "target": 2
    }
    @apiUse unathorized
    @apiErrorExample {json} Error-Response:
    HTTP 451 Unavailable For Legal Reasons
    {
        "status": "not enought credits"
    }
"""

"""
    @api {post} /user/create-card/ 1.9(1) Create card
    @apiName 1.9(1) Create card
    @apiGroup User
    @apiVersion  0.1.0

    @apiHeader {String} Authorization Authorization token

    @apiParam (required) {String} user User id
    @apiParam (required) {Number} number 16 digits number
    @apiParam (required) {String} date_year card month/year in format 12/21
    @apiParam (required) {String} cvc 3 digits card cvc
    @apiParam (required) {Boolean} creator creator card

    @apiSampleRequest https://hype-fans.com/user/create-card/
    
    @apiSuccess (200) {String} user User id
    @apiSuccess (200) {Number} number 16 digits number
    @apiSuccess (200) {String} date_year card month/year in format 12/21
    @apiSuccess (200) {String} cvc 3 digits card cvc
    @apiSuccess (200) {Boolean} creator creator card

    @apiSuccessExample {json} Success-Response:
    HTTP 201 Created
    {
        "id": 1,
        "number": 4234123412341234,
        "date_year": "12/21",
        "cvc": "232",
        "creator": false,
        "user": 1
    }
    @apiUse unathorized

"""

"""
    @api {get} /user/get-card/:id 1.9(2) Card retrieve
    @apiName 1.9(2) Card retrieve
    @apiGroup User
    @apiVersion  0.1.0

    @apiHeader {String} Authorization Authorization token

    @apiSampleRequest https://hype-fans.com/user/get-card/1
    
    @apiSuccess (200) {String} id card id
    @apiSuccess (200) {String} user User object
    @apiSuccess (200) {Number} number 16 digits number
    @apiSuccess (200) {String} date_year card month/year in format 12/21
    @apiSuccess (200) {String} cvc 3 digits card cvc
    @apiSuccess (200) {Boolean} creator creator card

    @apiSuccessExample {json} Success-Response:
    HTTP 200 OK
    {
        "id": 1,
        "user": {
            "pk": 1,
            "username": "root",
            "avatar": "",
            "first_name": null,
            "background_photo": "",
            "subscribtion_price": 0,
            "is_online": true,
            "subscribtion_duration": 7
        },
        "number": 4234123412341234,
        "date_year": "12/21",
        "cvc": "232",
        "creator": false
    }
"""

"""
    @api {post} /user/create-donation/ 1.9 (3) Create donation
    @apiName 1.9 (3) Create donation
    @apiGroup User
    @apiVersion  0.1.0

    @apiHeader {String} Authorization Authorization token

    @apiParam (required) {Number} sender User sender id
    @apiParam (required) {Number} reciever User reciever id
    @apiParam (required) {Number} amount donation amount
    @apiParam (not-required) {Number} datetime now timestamp

    @apiSampleRequest https://hype-fans.com/user/create-donation/
    
    @apiSuccess (200) {Number} sender User sender id
    @apiSuccess (200) {Number} datetime donation timestamp
    @apiSuccess (200) {Number} reciever User reciever id
    @apiSuccess (200) {Number} amount donation amount

    @apiSuccessExample {json} Success-Response:
    HTTP 201 Created
    {
        "id": 1,
        "datetime": 1634929279.745056,
        "amount": 123.0,
        "sender": 1,
        "reciever": 2
    }
    @apiUse unathorized

"""

"""
    @api {post} /user/create-payment/ 1.9 (4) Create payment
    @apiName 1.9 (4) Create payment
    @apiGroup User
    @apiVersion  0.1.0

    @apiHeader {String} Authorization Authorization token

    @apiParam (required) {Number} card Card  id
    @apiParam (required) {Number} amount Paymennt amount
    @apiParam (not-required) {Number} datetime now timestamp

    @apiSampleRequest https://hype-fans.com/user/create-payment/
    
    @apiSuccess (200) {Number} card Card id
    @apiSuccess (200) {Number} amount Paymennt amount
    @apiSuccess (200) {Number} datetime now timestamp

    @apiSuccessExample {json} Success-Response:
    HTTP 201 Created
   {
        "id": 3,
        "amount": 1234.0,
        "card": 1
    }
    @apiUse unathorized
    @apiUse notcredits

"""

"""
    @api {get} /user/get-donation/:id 1.9 (5) Get donation
    @apiName 1.9 (5) Get donation
    @apiGroup User
    @apiVersion  0.1.0

    @apiHeader {String} Authorization Authorization token

    @apiSampleRequest https://hype-fans.com/user/get-donation/1
    
    @apiSuccess (200) {Number} id Donation id
    @apiSuccess (200) {Object} sender Sender user object
    @apiSuccess (200) {Object} reciever Receiver user object
    @apiSuccess (200) {Number} amount Donation amount
    @apiSuccess (200) {Number} datetime Donation timestamp

    @apiSuccessExample {json} Success-Response:
    HTTP 200 OK
    {
        "id": 1,
        "datetime": 1634978237.64059,
        "sender": {
            "pk": 2,
            "username": "test_user1",
            "avatar": "",
            "first_name": null,
            "background_photo": "",
            "subscribtion_price": 1,
            "is_online": true,
            "subscribtion_duration": 7
        },
        "reciever": {
            "pk": 2,
            "username": "test_user1",
            "avatar": "",
            "first_name": null,
            "background_photo": "",
            "subscribtion_price": 1,
            "is_online": true,
            "subscribtion_duration": 7
        },
        "amount": 123.0
    }
    @apiUse unathorized

"""

"""
    @api {get} /user/get-payment/:id 1.9 (6) Get payment
    @apiName 1.9 (6) Get payment
    @apiGroup User
    @apiVersion  0.1.0

    @apiHeader {String} Authorization Authorization token

    @apiSampleRequest https://hype-fans.com/user/get-payment/4
    
    @apiSuccess (200) {Number} id Payment id
    @apiSuccess (200) {Object} card Card object
    @apiSuccess (200) {Number} datetime Payment timestamp
    @apiSuccess (200) {Number} amount Payment amount

    @apiSuccessExample {json} Success-Response:
    HTTP 200 OK
    {
        "id": 4,
        "card": {
            "id": 1,
            "user": {
                "pk": 1,
                "username": "root",
                "avatar": "http://127.0.0.1:8000/media/user/sdsmEGpleMY6.png",
                "first_name": null,
                "background_photo": "",
                "subscribtion_price": 0,
                "is_online": true,
                "subscribtion_duration": 7
            },
            "number": 812787787837237940,
            "date_year": "1223",
            "cvc": "333",
            "creator": true
        },
        "datetime": 1634979001.83044,
        "amount": 123.0
    }
    @apiUse unathorized

"""

"""
    @api {post} /user/validate-user/ 1.9 (7) Validate user
    @apiName 1.9 (7) Validate user
    @apiGroup User
    @apiVersion  0.1.0

    @apiHeader {String} Authorization Authorization token

    @apiParam (required) {Number} user user  id
    @apiParam (required) {File} photo Document photo
    @apiParam (required) {Boolean} verified Verification

    @apiSampleRequest https://hype-fans.com/user/validate-user/
    
    @apiSuccess (200) {Number} id Validated user id
    @apiSuccess (200) {String} photo File url
    @apiSuccess (200) {Boolean} verified Verified status
    @apiSuccess (200) {Number} user User id

    @apiSuccessExample {json} Success-Response:
    HTTP 201 Created
    {
        "id": 1,
        "photo": "http://127.0.0.1:8000/media/docs/test.png",
        "verified": true,
        "user": 2
    }
    @apiUse unathorized
    @apiErrorExample {json} Error-Response:
    HTTP 404 Bad request
    {
        "photo": [
            "Загрузите правильное изображение. Файл, который вы загрузили, поврежден или не является изображением."
        ]
    }

"""

"""
    @api {get} /user/user-donation-sended/ 1.9 (8) Users donation sended
    @apiName 1.9 (8) Users donation sended
    @apiGroup User
    @apiVersion  0.1.0

    @apiHeader {String} Authorization Authorization token

    @apiSampleRequest https://hype-fans.com/user/user-donation-sended/
    
    @apiSuccess (200) {Number} count Donation amounts
    @apiSuccess (200) {Number} next Next page number
    @apiSuccess (200) {Number} previous Prev page number
    @apiSuccess (200) {Array} results Array of donation object

    @apiSuccessExample {json} Success-Response:
    HTTP 200 OK
    {
        "count": 1,
        "next": null,
        "previous": null,
        "results": [
            {
                "id": 2,
                "datetime": 1634979692.07884,
                "sender": {
                    "pk": 1,
                    "username": "root",
                    "avatar": "http://127.0.0.1:8000/media/user/sdsmEGpleMY6.png",
                    "first_name": null,
                    "background_photo": "",
                    "subscribtion_price": 0,
                    "is_online": true,
                    "subscribtion_duration": 7
                },
                "reciever": {
                    "pk": 2,
                    "username": "test_user1",
                    "avatar": "",
                    "first_name": null,
                    "background_photo": "",
                    "subscribtion_price": 1,
                    "is_online": true,
                    "subscribtion_duration": 7
                },
                "amount": 123.0
            }
        ]
    }
    @apiUse unathorized
"""

"""
    @api {get} /user/user-donation-recieved/ 1.9 (9) Users donation recieved
    @apiName 1.9 (9) Users donation recieved
    @apiGroup User
    @apiVersion  0.1.0

    @apiHeader {String} Authorization Authorization token

    @apiSampleRequest https://hype-fans.com/user/user-donation-recieved/
    
    @apiSuccess (200) {Number} count Donation amounts
    @apiSuccess (200) {Number} next Next page number
    @apiSuccess (200) {Number} previous Prev page number
    @apiSuccess (200) {Array} results Array of donation object

    @apiSuccessExample {json} Success-Response:
    HTTP 200 OK
    {
        "count": 1,
        "next": null,
        "previous": null,
        "results": [
            {
                "id": 2,
                "datetime": 1634979692.07884,
                "sender": {
                    "pk": 1,
                    "username": "root",
                    "avatar": "http://127.0.0.1:8000/media/user/sdsmEGpleMY6.png",
                    "first_name": null,
                    "background_photo": "",
                    "subscribtion_price": 0,
                    "is_online": true,
                    "subscribtion_duration": 7
                },
                "reciever": {
                    "pk": 2,
                    "username": "test_user1",
                    "avatar": "",
                    "first_name": null,
                    "background_photo": "",
                    "subscribtion_price": 1,
                    "is_online": true,
                    "subscribtion_duration": 7
                },
                "amount": 123.0
            }
        ]
    }
    @apiUse unathorized
"""

"""
    @api {get} /user/user-payment-history/ 1.9 (10) User payment history
    @apiName 1.9 (10) User payment history
    @apiGroup User
    @apiVersion  0.1.0

    @apiHeader {String} Authorization Authorization token

    @apiSampleRequest https://hype-fans.com/user/user-payment-history/
    
    @apiSuccess (200) {Number} count Donation amounts
    @apiSuccess (200) {Number} next Next page number
    @apiSuccess (200) {Number} previous Prev page number
    @apiSuccess (200) {Array} results Array of payment objects

    @apiSuccessExample {json} Success-Response:
    HTTP 200 OK
    {
        "count": 4,
        "next": null,
        "previous": null,
        "results": [
            {
                "id": 4,
                "card": {
                    "id": 1,
                    "user": {
                        "pk": 1,
                        "username": "root",
                        "avatar": "http://127.0.0.1:8000/media/user/sdsmEGpleMY6.png",
                        "first_name": null,
                        "background_photo": "",
                        "subscribtion_price": 0,
                        "is_online": true,
                        "subscribtion_duration": 7
                    },
                    "number": 812787787837237940,
                    "date_year": "1223",
                    "cvc": "333",
                    "creator": true
                },
                "datetime": "2021-10-23T11:50:01.830440",
                "amount": 123.0
            },
            {
                "id": 1,
                "card": {
                    "id": 1,
                    "user": {
                        "pk": 1,
                        "username": "root",
                        "avatar": "http://127.0.0.1:8000/media/user/sdsmEGpleMY6.png",
                        "first_name": null,
                        "background_photo": "",
                        "subscribtion_price": 0,
                        "is_online": true,
                        "subscribtion_duration": 7
                    },
                    "number": 812787787837237940,
                    "date_year": "1223",
                    "cvc": "333",
                    "creator": true
                },
                "datetime": "1970-01-01T00:00:00",
                "amount": 123.0
            },
            {
                "id": 2,
                "card": {
                    "id": 1,
                    "user": {
                        "pk": 1,
                        "username": "root",
                        "avatar": "http://127.0.0.1:8000/media/user/sdsmEGpleMY6.png",
                        "first_name": null,
                        "background_photo": "",
                        "subscribtion_price": 0,
                        "is_online": true,
                        "subscribtion_duration": 7
                    },
                    "number": 812787787837237940,
                    "date_year": "1223",
                    "cvc": "333",
                    "creator": true
                },
                "datetime": "1970-01-01T00:00:00",
                "amount": 123.0
            },
            {
                "id": 3,
                "card": {
                    "id": 1,
                    "user": {
                        "pk": 1,
                        "username": "root",
                        "avatar": "http://127.0.0.1:8000/media/user/sdsmEGpleMY6.png",
                        "first_name": null,
                        "background_photo": "",
                        "subscribtion_price": 0,
                        "is_online": true,
                        "subscribtion_duration": 7
                    },
                    "number": 812787787837237940,
                    "date_year": "1223",
                    "cvc": "333",
                    "creator": true
                },
                "datetime": "1970-01-01T00:00:00",
                "amount": 123.0
            }
        ]
    }
    @apiUse unathorized
"""

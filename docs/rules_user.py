"""
    @api {get} /user/get-user/ Retrieve user info
    @apiName 1.1 Get user info
    @apiGroup User
    @apiVersion  0.1.0
    
    @apiHeader {String} Authorization token send in token ihg6trfqwfb

    @apiSampleRequest https://hyep-fans.com/user/get-user/

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
"""

"""
    @apiDefine unathorized
    @apiErrorExample {json} Error-Response:
    HTTP 401 Unauthorized
    {
        "detail": "Учетные данные не были предоставлены."
    } 
"""
"""
    @apiDefine not-credits
    @apiErrorExample {json} Error-Response:
    HTTP 451 Unavailable For Legal Reasons
    {
        "status": "not enought credits"
    } 
"""
"""
    @api {get} /blog/get-notifications/ 2.1 Retrieve user notifications
    @apiName 2.1 Retrieve user notifications
    @apiGroup Blog
    @apiVersion  0.1.0
    
    @apiHeader {String} Authorization token send in token ihg6trfqwfb

    @apiSampleRequest https://hype-fans.com/blog/get-notifications/

    @apiSuccess (comment) {Object} user User short obj
    @apiSuccess (comment) {Object} post Post short obj
    @apiSuccess (comment) {String} type comment

    @apiSuccess (like) {Object} user User short obj
    @apiSuccess (like) {Object} post Post short obj
    @apiSuccess (like) {String} type like

    @apiSuccess (donation) {Object} user User short obj
    @apiSuccess (donation) {Object} donation Donation short obj
    @apiSuccess (donation) {String} type donation
    

    @apiSuccess (subscription) {Object} user User short obj
    @apiSuccess (subscription) {Object} subscription Subscription short obj
    @apiSuccess (subscription) {String} type subscription
    

    @apiSuccessExample {json} Success-Response:
    HTTP/1.1 200 OK
    {
        [
            {
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
                "post": {
                    "id": 4,
                    "post": {
                        "pk": 1,
                        "name": "erggdfdgfdfg",
                        "description": "dsfgsdgsdfgd",
                        "enabled_comments": true,
                        "price_to_watch": 4,
                        "publication_date": 1622973451.24476,
                        "reply_link": "1234",
                        "likes_amount": 2,
                        "comments_amount": 4,
                        "favourites_amount": 2,
                        "attachments": [
                            {
                                "id": 1,
                                "_file": "https://hype-fans.com/media/post_file/0rvz0myA0Dg_1.jpg",
                                "file_type": 1
                            }
                        ]
                    },
                    "date_time": 1633623966.31687,
                    "parent_username": "root",
                    "parent_user_id": 1,
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
                    "like": true,
                    "comment": "",
                    "donation_amount": 0,
                    "lft": 1,
                    "rght": 2,
                    "tree_id": 1,
                    "sub_action": 2,
                    "parent": 1
                },
                "type": "comment"
            },
            {
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
                "post": {
                    "id": 4,
                    "post": {
                        "pk": 1,
                        "name": "erggdfdgfdfg",
                        "description": "dsfgsdgsdfgd",
                        "enabled_comments": true,
                        "price_to_watch": 4,
                        "publication_date": 1622973451.24476,
                        "reply_link": "1234",
                        "likes_amount": 2,
                        "comments_amount": 4,
                        "favourites_amount": 2,
                        "attachments": [
                            {
                                "id": 1,
                                "_file": "https://hype-fans.com/media/post_file/0rvz0myA0Dg_1.jpg",
                                "file_type": 1
                            }
                        ]
                    },
                    "date_time": 1633623966.31687,
                    "parent_username": "root",
                    "parent_user_id": 1,
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
                    "like": true,
                    "comment": "",
                    "donation_amount": 0,
                    "lft": 1,
                    "rght": 2,
                    "tree_id": 1,
                    "sub_action": 2,
                    "parent": 1
                },
                "type": "like"
            },
            {
                "user": {
                    "pk": 2,
                    "username": "test_user1",
                    "avatar": "",
                    "first_name": null,
                    "background_photo": "",
                    "subscribtion_price": 1,
                    "is_online": true,
                    "subscribtion_duration": 7
                },
                "donation": {
                    "amount": 123.0,
                    "date_time": 1634979696.30085
                },
                "type": "donation"
            },
            {
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
                "subscription": {
                    "amount": 0,
                    "start_date": 1634995404.24284,
                    "end_date": 1635600204.23884
                },
                "type": "subscription"
            }
        ]
    }

    @apiUse unathorized
"""

"""
    @api {get} /blog/get-main-page/ 2.2 Retrieve user main page
    @apiName 2.2 Retrieve user main page
    @apiGroup Blog
    @apiVersion  0.1.0
    
    @apiHeader {String} Authorization token send in token ihg6trfqwfb

    @apiSampleRequest https://hype-fans.com/blog/get-main-page/

    @apiSuccess (recommendations) {Array} recommendations User short obj array
    @apiSuccess (posts) {Array} post Post short obj array
    @apiSuccess (stories) {Array} stories stories short obj array

    @apiSuccessExample {json} Success-Response:
    HTTP/1.1 200 OK
    {
        "recommendations": [
            [
                {
                    "pk": 1,
                    "username": "root",
                    "avatar": "http://127.0.0.1:8000/media/user/sdsmEGpleMY6.png",
                    "first_name": null,
                    "background_photo": "",
                    "subscribtion_price": 0,
                    "is_online": true,
                    "subscribtion_duration": 7
                },
                {
                    "pk": 2,
                    "username": "test_user1",
                    "avatar": "",
                    "first_name": null,
                    "background_photo": "",
                    "subscribtion_price": 1,
                    "is_online": true,
                    "subscribtion_duration": 7
                }
            ]
        ],
        "posts": [
            {
                "user": {
                    "pk": 2,
                    "username": "test_user1",
                    "avatar": "",
                    "first_name": null,
                    "background_photo": "",
                    "subscribtion_price": 1,
                    "is_online": true,
                    "subscribtion_duration": 7
                },
                "post": {
                    "pk": 1,
                    "name": "erggdfdgfdfg",
                    "description": "dsfgsdgsdfgd",
                    "enabled_comments": true,
                    "price_to_watch": 4,
                    "publication_date": 1622973451.24476,
                    "reply_link": "1234",
                    "likes_amount": 2,
                    "comments_amount": 4,
                    "favourites_amount": 2,
                    "attachments": [
                        {
                            "id": 1,
                            "_file": "https://hype-fans.com/media/post_file/0rvz0myA0Dg_1.jpg",
                            "file_type": 1
                        }
                    ],
                    "payed": false,
                    "liked": true,
                    "like_id": 4,
                    "favourite": true
                }
            }
        ],
        "stories": []
    }

    @apiUse unathorized
"""

"""
    @api {get} /blog/get-post-list/:username 2.3 Retrieve user posts
    @apiName 2.3 Retrieve user posts
    @apiGroup Blog
    @apiVersion  0.1.0
    
    @apiHeader {String} Authorization token send in token ihg6trfqwfb

    @apiSampleRequest https://hype-fans.com/blog/get-post-list/test_user1

    @apiSuccess (post) {Array} post Post short obj
    @apiSuccess (user) {Object} user Short user object

    @apiSuccessExample {json} Success-Response:
    HTTP/1.1 200 OK
    [
        {
            "post": {
                "pk": 1,
                "name": "erggdfdgfdfg",
                "description": "dsfgsdgsdfgd",
                "enabled_comments": true,
                "price_to_watch": 4,
                "publication_date": 1622973451.24476,
                "reply_link": "1234",
                "likes_amount": 2,
                "comments_amount": 4,
                "favourites_amount": 2,
                "attachments": [
                    {
                        "id": 1,
                        "_file": "https://hype-fans.com/media/post_file/0rvz0myA0Dg_1.jpg",
                        "file_type": 1
                    }
                ],
                "payed": true,
                "liked": true,
                "like_id": 4,
                "favourite": true
            },
            "user": {
                "pk": 2,
                "username": "test_user1",
                "avatar": "",
                "first_name": null,
                "background_photo": "",
                "subscribtion_price": 1,
                "is_online": true,
                "subscribtion_duration": 7
            }
        }
    ]
    @apiUse unathorized
"""

"""
    @api {get} /blog/get-post/:id 2.4 Retrieve post info
    @apiName 2.4 Retrieve post info
    @apiGroup Blog
    @apiVersion  0.1.0
    
    @apiHeader {String} Authorization token send in token ihg6trfqwfb

    @apiSampleRequest https://hype-fans.com/blog/get-notifications/

    @apiSuccess (favourites) {Array} favourites User short obj array
    @apiSuccess (user) {Object} user user short obj
    @apiSuccess (post-info) {Number} publication_date Post creation timestamp
    @apiSuccess (post-info) {Array} comments PostAction objects array
    @apiSuccess (post-info) {Number} likes_amount
    @apiSuccess (post-info) {Number} comments_amount
    @apiSuccess (post-info) {Number} favourites_amount
    @apiSuccess (post-info) {Boolean} favourite Is your favourite
    @apiSuccess (post-info) {Boolean} liked Had you liked
    @apiSuccess (post-info) {Number} like_id Your like id if exists
    @apiSuccess (post-info) {Array} attachments Attachments object array
    @apiSuccess (post-info) {String} reply_link link to post
    @apiSuccess (post-info) {String} name Post title
    @apiSuccess (post-info) {String} description Post description
    @apiSuccess (post-info) {Number} price_to_watch
    @apiSuccess (post-info) {Boolean} enabled_comments
    @apiSuccess (post-info) {Number} access_level
    @apiSuccess (post-info) {Boolean} archived

    @apiSuccessExample {json} Success-Response:
    HTTP/1.1 200 OK
    {
        "id": 3,
        "favourites": [
            {
                "pk": 37,
                "username": "rymperit",
                "avatar": "http://hype-fans.com/media/user/rOwMBW1DGgEu.jpg",
                "first_name": "George",
                "background_photo": "http://hype-fans.com/media/user/ODYGEf8ihkWM.jpg",
                "subscribtion_price": 0,
                "is_online": true,
                "subscribtion_duration": 30
            }
        ],
        "user": {
            "pk": 38,
            "username": "felixG",
            "avatar": "http://hype-fans.com/media/user/7pvvWCG85glm.png",
            "first_name": "Felix",
            "background_photo": "http://hype-fans.com/media/user/pEv70qDr9DQi.png",
            "subscribtion_price": 10,
            "is_online": true,
            "subscribtion_duration": 7
        },
        "publication_date": 1623397670.403942,
        "comments": [],
        "likes_amount": 1,
        "comments_amount": 0,
        "favourites_amount": 1,
        "favourite": false,
        "liked": true,
        "like_id": 24,
        "attachments": [
            {
                "id": 5,
                "_file": "https://hype-fans.com/media/post_file/mountains-forest-sunset-4k-wallpaper-preview.jpg",
                "file_type": 1
            }
        ],
        "reply_link": "https://hype-fans.com/post/my-post",
        "name": "my-post",
        "description": "У нас зарегистрировался новый пользователь",
        "price_to_watch": 0,
        "enabled_comments": true,
        "access_level": 2,
        "archived": false
    }
    @apiUse unathorized
"""

"""
    @api {get} /blog/get-post-action-list/:id 2.5 Retrieve post actions
    @apiName 2.5 Retrieve post actions
    @apiGroup Blog
    @apiVersion  0.1.0
    
    @apiHeader {String} Authorization token send in token ihg6trfqwfb

    @apiSampleRequest https://hype-fans.com/blog/get-post-action-list/1

    @apiSuccess (post-action) {Number} id post-atcion pk
    @apiSuccess (post-action) {Object} user User short obj
    @apiSuccess (post-action) {String} parent_username
    @apiSuccess (post-action) {Number} parent_user_id
    @apiSuccess (post-action) {Number} date_time
    @apiSuccess (post-action) {Number} parent_like_amount
    @apiSuccess (post-action) {Boolean} parent_liked
    @apiSuccess (post-action) {Boolean} like
    @apiSuccess (post-action) {String} comment
    @apiSuccess (post-action) {Number} donation_amount
    @apiSuccess (post-action) {Number} lft
    @apiSuccess (post-action) {Number} rght
    @apiSuccess (post-action) {Number} tree_id
    @apiSuccess (post-action) {Number} sub_action
    @apiSuccess (post-action) {Number} parent
    @apiSuccess (post-action) {Number} post

    @apiSuccessExample {json} Success-Response:
    HTTP/1.1 200 OK
    [
        {
            "id": 4,
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
            "parent_username": "root",
            "parent_user_id": 1,
            "date_time": 1633623966.31687,
            "parent_like_amount": 0,
            "parent_liked": false,
            "like": true,
            "comment": "",
            "donation_amount": 0,
            "lft": 1,
            "rght": 2,
            "tree_id": 1,
            "sub_action": 2,
            "parent": 1,
            "post": 1
        }
    ]
    @apiUse unathorized
"""

"""
    @api {delete} /blog/delete-post/:id 2.6 Delete post
    @apiName 2.6 Delete post
    @apiGroup Blog
    @apiVersion  0.1.0
    
    @apiHeader {String} Authorization token send in token ihg6trfqwfb

    @apiSampleRequest https://hype-fans.com/blog/delete-post/1

    @apiSuccessExample {json} Success-Response:
    HTTP/1.1 204 No-content

    @apiUse unathorized
"""

"""
    @api {delete} /blog/delete-post-action/:id 2.7 Delete post action
    @apiName 2.7 Delete post action
    @apiGroup Blog
    @apiVersion  0.1.0
    
    @apiHeader {String} Authorization token send in token ihg6trfqwfb

    @apiSampleRequest https://hype-fans.com/blog/delete-post-action/1

    @apiSuccessExample {json} Success-Response:
    HTTP/1.1 204 No-content

    @apiUse unathorized
"""

"""
    @api {post} /blog/create-post-action/ 2.8 Create post action
    @apiName 2.8 Create post action
    @apiGroup Blog
    @apiVersion  0.1.0
    
    @apiHeader {String} Authorization token send in token ihg6trfqwfb

    @apiParam (required) {Number} donation_amount 
    @apiParam (required) {Number} parent 
    @apiParam (required) {Number} date_time action timestamp 
    @apiParam (required) {Boolean} like
    @apiParam (required) {String} comment
    @apiParam (required) {Number} user
    @apiParam (required) {Number} post

    @apiSampleRequest https://hype-fans.com/blog/delete-post-action/1

    @apiSuccessExample {json} Success-Response:
    HTTP/1.1 201 Created

    @apiUse unathorized
    @apiUse not-credits
"""

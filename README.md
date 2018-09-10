# -StackOverflow-lite

[![Build Status](https://travis-ci.org/ifeLight/-StackOverflow-lite.svg?branch=master)](https://travis-ci.org/ifeLight/-StackOverflow-lite)
[![Coverage Status](https://coveralls.io/repos/github/ifeLight/-StackOverflow-lite/badge.svg?branch=master)](https://coveralls.io/github/ifeLight/-StackOverflow-lite?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/f35f92ac0c5ac1ba6c43/maintainability)](https://codeclimate.com/github/ifeLight/-StackOverflow-lite/maintainability)

FORMAT: 1A
HOST: http://polls.apiblueprint.org/

# Stackoverflow-lite

Stackoverflow-lite is a simple question and answer system build with node.js backend and without no libraries and framework at the front-end.


## Questions Collection [api/v1/questions]

### List All Questions [GET]

+ Response 200 (application/json)

        {
            page : 1
            limit: 10
            message: 'Questions successfully fetched',
            count: 1
            data : [
                {
                    question_id : 20,
                    display_name : "Ifedayo",
                    user_id: 4,
                    title: "What's PHP",
                    created_on: "1536586855960"
                }
            ]
        }
        
+ Response 400 (application/json) 

        {
            message: 'Unable to parse queries',
        }
        
+ Response 400 (application/json) 
        

### Create a New Question [POST]

You may create your own question using this action. You need to provide a token.

+ Request (application/json)

    + Headers
    
            Content-Type: application/json; charset=utf-8
        
            x-access-token: xsdfghjkliuytfrghnjmkmnbvfgh
        
    + Body
    
            {
                title: "What is PHP",
                content: "I need the full meaning please"
            }

+ Response 200 (application/json)

            {
                message: 'Question successfully uploaded',
                data: {
                    createdOn: "1536586855960",
                    questionId: 21,
                    title: "What is PHP",
                    content: "I need the full meaning please"
            }

+ Response 401 (application/json)

            {
                auth: false,
                token: null,
                message: 'No token provided.',
            }
            
+ Response 401 (application/json)

            {
                auth: false,
                token: null,
                message: 'Failed to authenticate token.',
            }
            

+ Response 400 (application/json)

            {
                message: 'Question can not be empty',
                success: false,
            }
 
 
 
## Questions Single [api/v1/questions/{question_id}]
+ Parameters
    + question_id (number) - The ID of the question
    
### Fetch a Question [GET]

+ Response 200 (application/json)

            {
                message: 'Questions successfully fetched',
                data : {
                    question_id : 20,
                    display_name : "Ifedayo",
                    user_id: 4,
                    title: "What's PHP",
                    created_on: "1536586855960"
                    }
            }
            
### Delete a Question [DELETE]
You may delete a question and a token must be provided.

+ Request (application/json)

    + Headers
    
            Content-Type: application/json; charset=utf-8
        
            x-access-token: xsdfghjkliuytfrghnjmkmnbvfgh
            
+ Response 200 (application/json)

            {
                message: 'Question deleted successfully',
            }

+ Response 400 (application/json)

            {
                message: 'The question with such ID does not exist',
            }
            
+ Response 403 (application/json)

            {
                message: 'This user is not permitted to delete this message',
            }
            
+ Response 401 (application/json)

            {
                auth: false,
                token: null,
                message: 'Failed to authenticate token.',
            }
            

+ Response 400 (application/json)

            {
                message: 'Question can not be empty',
                success: false,
            }
            
            
## Answers Resource [api/v1/questions/{question_id}/answers]
+ Parameters
    + question_id (number) - The ID of the question

### List All Answers of a Question [GET]

+ Response 200 (application/json)

            {
                page : 1
                limit: 10
                message: "Answers fully fetched',
                count: 1
                data : [
                    {
                        question_id : 20,
                        display_name : "Ifedayo",
                        user_id: 4,
                        content: "Not to sure",
                        created_on: "1536586855960"
                    }
                ]
            }
        
+ Response 401 (application/json)

            {
                message: 'This question does not exist anymore',
            }        
        
+ Response 400 (application/json)

            {
                message: 'Unable to parse queries',
            }
            
### Post an Answer to a Question [POST]

+ Request (application/json)

    + Headers
    
            Content-Type: application/json; charset=utf-8
        
            x-access-token: xsdfghjkliuytfrghnjmkmnbvfgh
            
     + Body
    
            {
                content: "I need the full meaning please"
            }
            
+ Response 200 (application/json)

            {
                message: 'Answer successfully posted',
                data:   {
                        question_id : 20,
                        display_name : "Ifedayo",
                        user_id: 4,
                        content: "I need the full meaning please",
                        created_on: "1536586855960"
                    }
            }  
            
+ Response 400 (application/json)
    
            {
                message: 'This question does not exist anymore',
            }
            
+ Response 400 (application/json)

            {
                message: 'Answer can not be empty',
                success: false,
            }
+ Response 401 (application/json)

            {
                auth: false,
                token: null,
                message: 'No token provided.',
            }
            
+ Response 401 (application/json)

            {
                auth: false,
                token: null,
                message: 'Failed to authenticate token.',
            }
            
            
## Choose Answers As Preferred [api/v1/questions/{question_id}/answers/{answer_id}]
User can choose which answer is the best answer to the question. A token is reuired.

+ Parameters
    + question_id (number) - The ID of the question
    
    + answer_id (number) - The ID of the preferred answer.
    
### Set Answers as Preferred [POST]

+ Request (application/json)

    + Headers
    
            Content-Type: application/json; charset=utf-8
        
            x-access-token: xsdfghjkliuytfrghnjmkmnbvfgh
            

+ Response 200 (application/json)

            {
                message: 'Successfully set as preferred',
            }

+ Response 400 (application/json)

            {
                message: 'Question does not exist',
            }
            

+ Response 400 (application/json)

            {
                message: 'The answer does not exist for this question',
            }
            
+ Response 403 (application/json)

            {
                message: 'You are forbidden to set this answer as preferred',
            }
            
## Register a User [api/v1/auth/signup]

### Register a User [POST]
When a user signups, a token is generated and it is valid for only 24 hours or after the user sessions expires before the 24th hour.

+ Request (application/json)

    + Headers
    
            Content-Type: application/json; charset=utf-8
            
    + Body
    
            {
                email: "karim@gmail.com",
                password: "mypassword",
                displayName: "Guruboy"
            }
            
+ Response 200 (application/json)

            {
                message: "Signup successfully",
                auth: true,
                token: "<Token generated>"
            }
        
+ Response 400 (application/json)

            {
                message: 'Some required fields are empty',
                auth: false,
                token: null,
            }
            
+ Response 400 (application/json)

            {
                message: 'User with this email already exist',
                auth: false,
                token: null,
            }


## Sign in a User [api/v1/auth/login]

### Register a User [POST]
When a user sign in, a token is generated and it is valid for only 24 hours or after the user sessions expires before the 24th hour.

+ Request (application/json)

    + Headers
    
            Content-Type: application/json; charset=utf-8
            
    + Body
    
            {
                email: "karim@gmail.com"
                password: "mypassword"
            }
            
+ Response 200 (application/json)

            {
            auth: true,
            message: 'Login successfully',
            token: "<Token Generated>"
          }
        
+ Response 400 (application/json)

            {
                message: 'Some required fields are empty',
                auth: false,
                token: null,
            }
            
+ Response 401 (application/json)

            {
                auth: false,
                token: null,
                message: 'Email does not exist',
            }
            
+ Response 401 (application/json)

            {
                auth: false,
                token: null,
                message: 'Password is not correct',
            }
            
            
## User Profile [api/v1/profile]

### Retrieves a User Profile [GET]

+ Request (application/json)

    + Headers
        
            x-access-token: xsdfghjkliuytfrghnjmkmnbvfgh

+ Response 200 (application/json)

            {
                message: 'Profile fully loaded',
                data: {
                answers_no: 1,
                questions_no: 1,
                recent_questions: [
                    {
                        question_id : 20,
                        display_name : "Ifedayo",
                        user_id: 4,
                        title: "What's PHP",
                        created_on: "1536586855960"
                    }
                ],
                popular_questions: [
                    {
                        question_id : 20,
                        display_name : "Ifedayo",
                        user_id: 4,
                        title: "What's PHP",
                        created_on: "1536586855960",
                        no_answers: 4
                    }
                ]
        }
      }

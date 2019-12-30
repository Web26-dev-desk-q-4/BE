# Token provided by backend

- should provide login and registration functionality (POST username and passwords) 
    -- Completed
- should provide ability for users to become students or helpers (POST respective IDs)
    --Completed 
        X Caveat! must update the token on Front end to the token received after a student or helper id is made - this will prevent unnecessary creation or replacement of these IDs and you will be able to restrict page permissions based on the (example) req.token.student_id existence
- should provide ability to POST tickets as students
    --Completed
- should provide ability to PUT tickets as helpers
    --Completed
        X Caveat! there is a user flow of checkout path before editing path for PUT so that we can track the helper's tickets in a junction table (helper_tickets)
- should allow GET of USER's created tickets with student ID
    --Completed
- should allow GET of ALL tickets with helper ID
    --Completed
        X Also created a GET for helper_id specified
-should allow DEL of USER created ticket with their student ID
    --Completed


All CRUD tested at time of full completion

# All Following CRUD operations show the result of a successful attempts, errors/catches are not included in this documentation but those provide a 500, 400, 401, or 403 message (any other messages that are not 200 or 201 are likely due to heroku)

POST Create User
- requires properties "username" and "password"
localhost:8000/api/auth/register

RETURNS example

{
  "id": 2,
  "username": "Secondus",
  "password": "$2a$10$SgPzfVkbcARdOpXU7FoNtuBaYMa841qwQq1dB172awqgMYwAAK8t6",
  "student_id": null,
  "helper_id": null
}

POST Login User
- requires existing properties "username" and "password"
- provides front end with User token (initially without student_id or helper_id)
localhost:8000/api/auth/login

RETURNS example:

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNlY29uZHVzIiwiaWQiOjIsInN0dWRlbnRfaWQiOm51bGwsImhlbHBlcl9pZCI6bnVsbCwiaWF0IjoxNTc3NjY4NDY0LCJleHAiOjE1Nzc2NzIwNjR9.O8Lbhaey7W6ZTAFviE0lLybrMWawkPSXdvOlmSd6YYM",
  "message": "Welcome Secondus!"
}

OR

{
     message: 'Invalid Token/Credentials'  
}

# The following POSTs will ALSO provide the existing student_id or helper_id in the new token if one exists

POST give User helper_id
- requires authorization token from Login
- does NOT require a body
- provides a new token with a helper_id (should replace login token)
localhost:8000/api/helpers

RETURNS 

OBJECTS!

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNlY29uZHVzIiwiaWQiOjIsInN0dWRlbnRfaWQiOm51bGwsImhlbHBlcl9pZCI6bnVsbCwiaWF0IjoxNTc3NjY4NDY0LCJleHAiOjE1Nzc2NzIwNjR9.O8Lbhaey7W6ZTAFviE0lLybrMWawkPSXdvOlmSd6YYMblahblah",
"id": 2,
  "username": "Secondus",
  "password": "$2a$10$SgPzfVkbcARdOpXU7FoNtuBaYMa841qwQq1dB172awqgMYwAAK8t6",
  "student_id": null,
  "helper_id": 1
}

OR

{
  "error": "helper ID already exists"
}

POST give User student_id
- requires authorization token from Login
- does NOT require a body
- provides a new token with a student_id (should replace login token)
localhost:8000/api/students


RETURNS example

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNlY29uZHVzIiwiaWQiOjIsInN0dWRlbnRfaWQiOm51bGwsImhlbHBlcl9pZCI6bnVsbCwiaWF0IjoxNTc3NjY4NDY0LCJleHAiOjE1Nzc2NzIwNjR9.O8Lbhaey7W6ZTAFviE0lLybrMWawkPSXdvOlmSd6YYMblahblah",
"id": 2,
  "username": "Secondus",
  "password": "$2a$10$SgPzfVkbcARdOpXU7FoNtuBaYMa841qwQq1dB172awqgMYwAAK8t6",
  "student_id": 1,
  "helper_id": null
}

OR

{
  "error": "student ID already exists"
}

# The following POST requires a student_id on the user's token

POST create Ticket
- requires body that includes:
        -- "category"
        -- "title"
        -- "description"
        -- "what_was_tried"
- body may also include (optional):
        -- "open" (which defaults to true)
        -- "checked_out" (which defaults to false)
        -- "answer" (which allows null)
- requires token with student_id
- ID in path not used in function, but should be student_id as backup (if possible)
localhost:8000/api/tickets/create/:id

RETURNS example:
{
  "message": "Ticket created: Ticket Title"
}

# All GETs require athorization token

GET ALL helper ids that exist
- requires authorization token
localhost:8000/api/helpers

RETURNS example

array with objects:

[
  {
    "id": 1
  },
  {
    "id": 2
  }
]

OR

empty array

GET ALL student ids that exist
- requires authorization token
localhost:8000/api/students

RETURNS same as above

# The following GETs require tokens that have helper_id or student_id properties

GET ALL tickets as a helper 
- requires helper_id from token
localhost:8000/api/tickets/helper

RETURNS example

array with objects:

[
  {
    "id": 2,
    "open": 1,
    "checked_out": 0,
    "category": "React",
    "title": "auth tokens",
    "description": "how to capture and replace tokens",
    "what_was_tried": "nothing",
    "answer": "N/A"
  },
  {
    "id": 3,
    "open": 1,
    "checked_out": 0,
    "category": "React",
    "title": "auth tokens",
    "description": "how to capture and replace tokens",
    "what_was_tried": "nothing",
    "answer": "N/A"
  }
]

OR

 empty array

GET a helper's tickets by the helper_id
- requires helper_id from token)
- id in path should be helper_id
localhost:8000/api/tickets/helper/:id

RETURNS example:

[
  {
    "id": 2,
    "student_id": 1,
    "ticket_id": 2,
    "open": 1,
    "checked_out": 0,
    "category": "React",
    "title": "auth tokens",
    "description": "how to capture and replace tokens",
    "what_was_tried": "nothing",
    "answer": "N/A"
  }
]

OR

empty array

GET Student's Tickets as student 
- requires student_id from token)
- id in path should be student_id
localhost:8000/api/tickets/:id

RETURNS same as above but helper specific

# The following PUTs should be performed in this order

PUT Checkout Ticket as Helper
- requires body that includes:
            -- property "checked_out" set as true
- requires helper_id from token
- id in path should be Ticket ID!!
localhost:8000/api/tickets/checkout/:id

RETURNS example:

{
  "message": "checked out ticket 3"
}

PUT Edit Ticket as Helper
- requires body that includes:
        -- "open"  (if closing: set to false)
        -- "answer" (string - if the helper can provide an answer)
- requires token that includes helper_id
- id on path should be Ticket ID!
localhost:8000/api/tickets/edit/:id

RETURNS example:
{
  "message": "processed ticket 3- ticket title"
}

# There is one Delete function for Students to be able to delete their tickets - it will also delete the tickets associations with helper and student IDs

DEL Remove Ticket as Student
- requires a token with a student_id
- does NOT require a body
- id in path should be ticket ID
localhost:8000/api/tickets/delete/:id

RETURNS

{
  "message": "Tickets deleted: 1"
}
# Token providing backend

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

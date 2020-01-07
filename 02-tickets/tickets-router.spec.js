const testingFrom = require('supertest');
const server = require('../00-api/server')
const db = require('../database/dbConfig')

describe('tickets-router.js', () => {

    beforeEach(async () => {
        await db('tickets').truncate();
        await db('students').truncate();
        await db('helpers').truncate();
    });



describe('ticket POST', () => {

    it('should register Septimus if he doesn\'t exist', function(){
        return testingFrom(server)
                .post('/api/auth/register')
                .send({username: "Septimus", password: "sevint_!#ded"})
                .then(res => {
                    expect(res.status).toBe(201)
                });
    }
) 


    it('should check to see if a new ticket was created by a student', async () => {
       
                    return testingFrom(server)
                    .post('/api/auth/login')
                    .send({username: "Septimus", password: "sevint_!#ded"})
                    .then(res => {
                         let tokenValue = res.body.token;
                        return testingFrom(server)
                        .post('/api/students')
                        .set('Authorization', tokenValue)
                        .then(res => {
                            let tokenValue = res.body.token;
                            let pathId = res.body.user.student_id
                            return testingFrom(server)
                            .post(`/api/tickets/create/${pathId}`)
                            .set('Authorization', tokenValue)
                            .send({	category: "React",
                            title: "auth tokens",
                            description:"how to capture and replace tokens",
                            what_was_tried:"nothing"})
                            .then(res => {
                                expect(res.status).toBe(201)

                            })
                        });
                    });
                });
    }
)


    describe('tickets GET ALL', () => {

        it('should register Septimus if he doesn\'t exist', function(){
            return testingFrom(server)
                    .post('/api/auth/register')
                    .send({username: "Septimus", password: "sevint_!#ded"})
                    .then(res => {
                        expect(res.status).toBe(201)
                    });
        }
    ) 

    it('should register Octavia if she doesn\'t exist', function(){
        return testingFrom(server)
                .post('/api/auth/register')
                .send({username: "Octavia", password: "ateth_!#ded"})
                .then(res => {
                    expect(res.status).toBe(201)
                });
    }
) 
    
    
        it('should check to see if a new ticket was created by a student', async () => {
           
                        return testingFrom(server)
                        .post('/api/auth/login')
                        .send({username: "Septimus", password: "sevint_!#ded"})
                        .then(res => {
                             let tokenValue = res.body.token;
                            return testingFrom(server)
                            .post('/api/students')
                            .set('Authorization', tokenValue)
                            .then(res => {
                                let tokenValue = res.body.token;
                                let pathId = res.body.user.student_id
                                return testingFrom(server)
                                .post(`/api/tickets/create/${pathId}`)
                                .set('Authorization', tokenValue)
                                .send({	category: "React",
                                title: "auth tokens",
                                description:"how to capture and replace tokens",
                                what_was_tried:"nothing"})
                                .then(res => {
                                    expect(res.status).toBe(201)
    
                                })
                            });
                        });
                    });


                    it('should check for ALL tickets using helper id, should return empty array due to truncation', async () => {
           
                        return testingFrom(server)
                        .post('/api/auth/login')
                        .send({username: "Octavia", password: "ateth_!#ded"})
                        .then(res => {
                             let tokenValue = res.body.token;
                            return testingFrom(server)
                            .post('/api/helpers')
                            .set('Authorization', tokenValue)
                            .then(res => {
                                let tokenValue = res.body.token;
                                let pathId = res.body.user.helper_id
                                return testingFrom(server)
                                .get(`/api/tickets/helper`)
                                .set('Authorization', tokenValue)
                                .then(res => {
                                    expect(Array.isArray(res.body)).toBe(true)
    
                                })
                            });
                        });
                    });






        })
    

        describe('tickets GET HELPER Tickets', () => {

            it('should register Septimus if he doesn\'t exist', function(){
                return testingFrom(server)
                        .post('/api/auth/register')
                        .send({username: "Septimus", password: "sevint_!#ded"})
                        .then(res => {
                            expect(res.status).toBe(201)
                        });
            }
        ) 
    
        it('should register Octavia if she doesn\'t exist', function(){
            return testingFrom(server)
                    .post('/api/auth/register')
                    .send({username: "Octavia", password: "ateth_!#ded"})
                    .then(res => {
                        expect(res.status).toBe(201)
                    });
        }
    ) 
        
        
            it('should return tickets created by Octavia only', async () => {
               
                            return testingFrom(server)
                            .post('/api/auth/login')
                            .send({username: "Septimus", password: "sevint_!#ded"})
                            .then(res => {
                                 let tokenValue = res.body.token;
                                return testingFrom(server)
                                .post('/api/students')
                                .set('Authorization', tokenValue)
                                .then(res => {
                                    let tokenValue = res.body.token;
                                    let pathId = res.body.user.student_id
                                    return testingFrom(server)
                                    .post(`/api/tickets/create/${pathId}`)
                                    .set('Authorization', tokenValue)
                                    .send({	category: "React",
                                    title: "auth tokens",
                                    description:"how to capture and replace tokens",
                                    what_was_tried:"nothing"})
                                    .then(res => {
                                        return testingFrom(server)
                                        .post('/api/auth/login')
                                        .send({username: "Octavia", password: "ateth_!#ded"})
                                        .then(res => {
                                             let tokenValue = res.body.token;
                                            return testingFrom(server)
                                            .post('/api/helpers')
                                            .set('Authorization', tokenValue)
                                            .then(res => {
                                                let tokenValue = res.body.token;
                                               

                                                return testingFrom(server)
                                                        .post('/api/students')
                                                        .set('Authorization', tokenValue)
                                                        .then(res => {
                                                            let tokenValue = res.body.token;
                                                            let pathId = res.body.user.student_id
                                                            
                                                            return testingFrom(server)
                                                            .post(`/api/tickets/create/${pathId}`)
                                                            .set('Authorization', tokenValue)
                                                            .send({	category: "Vue",
                                                            title: "wow",
                                                            description:"type",
                                                            what_was_tried:"nothing"})
                                                            .then(res=> {
                                                                //let pathId = res.body.user.helper_id
                                                                console.log(res.body.user) //UNDEFINED????
                                                                let studentId = res.body.user.student_id
                                                                return testingFrom(server)
                                                                .get(`/api/tickets/helper/${pathId}`)
                                                                .set('Authorization', tokenValue)
                                                                .then(res => {
                                                                    expect(res.body[0].student_id).toMatch(studentId)
                                    
                                                                })
                                                                    
                                                                    });
                                        });
        
                                    })
                                });
                            });
                        });
    
    
    
    
    
    
            })
            })
        
        
        
        
        
        })})

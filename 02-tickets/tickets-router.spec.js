const testingFrom = require('supertest');
const server = require('../00-api/server')
const db = require('../database/dbConfig')

describe('tickets-router.js', () => {

    beforeEach(async () => {
        await db('tickets').truncate();
        await db('students').truncate();
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
        const formData = {username: "Sextus", password: "sevint_!#ded"}
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
});


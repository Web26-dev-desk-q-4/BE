const testingFrom = require('supertest');
const server = require('../00-api/server')
const db = require('../database/dbConfig')

describe('students-router.js', () => {

    // beforeEach(async () => {
    //     await db('users').truncate();

    // });

    // afterAll(async () => {
    //     await db('users').truncate();

    // });

//IF YOU DO afterAll, you must rely on past tests (another afterAll here will mess up the db clearing). If you still have issues with Quintus, then use a user made by auth-router.spec and get rid of the register portion of the following test

   
    describe('student ID POST', () => {
        it('should', async () => {
            const formData = {username: "Quintus", password: "fif_!#ded"}
            return testingFrom(server)
                    .post('/api/auth/register')
                    .send(formData)
                    .then(res => {
                        return testingFrom(server)
                        .post('/api/auth/login')
                        .send(formData)
                        .then(res => {
                             let tokenValue = res.body.token;
                       
                            console.log("tokenValue", tokenValue)
                            return testingFrom(server)
                            .post('/api/students')
                            .set('Authorization', tokenValue)
                            .then(res => {
                                 console.log("req.body", res.body)

                                expect(res.body.user.username).toMatch('Quintus')
                            });
                        });
                    });
        }
    )
});

});
const testingFrom = require('supertest');
const server = require('../00-api/server')
const db = require('../database/dbConfig')


//Have to make sure this is changed, saved, and run last so that it clears the database before the second run



describe('auth-router.js', () => {


    afterAll(async () => {
        await db('users').truncate();
        await db('students').truncate();
        await db('helpers').truncate();
    });



    

    describe('register POST', () => {

        it('should', function(){
            return testingFrom(server)
                    .post('/api/auth/register')
                    .send({username: "Primus", password: "foist_!#ded"})
                    .then(res => {
                        expect(res.status).toBe(201)
                    });
        }
    )
});


    describe('register POST', () => {

        it('should', function(){

            const formData = {username: "Secondus", password: "secun_!#ded"}
            return testingFrom(server)
                    .post('/api/auth/register')
                    .send(formData)
                    .then(res => {
                        console.log(res.body)
                        expect(res.body.username).toMatch("Secondus")
                        
                    });
        }
    )

});

   
    describe('login POST', () => {
        it('should', function(){
            const formData = {username: "Tertius", password: "thoid_!#ded"}
            return testingFrom(server)
                    .post('/api/auth/register')
                    .send(formData)
                    .then(res => {
                        return testingFrom(server)
                        .post('/api/auth/login')
                        .send(formData)
                        .then(res => {
                            expect(res.body.message).toMatch('Welcome Tertius!')
                        });
                    });
        }
    )
});
    describe('login POST', () => {

        it('should', function(){
            const formData = {username: "Quartus", password: "foith_!#ded"}
            return testingFrom(server)
                    .post('/api/auth/register')
                    .send(formData)
                    .then(res => {
                        return testingFrom(server)
                        .post('/api/auth/login')
                        .send(formData)
                        .then(res => {
                            expect(res.status).toBe(200)
                        });
                    });
        }
    )

    });
});
const testingFrom = require('supertest');
const server = require('../00-api/server')
const db = require('../database/dbConfig')
const jwt = require('jsonwebtoken')

describe('students-router.js', () => {

    beforeEach(async () => {
        await db('students').truncate();

     });

    // afterAll(async () => {
    //     await db('users').truncate();

    // });

    // afterEach(async () => {
    //     await db('users').truncate();
    //     await db('students').truncate();
    //     await db('helpers').truncate();
    // });

//IF YOU DO afterAll, you must rely on past tests (another afterAll here will mess up the db clearing). If you still have issues with Quintus, then use a user made by auth-router.spec and get rid of the register portion of the following test

//change to not require new user creation?

   
//     describe('student ID POST', () => {
//         it('should', async () => {
//             const formData = {username: "Quintus", password: "fif_!#ded"}
//             return testingFrom(server)
//                     .post('/api/auth/register')
//                     .send(formData)
//                     .then(res => {
//                         return testingFrom(server)
//                         .post('/api/auth/login')
//                         .send(formData)
//                         .then(res => {
//                              let tokenValue = res.body.token;
                       
//                             console.log("tokenValue", tokenValue)
//                             return testingFrom(server)
//                             .post('/api/students')
//                             .set('Authorization', tokenValue)
//                             .then(res => {
//                                  console.log("req.body", res.body)

//                                 expect(res.body.user.username).toMatch('Quintus')
//                             });
//                         });
//                     });
//         }
//     )
// });

describe('student ID POST', () => {

    
    it('should register Quintus if he doesn\'t exist', function(){
        return testingFrom(server)
                .post('/api/auth/register')
                .send({username: "Quintus", password: "fif_!#ded"})
                .then(res => {
                    expect(res.status).toBe(201)
                });
    }
) 
    it('should', async () => {
        const formData = {username: "Quintus", password: "fif_!#ded"}
                    return testingFrom(server)
                    .post('/api/auth/login')
                    .send(formData)
                    .then(res => {
                        //  let tokenValue = res.body.token;
                        // //console.log("res", res)
                        // console.log("tokenValue", tokenValue)

                        const secret = 'is it secret, is it safe?'
                        let authorization =  res.body.token;
                        jwt.verify(authorization, secret , async function (err, decoded) {
                            if(err){
                              return
                        
                            }else{
                              res.user = decoded;
                              let delayForUser = () => {return res.user}
                              await delayForUser()
                            }
                          }) 
                        return testingFrom(server)
                        .post('/api/helpers')
                        .set('Authorization', authorization)
                        .then(res => {
                             //console.log("req.body", res.body)
                             const secret = 'is it secret, is it safe?'
                             let authorization =  res.body.token;
                             jwt.verify(authorization, secret , async function (err, decoded) {
                                 if(err){
                                   return
                             
                                 }else{
                                   res.user = decoded;
                                   let delayForUser = () => {return res.user}
                                   await delayForUser()
                                 }
                               }) 
                            expect(res.user.username).toMatch('Quintus')
                        });
                    });
                });
    }
)
});


const testingFrom = require('supertest');
const server = require('../00-api/server')
const db = require('../database/dbConfig')
const jwt = require('jsonwebtoken')

describe('helpers-router.js', () => {

    beforeEach(async () => {
        await db('helpers').truncate();

    });

    // afterAll(async () => {
    //     await db('users').truncate();

    // });

    
    // afterEach(async () => {
    //     await db('users').truncate();
    //     await db('students').truncate();
    //     await db('helpers').truncate();
    // });

//IF YOU DO afterAll, you must rely on past tests (another afterAll here will mess up the db clearing). If you still have issues with Sextus, then use a user made by auth-router.spec and get rid of the register portion of the following test

//change to not require new user creation?

   
//     describe('helper ID POST', () => {
//         it('should', async () => {
//             const formData = {username: "Sextus", password: "sisthth_!#ded"}
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
//                             .post('/api/helpers')
//                             .set('Authorization', tokenValue)
//                             .then(res => {
//                                  console.log("req.body", res.body)

//                                 expect(res.body.user.username).toMatch('Sextus')
//                             });
//                         });
//                     });
//         }
//     )
// });



describe('helper ID POST', () => {

    it('should register Sextus if he doesn\'t exist', function(){
        return testingFrom(server)
                .post('/api/auth/register')
                .send({username: "Sextus", password: "sisthth_!#ded"})
                .then(res => {
                    expect(res.status).toBe(201)
                });
    }
) 


    it('should', async () => {
        const formData = {username: "Sextus", password: "sisthth_!#ded"}
                    return testingFrom(server)
                    .post('/api/auth/login')
                    .send({username: "Sextus", password: "sisthth_!#ded"})
                    .then(res => {
                         //let tokenValue = res.body.token;
                        //console.log("res", res)
                        //console.log("tokenValue", tokenValue)
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
                            expect(res.body.user.username).toMatch('Sextus')
                        });
                    });
                });
    }
)
});


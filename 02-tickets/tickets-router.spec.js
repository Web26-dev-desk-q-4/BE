const testingFrom = require('supertest');
const server = require('../00-api/server')
const db = require('../database/dbConfig')
const jwt = require('jsonwebtoken')

describe('tickets-router.js', () => {



    afterAll(async () => {
        await db('tickets').truncate();
        await db('students').truncate();
        await db('helpers').truncate();
    });



describe('ticket POST', () => {

    it('should register Elius if he doesn\'t exist', function(){
        return testingFrom(server)
                .post('/api/auth/register')
                .send({username: "Elius", password: "elvint_!#ded"})
                .then(res => {
                    expect(res.status).toBe(201)
                });
    }
) 


    it('should check to see if a new ticket was created by a student', async () => {
       
                    await testingFrom(server)
                    .post('/api/auth/login')
                    .send({username: "Elius", password: "elvint_!#ded"})
                    .then(async res => {
                         //let tokenValue = res.body.token;
                         const secret = 'is it secret, is it safe?'
                         let authorization = await res.body.token;
                         
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
                        .post('/api/students')
                        .set('Authorization', authorization)
                        .then(async res => {
                            // let tokenValue = res.body.token;
                            // let pathId = res.body.student_id
                            const secret = 'is it secret, is it safe?'
                            //  async function waitForAuth(res) {
                            //     await res
                                
                            //  }

                            let authorization = await res.body.token;
                            console.log("Elius auth", authorization)
                            jwt.verify(authorization, secret , async function (err, decoded) {
                                 if(err){
                                  return
                            
                                }else{
                                   res.user = decoded;
                                let delayForUser = () => {return res.user}
                                   await delayForUser()
                                }
                              }) 
                              console.log('Elius student id', res.body.user.student_id)
                              let studentID = await res.body.user.student_id;
                            return testingFrom(server)
                            .post(`/api/tickets/create/${studentID}`)
                            .set('Authorization', authorization)
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
                        .then(async res => {
                             //let tokenValue = res.body.token;
                             const secret = process.env.JWT_SECRET || 'is it secret, is it safe?'
                             let authorization = await res.body.token;
                             jwt.verify(authorization, secret , async function (err, decoded) {
                                 if(err){
                                   return
                             
                                 }else{
                                   res.user = decoded;
                                   let delayForUser = () => {return res.user}
                                   await delayForUser()
                                 }
                               }) 

                               console.log("you there Septimus?", authorization)
                            await testingFrom(server)
                            .post('/api/students')
                            .set('Authorization', authorization)
                            .then(async res => {
                                console.log("undefined??", res.body)
                               // let tokenValue = res.body.token;
                                const secret = process.env.JWT_SECRET || 'is it secret, is it safe?'
                                let authorization = await res.body.token;
                                jwt.verify(authorization, secret , async function (err, decoded) {
                                    if(err){
                                      return
                                
                                    }else{
                                      res.user = decoded;
                                      let delayForUser = () => {return res.user}
                                      await delayForUser()
                                    }
                                  }) 
                                  console.log('whyyyyy', authorization)
                                return testingFrom(server)
                                .post(`/api/tickets/create/1`)
                                .set('Authorization', authorization)
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
                        .then(async res => {
                             //let tokenValue = res.body.token;
                             const secret = process.env.JWT_SECRET || 'is it secret, is it safe?'
                             let authorization = await res.body.token;
                             jwt.verify(authorization, secret , async function (err, decoded) {
                                 if(err){
                                   return
                             
                                 } else{
                                   res.user = decoded;

                                   let delayForUser = () => {return res.user}
                                   await delayForUser()
                                 }
                               }) 
                            return testingFrom(server)
                            .post('/api/helpers')
                            .set('Authorization', authorization)
                            .then(async res => {
                                //let tokenValue = res.body.token;
                                //let pathId = res.body.user.helper_id
                                const secret = process.env.JWT_SECRET || 'is it secret, is it safe?'
                                let authorization = await res.body.token;
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
                                .get(`/api/tickets/helper`)
                                .set('Authorization', authorization)
                                .then(res => {
                                    expect(Array.isArray(res.body)).toBe(true)
    
                                })
                            });
                        });
                    });






        })
    

        describe('tickets GET STUDENT Tickets', () => {

            it('should register Noveta if she doesn\'t exist', function(){
                return testingFrom(server)
                        .post('/api/auth/register')
                        .send({username: "Noventa", password: "neenth_!#ded"})
                        .then(res => {
                            expect(res.status).toBe(201)
                        });
            }
        ) 
    
        it('should register Teinia if she doesn\'t exist', function(){
            return testingFrom(server)
                    .post('/api/auth/register')
                    .send({username: "Teinia", password: "teth_!#ded"})
                    .then(res => {
                        expect(res.status).toBe(201)
                    });
        }
    ) 
        
        
            it('should return tickets created by Teinia only', async () => {
               
                            return testingFrom(server)
                            .post('/api/auth/login')
                            .send({username: "Noventa", password: "neenth_!#ded"})
                            .then(async res => {
                                 let tokenValue =  await res.body.token;
                                return testingFrom(server)
                                .post('/api/students')
                                .set('Authorization', tokenValue)
                                .then(async res => {
                                    let tokenValue = await res.body.token;
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
                                        .send({username: "Teinia", password: "teth_!#ded"})
                                        .then(async res => {
                                             let tokenValue = await res.body.token;
                                            return testingFrom(server)
                                            .post('/api/helpers')
                                            .set('Authorization', tokenValue)
                                            .then(async res => {
                                                let tokenValue = await res.body.token;
                                               

                                                return testingFrom(server)
                                                        .post('/api/students')
                                                        .set('Authorization', tokenValue)
                                                        .then(async res => {
                                                            let tokenValue = await res.body.token;
                                                            let pathId = await res.body.user.student_id
                                                            
                                                            return testingFrom(server)
                                                            .post(`/api/tickets/create/${pathId}`)
                                                            .set('Authorization', tokenValue)
                                                            .send({	category: "Vue",
                                                            title: "wow",
                                                            description:"type",
                                                            what_was_tried:"nothing"})
                                                            .then(res=> {
                                                                console.log("vue ticket", res.body)
                                                                return testingFrom(server)
                                                                        .post('/api/auth/login')
                                                                        .send({username: "Teinia", password: "teth_!#ded"})
                                                                        .then(async res=> { 
                                                                            const secret = process.env.JWT_SECRET || 'is it secret, is it safe?'
                                                                            let authorization = await res.body.token;
                                                                            jwt.verify(authorization, secret , async function (err, decoded) {
                                                                                if(err){
                                                                                  return
                                                                            
                                                                                }else{
                                                                                  res.user = decoded;
                                                                                  let delayForUser = () => {return res.user}
                                                                                  await delayForUser()
                                                                                }
                                                                              }) 
                                                                            //  let pathId = res.user.helper_id
                                                                            //  let studentId = res.user.student_id
                                                                             let tokenValue = await res.body.token;
                                                                             console.log("teinia token", res.body.token)
                                                                              return testingFrom(server)
                                                                            .get(`/api/tickets/${res.user.student_id}`)
                                                                            .set('Authorization', tokenValue)
                                                                            .then(async res => {
                                                                                const secret = process.env.JWT_SECRET || 'is it secret, is it safe?'
                                                                                let authorization = await tokenValue;
                                                                                jwt.verify(authorization, secret , async function (err, decoded) {
                                                                                    if(err){
                                                                                      return
                                                                                
                                                                                    }else{
                                                                                      res.user = decoded;
                                                                                      let delayForUser = () => {return res.user}
                                                                                      await delayForUser()
                                                                                    }
                                                                                  }) 
                                                                                console.log("student tickets body", res.body)
                                                                                expect(res.body[0].student_id).toBe(res.user.student_id)//res.user.student_id
                                                
                                                                            })
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

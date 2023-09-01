// url = "https://kasir-api.belajarqa.com"
// const request = require("supertest")(url)
// const expect = require("chai").expect;

// var userId = {};
// // const { token } = require('../Auth/login.js')

// // start testing
// describe("User", function(){
//     // var token = {};
//     it("Create User Successful", async function() { //testcase1
//         // const response1 = await request
//         // .post("/authentications") // HTTP method dan endpoint
//         // .send({
//         //     email: "toko1@gmail.com",
//         //     password: "sanber"
//         // });
//         // token = response1.body.data.accessToken
//         console.log("token:" + token);

//         const response = await request
//         .post("/users") // HTTP method dan endpoint
//         .set('Authorization', `Bearer ${token}`)
//         .send({
//             name: "Agnes",
//             email: "agnes@gmail.com",
//             password: "agnes"
//         });
//         // userId = response.body.data.userId
//         expect(response.status).to.eql(201)
//         expect(response.body.status).to.eql('success')
//         expect(response.body.message).to.eql('User berhasil ditambahkan')
//         userId = response.body.data.userId
//     })
//     it("Create User Empty Name", async function() { //testcase2
//         const response = await request
//         .post("/users") // HTTP method dan endpoint
//         .set('Authorization', `Bearer ${token}`)
//         .send({
//             name: "",
//             email: "agnes@gmail.com",
//             password: "agnes"
//         });
//         expect(response.status).to.eql(400);
//         expect(response.body.status).to.eql('fail');
//         expect(response.body.message).to.eql('\"name\" is not allowed to be empty');
//     })
//     it("Create User Empty Email", async function() { //testcase3
//         const response = await request
//         .post("/users") // HTTP method dan endpoint
//         .set('Authorization', `Bearer ${token}`)
//         .send({
//             name: "Agnes",
//             email: "",
//             password: "agnes"
//         });
//         expect(response.status).to.eql(400)
//         expect(response.body.status).to.eql('fail')
//         expect(response.body.message).to.eql('\"email\" is not allowed to be empty')
//     })
//     it("Create User Empty Password", async function() { //testcase4
//         const response = await request
//         .post("/users") // HTTP method dan endpoint
//         .set('Authorization', `Bearer ${token}`)
//         .send({
//             name: "Agnes",
//             email: "agnes@gmail.com",
//             password: ""
//         });
//         expect(response.status).to.eql(400)
//         expect(response.body.status).to.eql('fail')
//         expect(response.body.message).to.eql('\"password\" is not allowed to be empty')
//     })
// })
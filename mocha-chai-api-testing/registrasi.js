// const request = require("supertest")("https://kasir-api.belajarqa.com")
// const expect = require("chai").expect;

// // start testing
// describe("Register", function(){
//     it("Register Successful", async function() { //testcase1
//         const response = await request
//             .post("/registration") // HTTP method dan endpoint
//             .set("Content-Type", "application/json")
//             .send({
//                 name: "Toko Serbaguna",
//                 email: "toko1@gmail.com",
//                 password: "sanber"
//         });
//         expect(response.status).to.eql(201)
//         expect(response.body.message).to.eql('Toko berhasil didaftarkan')
//         expect(response.body.data.name).to.eql('Toko Serbaguna')
//         expect(response.body.data.email).to.eql('toko1@gmail.com')
//     })
//     it("Register Empty Name", async function() { //testcase2
//         const response = await request
//         .post("/registration") // HTTP method dan endpoint
//         .set("Content-Type", "application/json")
//         .send({
//             name: "",
//             email: "toko1@gmail.com",
//             password: "sanber"
//         });
//         expect(response.status).to.eql(400)
//         expect(response.body.message).to.eql('\"name\" is not allowed to be empty')
//     })
//     it("Register Empty Email", async function() { //testcase3
//         const response = await request
//         .post("/registration") // HTTP method dan endpoint
//         .set("Content-Type", "application/json")
//         .send({
//             name: "Toko Serbaguna",
//             email: "",
//             password: "sanber"
//         });
//         expect(response.status).to.eql(400)
//         expect(response.body.message).to.eql('\"email\" is not allowed to be empty')
//     })
//     it("Register Empty Password", async function() { //testcase4
//         const response = await request
//         .post("/registration") // HTTP method dan endpoint
//         .set("Content-Type", "application/json")
//         .send({
//             name: "Toko Serbaguna",
//             email: "toko1@gmail.com",
//             password: ""
//         });
//         expect(response.status).to.eql(400)
//         expect(response.body.message).to.eql('\"password\" is not allowed to be empty')
//     })
//     it("Register Invalid Email", async function() { //testcase4
//         const response = await request
//         .post("/registration") // HTTP method dan endpoint
//         .set("Content-Type", "application/json")
//         .send({
//             name: "Toko Serbaguna",
//             email: "toko1@gmail.col",
//             password: "sanber"
//         });
//         expect(response.status).to.eql(400)
//         expect(response.body.message).to.eql('\"email\" must be a valid email')
//     })
//     it("Register Empty", async function() { //testcase4
//         const response = await request
//         .post("/registration") // HTTP method dan endpoint
//         .set("Content-Type", "application/json")
//         .send({
//         });
//         expect(response.status).to.eql(400)
//         expect(response.body.message).to.eql('\"name\" is required')
//     })
// })
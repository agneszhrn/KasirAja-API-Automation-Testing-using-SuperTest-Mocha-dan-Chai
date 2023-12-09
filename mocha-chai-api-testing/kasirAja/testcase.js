url = "https://kasir-api.belajarqa.com"
const request = require("supertest")(url)
const expect = require("chai").expect; // assertion library

var token = {};
// start testing
describe("Register", function() {
    it("Register Successful", async function() { //testcase1
        const response = await request
            .post("/registration") // HTTP method dan endpoint
            .set("Content-Type", "application/json") // Headers
            .send({
                name: "Toko Serbaguna",
                email: "toko1@gmail.com",
                password: "sanber"
            });
        expect(response.status).to.eql(201)
        expect(response.body.message).to.eql('Toko berhasil didaftarkan')
        expect(response.body.data.name).to.eql('Toko Serbaguna')
        expect(response.body.data.email).to.eql('toko1@gmail.com')
    })
    it("Register Empty Name", async function() { //testcase2
        const response = await request
            .post("/registration") // HTTP method dan endpoint
            .set("Content-Type", "application/json")
            .send({
                name: "",
                email: "toko1@gmail.com",
                password: "sanber"
            });
        expect(response.status).to.eql(400)
        expect(response.body.message).to.eql('\"name\" is not allowed to be empty')
    })
    it("Register Empty Email", async function() { //testcase3
        const response = await request
            .post("/registration") // HTTP method dan endpoint
            .set("Content-Type", "application/json")
            .send({
                name: "Toko Serbaguna",
                email: "",
                password: "sanber"
            });
        expect(response.status).to.eql(400)
        expect(response.body.message).to.eql('\"email\" is not allowed to be empty')
    })
    it("Register Empty Password", async function() { //testcase4
        const response = await request
            .post("/registration") // HTTP method dan endpoint
            .set("Content-Type", "application/json")
            .send({
                name: "Toko Serbaguna",
                email: "toko1@gmail.com",
                password: ""
            });
        expect(response.status).to.eql(400)
        expect(response.body.message).to.eql('\"password\" is not allowed to be empty')
    })
    it("Register Invalid Email", async function() { //testcase4
        const response = await request
            .post("/registration") // HTTP method dan endpoint
            .set("Content-Type", "application/json")
            .send({
                name: "Toko Serbaguna",
                email: "toko1@gmail.col",
                password: "sanber"
            });
        expect(response.status).to.eql(400)
        expect(response.body.message).to.eql('\"email\" must be a valid email')
    })
    it("Register Empty", async function() { //testcase4
        const response = await request
            .post("/registration") // HTTP method dan endpoint
            .set("Content-Type", "application/json")
            .send({
            });
        expect(response.status).to.eql(400)
        expect(response.body.message).to.eql('\"name\" is required')
    })
});

describe("Login", function(){
    it("Login Successful", async function() { //testcase1
        const response = await request
            .post("/authentications") // HTTP method dan endpoint
            .set("Content-Type", "application/json")
            .send({
                email: "toko1@gmail.com",
                password: "sanber"
            });
        expect(response.status).to.eql(201)
        expect(response.body.status).to.eql('success')
        expect(response.body.message).to.eql('Authentication berhasil ditambahkan')
        token = response.body.data.accessToken
    })
    it("Login Empty Email", async function() { //testcase3
        const response = await request
            .post("/authentications") // HTTP method dan endpoint
            .set("Content-Type", "application/json")
            .send({
                email: "",
                password: "sanber"
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"email\" is not allowed to be empty')
    })
    it("Login Empty Password", async function() { //testcase3
        const response = await request
            .post("/authentications") // HTTP method dan endpoint
            .set("Content-Type", "application/json")
            .send({
                email: "toko1@gmail.com",
                password: ""
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"password\" is not allowed to be empty')
    })
    it("Login Invalid Email", async function() { //testcase4
        const response = await request
            .post("/authentications") // HTTP method dan endpoint
            .set("Content-Type", "application/json")
            .send({
                email: "toko1@gmail.col",
                password: "sanber"
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"email\" must be a valid email')
    })
    it("Login Invalid Password", async function() { //testcase4
        const response = await request
            .post("/authentications") // HTTP method dan endpoint
            .set("Content-Type", "application/json")
            .send({
                email: "toko1@gmail.com",
                password: "123"
            });
        expect(response.status).to.eql(401)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('Kredensial yang Anda berikan salah')
    })
});

describe("Create User", function(){
    it("Create User Successful", async function() { // TC 1
        const response = await request
            .post("/users") // HTTP method dan endpoint
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: "Agnes",
                email: "agnes@gmail.com",
                password: "agnes"
            });
        expect(response.status).to.eql(201)
        expect(response.body.status).to.eql('success')
        expect(response.body.message).to.eql('User berhasil ditambahkan')
        userId = response.body.data.userId
    })
    it("Create User Empty Name", async function() { // TC 2
        const response = await request
            .post("/users") // HTTP method dan endpoint
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: "",
                email: "agnes@gmail.com",
                password: "agnes"
            });
        expect(response.status).to.eql(400);
        expect(response.body.status).to.eql('fail');
        expect(response.body.message).to.eql('\"name\" is not allowed to be empty');
    })
    it("Create User Empty Email", async function() { // TC 3
        const response = await request
            .post("/users") // HTTP method dan endpoint
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: "Agnes",
                email: "",
                password: "agnes"
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"email\" is not allowed to be empty')
    })
    it("Create User Empty Password", async function() { // TC 4
        const response = await request
            .post("/users") // HTTP method dan endpoint
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: "Agnes",
                email: "agnes@gmail.com",
                password: ""
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"password\" is not allowed to be empty')
    })
    it("Create User Invalid Email", async function() { // TC 5
        const response = await request
            .post("/users") // HTTP method dan endpoint
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: "Agnes",
                email: "agnes@gmail.col",
                password: "agnes"
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"email\" must be a valid email')
    })
    it("Create User Empty", async function() { // TC 6
        const response = await request
            .post("/users") // HTTP method dan endpoint
            .set('Authorization', `Bearer ${token}`)
            .send({
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"name\" is required')
    })
});

describe("Get User Detail", function(){
    it("Get User Detail Successful", async function() { // TC 7
        const response = await request
            .get(`/users/${userId}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${token}`)
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
    })
    it("Get User Detail All Users", async function() { // TC 8
        const response = await request
            .get(`/users`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${token}`)
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
    })
});

describe("Get User List", function(){
    it("Get User List Successful", async function() { // TC 9
        const response = await request
            .get(`/users`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${token}`)
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
    })
});

describe("Update User", function(){
    it("Update User Successful", async function() { // TC 10
        const response = await request
            .put(`/users/${userId}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${token}`)
            .send({
                "name": "Agnes Zahrani",
                "email": "agnes@gmail.com"
            });
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
        expect(response.body.message).to.eql('User berhasil diupdate')
    })
    it("Update User Invalid Id", async function() { // TC 11
        const response = await request
            .put(`/users/123`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${token}`)
            .send({
                "name": "Agnes Zahrani",
                "email": "agnes@gmail.com"
            });
        expect(response.status).to.eql(404)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('id tidak valid')
    })
});

describe("Delete User", function(){
    it("Delete User Successful", async function() { // TC 12
        const response = await request
            .delete(`/users/${userId}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${token}`)
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
        expect(response.body.message).to.eql('User berhasil dihapus')
    })
    it("Delete User Invalid Id", async function() { // TC 13
        const response = await request
            .delete(`/users/abc`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${token}`)
        expect(response.status).to.eql(404)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('id tidak valid')
    })
});

describe("Add Unit", function(){
    it("Add Unit Successful", async function() { // TC 14
        const response = await request
            .post(`/units`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${token}`)
            .send({
                "name": "gram",
                "description": "weight measurement"
            });
        unitId = response.body.data.unitId
        expect(response.status).to.eql(201)
        expect(response.body.status).to.eql('success')
        expect(response.body.message).to.eql('Unit berhasil ditambahkan')
    })
    it("Add Unit Empty Name", async function() { // TC 15
        const response = await request
            .post(`/units`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${token}`)
            .send({
                "name": "",
                "description": "weight measurement"
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('name is required, description is optional')
    })
    it("Add Unit Empty Description", async function() { // TC 16
        const response = await request
            .post(`/units`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${token}`)
            .send({
                "name": "",
                "description": ""
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('name is required, description is optional')
    })
});

describe("Get Unit Detail", function(){
    it("Get Unit Detail Successful", async function() { // TC 17
        const response = await request
            .get(`/units/${unitId}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${token}`)
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
    })
});

describe("Get Unit List", function(){
    it("Get Unit List Successful", async function() { // TC 18
        const response = await request
            .get(`/units`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${token}`)
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
    })
});

describe("Update Unit", function(){
    it("Update Unit Successful", async function() { // TC 19
        const response = await request
            .put(`/units/${unitId}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${token}`)
            .send({
                "name": "update-meter",
                "description": "no-meter"
            });
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
    })
    it("Update Unit Invalid unitId", async function() { // TC 20
        const response = await request
            .put(`/units/abc`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${token}`)
            .send({
                "name": "update-meter",
                "description": "no-meter"
            });
        expect(response.status).to.eql(404)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('id tidak valid')
    })
});

describe("Delete Unit", function(){
    it("Delete Unit Successful", async function() { // TC 21
        const response = await request
            .delete(`/units/${unitId}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${token}`)
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
    })
    it("Delete Unit Invalid Id", async function() { // TC 22
        const response = await request
            .delete(`/units/abc`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${token}`)
        expect(response.status).to.eql(404)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('id tidak valid')
    })
});
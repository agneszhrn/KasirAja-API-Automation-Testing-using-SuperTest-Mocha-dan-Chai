url = "https://kasir-api.belajarqa.com"
const request = require("supertest")(url)
const expect = require("chai").expect; // assertion library
const fs = require("fs"); // importing the fs module
const variable = require('./variables.json'); // for reading json file

//start testing
describe("Create User", function(){
    it("TC-015 - Create user successful", async function() {
        const response = await request
            .post("/users") // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                name: "Kasir Serbaguna",
                email: "kasirserbaguna@gmail.com",
                password: "kasir123"
            });
        // save variable
        variable['userId'] = response.body.data.userId
        variable['userName'] = response.body.data.name
        variable['userEmail'] = "kasirserbaguna@gmail.com"
        variable['userPassword'] = "kasir123"
        fs.writeFileSync('kasirAja/variables.json', JSON.stringify(variable, null, 2), err => {
            if (err) {
                console.log(err);
            }
        });
        expect(response.status).to.eql(201)
        expect(response.body.status).to.eql('success')
        expect(response.body.message).to.eql('User berhasil ditambahkan')
        expect(response.body.data.userId).to.eql(variable.userId)
        expect(response.body.data.name).to.eql(variable.userName)
    })
    it("TC-006 - Create user empty name", async function() {
        const response = await request
            .post("/users") // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                name: "",
                email: variable.userEmail,
                password: variable.userPassword
            });
        expect(response.status).to.eql(400);
        expect(response.body.status).to.eql('fail');
        expect(response.body.message).to.eql('\"name\" is not allowed to be empty');
    })
    it("TC-017 - Create user empty email", async function() {
        const response = await request
            .post("/users") // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                name: variable.userName,
                email: "",
                password: variable.userPassword
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"email\" is not allowed to be empty')
    })
    it("TC-018 - Create user empty password", async function() {
        const response = await request
            .post("/users") // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                name: variable.userName,
                email: variable.userEmail,
                password: ""
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"password\" is not allowed to be empty')
    })
    it("TC-019 - Create user invalid email", async function() {
        const response = await request
            .post("/users") // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                name: variable.userName,
                email: "kasirserbaguna@gmail.col",
                password: variable.userPassword
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"email\" must be a valid email')
    })
    it("TC-020 - Create user empty", async function() {
        const response = await request
            .post("/users") // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"name\" is required')
    })
});

describe("Get User Detail", function(){
    it("TC-021 - Get user detail successful", async function() {
        const response = await request
            .get(`/users/${variable.userId}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
    })
    it("TC-022 - Get user detail all users", async function() {
        const response = await request
            .get(`/users`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
    })
});

describe("Get User List", function(){
    it("TC-023 - Get user list successful", async function() {
        const response = await request
            .get(`/users`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
    })
    it("TC-024 - Get user list page 1", async function() {
        const response = await request
            .get(`/users?p=1`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .set('p', 1)
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
        expect(response.body.data.meta.page).to.eql(1)
    })
    it("TC-025 - Get user list by user name", async function() {
        const response = await request
            .get(`/users?q=${variable.userName}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .set('q', variable.userName)
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
        expect(response.body.data.users[0].name).to.eql(variable.userName)
    })
    it("TC-026 - Get user list by page & user name", async function() {
        const response = await request
            .get(`/users?p=1&q=${variable.userName}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .set('p', 1)
            .set('q', variable.userName)
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
        expect(response.body.data.meta.page).to.eql(1)
        expect(response.body.data.users[0].name).to.eql(variable.userName)
    })
});

describe("Update User", function(){
    it("TC-027 - Update user successful", async function() {
        const response = await request
            .put(`/users/${variable.userId}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "name": "Kasir Serbaguna 123",
                "email": "kasirserbaguna123@gmail.com"
            });
        // update variable
        variable['userName'] = response.body.data.name
        variable['userEmail'] = "kasirserbaguna123@gmail.com"
        fs.writeFileSync('kasirAja/variables.json', JSON.stringify(variable, null, 2), err => {
            if (err) {
                console.log(err);
            }
        });
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
        expect(response.body.message).to.eql('User berhasil diupdate')
        expect(response.body.data.name).to.eql(variable.userName)
    })
    it("TC-028 - Update user invalid id", async function() {
        const response = await request
            .put(`/users/abc123`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "name": "Kasir Serbaguna 123",
                "email": "kasirserbaguna123@gmail.com"
            });
        expect(response.status).to.eql(404)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('id tidak valid')
    })
});

describe("Delete User", function(){
    it("TC-029 - Delete user successful", async function() {
        const response = await request
            .delete(`/users/${variable.userId}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
        // update variable
        delete variable.userId
        delete variable.userName
        delete variable.userEmail
        delete variable.userPassword
        fs.writeFileSync('kasirAja/variables.json', JSON.stringify(variable, null, 2), err => {
            if (err) {
                console.log(err);
            }
        });
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
        expect(response.body.message).to.eql('User berhasil dihapus')
    })
    it("TC-030 - Delete user invalid id", async function() {
        const response = await request
            .delete(`/users/abc123`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
        expect(response.status).to.eql(404)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('id tidak valid')
    })
});
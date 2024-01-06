url = "https://kasir-api.belajarqa.com"
const request = require("supertest")(url)
const expect = require("chai").expect; // assertion library
const fs = require("fs"); // importing the fs module to  read and write file
const variable = require('./variables.json'); // for reading json file

// start testing
describe("Login Successful", function(){
    it("TC-007 - Login successful with valid data", async function() {
        const response = await request
            .post("/authentications") // HTTP method dan endpoint
            .set("Content-Type", "application/json")
            .send({
                email: variable.email,
                password: variable.password
            });
        expect(response.status).to.eql(201)
        expect(response.body.status).to.eql('success')
        expect(response.body.message).to.eql('Authentication berhasil ditambahkan')
        // save variable
        variable['accessToken'] = response.body.data.accessToken
        variable['refreshToken'] = response.body.data.refreshToken
        fs.writeFileSync('kasirAja/variables.json', JSON.stringify(variable, null, 2), err => {
            if (err) {
                console.log(err);
            }
        });
        // console.log("response status :", response.status)
        // console.log("response body message :", response.body.message)
    })
    it("TC-008 - Login with empty email", async function() {
        const response = await request
            .post("/authentications") // HTTP method dan endpoint
            .set("Content-Type", "application/json")
            .send({
                email: "",
                password: variable.password
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"email\" is not allowed to be empty')
    })
    it("TC-009 - Login with empty password", async function() {
        const response = await request
            .post("/authentications") // HTTP method dan endpoint
            .set("Content-Type", "application/json")
            .send({
                email: variable.email,
                password: ""
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"password\" is not allowed to be empty')
    })
    it("TC-010 - Login with invalid email", async function() {
        const response = await request
            .post("/authentications") // HTTP method dan endpoint
            .set("Content-Type", "application/json")
            .send({
                email: "toko1@gmail.col",
                password: variable.password
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"email\" must be a valid email')
    })
    it("TC-011 - Login with invalid password", async function() {
        const response = await request
            .post("/authentications") // HTTP method dan endpoint
            .set("Content-Type", "application/json")
            .send({
                email: variable.email,
                password: "123"
            });
        expect(response.status).to.eql(401)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('Kredensial yang Anda berikan salah')
    })
    it("TC-012 - Login empty", async function() {
        const response = await request
            .post("/authentications") // HTTP method dan endpoint
            .set("Content-Type", "application/json")
            .send({
                
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"email\" is required')
    })
});

describe("Refresh Token", function(){
    it("TC-013 - Refresh token successful", async function() {
        const response = await request
            .put("/authentications") // HTTP method dan endpoint
            .set("Content-Type", "application/json")
            .send({
                refreshToken: variable.refreshToken
            });
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
        expect(response.body.message).to.eql('Access Token berhasil diperbarui')
        // save variable
        variable['accessToken'] = response.body.data.accessToken
        fs.writeFileSync('kasirAja/variables.json', JSON.stringify(variable, null, 2), err => {
            if (err) {
                console.log(err);
            }
        });
    })
    it("TC-014 - Refresh token empty", async function() {
        const response = await request
            .put("/authentications") // HTTP method dan endpoint
            .set("Content-Type", "application/json")
            .send({
                refreshToken: ""
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"refreshToken\" is not allowed to be empty')
    })
});
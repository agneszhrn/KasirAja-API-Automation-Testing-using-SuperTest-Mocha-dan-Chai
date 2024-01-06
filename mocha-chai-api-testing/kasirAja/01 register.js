url = "https://kasir-api.belajarqa.com"
const request = require("supertest")(url)
const expect = require("chai").expect; // assertion library
const fs = require("fs"); // importing the fs module to  read and write file
const variable = require('./variables.json'); // for reading json file

// start testing
describe("Registration Successful", function() {
    it("TC-001 - Registration successful with valid data", async function() {
        const response = await request
            .post("/registration") // HTTP method dan endpoint
            .set("Content-Type", "application/json") // Headers
            .send({
                name: "Toko ABC",
                email: "tokoabc@gmail.com",
                password: "tokoabc123"
            })
        // save variable
        variable['name'] = response.body.data.name
        variable['email'] = response.body.data.email
        variable['password'] = "tokoabc123"
        fs.writeFileSync('kasirAja/variables.json', JSON.stringify(variable, null, 2), err => {
            if (err) {
                console.log(err);
            }
        });
        expect(response.status).to.eql(201)
        expect(response.body.status).to.eql('success')
        expect(response.body.message).to.eql('Toko berhasil didaftarkan')
        expect(response.body.data.name).to.eql(variable.name)
        expect(response.body.data.email).to.eql(variable.email)
    })
    it("TC-002 - Registration with empty name", async function() {
        const response = await request
            .post("/registration") // HTTP method dan endpoint
            .set("Content-Type", "application/json")
            .send({
                name: "",
                email: variable.email,
                password: variable.password
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"name\" is not allowed to be empty')
    })
    it("TC-003 - Registration with empty email", async function() {
        const response = await request
            .post("/registration") // HTTP method dan endpoint
            .set("Content-Type", "application/json")
            .send({
                name: variable.name,
                email: "",
                password: variable.password
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"email\" is not allowed to be empty')
    })
    it("TC-004 - Registration with empty password", async function() {
        const response = await request
            .post("/registration") // HTTP method dan endpoint
            .set("Content-Type", "application/json")
            .send({
                name: variable.name,
                email: variable.email,
                password: ""
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"password\" is not allowed to be empty')
    })
    it("TC-005 - Registration with invalid email", async function() {
        const response = await request
            .post("/registration") // HTTP method dan endpoint
            .set("Content-Type", "application/json")
            .send({
                name: variable.name,
                email: "tokoabc@gmail.col",
                password: variable.password
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"email\" must be a valid email')
    })
    it("TC-006 - Registration empty", async function() {
        const response = await request
            .post("/registration") // HTTP method dan endpoint
            .set("Content-Type", "application/json")
            .send({

            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"name\" is required')
    })
});
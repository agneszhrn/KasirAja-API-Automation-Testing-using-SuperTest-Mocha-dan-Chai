const request = require("supertest")("https://kasir-api.belajarqa.com")
const expect = require("chai").expect;

// start testing
describe("scenario testing KasirAja", function(){
    // it.only("registration", async function() { //testcase1
    it("registration", async function() { //testcase1
        const response = await request
        .post("/registration") // HTTP method dan endpoint
        .set("Content-Type", "application/json")
        .send({
            name: "Toko Serbaguna",
            email: "toko1@gmail.com",
            password: "sanber"
        });
        expect(response.status).to.eql(201)
        expect(response.body.status).to.eql('success')
        expect(response.body.message).to.eql('Toko berhasil didaftarkan')
        expect(response.body.data.name).to.eql('Toko Serbaguna')
        expect(response.body.data.email).to.eql('toko1@gmail.com')
        // var token = response.body.data.accessToken
        // console.log (token)
    })
    it.skip("registration", async function() { //testcase2
        
    })
})
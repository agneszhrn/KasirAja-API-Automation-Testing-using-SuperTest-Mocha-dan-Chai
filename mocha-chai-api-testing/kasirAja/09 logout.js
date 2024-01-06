url = "https://kasir-api.belajarqa.com"
const request = require("supertest")(url)
const expect = require("chai").expect; // assertion library
const fs = require("fs"); // importing the fs module to  read and write file
const variable = require('./variables.json'); // for reading json file

// start testing
describe("Logout", function(){
    it("TC-151 - Logout successful", async function() {
        const response = await request
            .delete(`/authentications`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                refreshToken: variable.refreshToken
            });
        // update variable
        delete variable.name
        delete variable.email
        delete variable.password
        delete variable.accessToken
        delete variable.refreshToken
        delete variable.currentdate
        delete variable.futuredate
        delete variable.purchaseId
        delete variable.saleId
        fs.writeFileSync('kasirAja/variables.json', JSON.stringify(variable, null, 2), err => {
            if (err) {
                console.log(err);
            }
        });
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
        expect(response.body.message).to.eql('Refresh token berhasil dihapus')
    })
});
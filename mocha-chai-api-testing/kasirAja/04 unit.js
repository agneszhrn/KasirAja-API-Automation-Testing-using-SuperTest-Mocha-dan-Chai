url = "https://kasir-api.belajarqa.com"
const request = require("supertest")(url)
const expect = require("chai").expect; // assertion library
const fs = require("fs"); // importing the fs module
const variable = require('./variables.json'); // for reading json file

// start testing
describe("Add Unit", function(){
    it("TC-031 - Add unit successful", async function() { 
        const response = await request
            .post(`/units`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "name": "gram",
                "description": "weight measurement"
            });
        // save variable
        variable['unitId'] = response.body.data.unitId
        variable['unitName'] = response.body.data.name
        fs.writeFileSync('kasirAja/variables.json', JSON.stringify(variable, null, 2), err => {
            if (err) {
                console.log(err);
            }
        });
        expect(response.status).to.eql(201)
        expect(response.body.status).to.eql('success')
        expect(response.body.message).to.eql('Unit berhasil ditambahkan')
        expect(response.body.data.unitId).to.eql(variable.unitId)
        expect(response.body.data.name).to.eql(variable.unitName)
    })
    it("TC-032 - Add unit empty name", async function() {
        const response = await request
            .post(`/units`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "name": "",
                "description": "weight measurement"
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('name is required, description is optional')
    })
    it("TC-033 - Add unit empty description", async function() {
        const response = await request
            .post(`/units`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "name": variable.unitName,
                "description": ""
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('name is required, description is optional')
    })
    it("TC-034 - Add unit empty", async function() {
        const response = await request
            .post(`/units`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('name is required, description is optional')
    })
});

describe("Get Unit Detail", function(){
    it("TC-035 - Get unit detail successful", async function() {
        const response = await request
            .get(`/units/${variable.unitId}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
        expect(response.body.data.unit.name).to.eql(variable.unitName)
    })
    it("TC-036 - Get unit detail invalid unit id", async function() {
        const response = await request
            .get(`/units/abc123`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
        expect(response.status).to.eql(404)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('id tidak valid')
    })
});

describe("Get Unit List", function(){
    it("TC-037 - Get unit list successful", async function() {
        const response = await request
            .get(`/units`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
    })
    it("TC-038 - Get unit list page 1", async function() {
        const response = await request
            .get(`/units`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .set('p', 1)
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
        expect(response.body.data.meta.page).to.eql(1)
    })
    it("TC-039 - Get unit list by unit name", async function() {
        const response = await request
            .get(`/units`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .set('q', variable.unitName)
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
        expect(response.body.data.units[0].name).to.eql(variable.unitName)
    })
    it("TC-040 - Get unit list by page & unit name", async function() {
        const response = await request
            .get(`/units`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .set('p', 1)
            .set('q', variable.unitName)
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
        expect(response.body.data.meta.page).to.eql(1)
        expect(response.body.data.units[0].name).to.eql(variable.unitName)
    })
});

describe("Update Unit", function(){
    it("TC-041 - Update unit successful", async function() {
        const response = await request
            .put(`/units/${variable.unitId}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "name": "update-meter",
                "description": "no-meter"
            });
        // update variable
        variable['unitName'] = response.body.data.name
        fs.writeFileSync('kasirAja/variables.json', JSON.stringify(variable, null, 2), err => {
            if (err) {
                console.log(err);
            }
        });
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
        expect(response.body.data.name).to.eql(variable.unitName)
    })
    it("TC-042 - Update unit empty name", async function() {
        const response = await request
            .put(`/units/${variable.unitId}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "name": "",
                "description": "no-meter"
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
    })
    it("TC-043 - Update unit empty description", async function() {
        const response = await request
            .put(`/units/${variable.unitId}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "name": "update-meter",
                "description": ""
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
    })
    it("TC-044 - Update unit empty", async function() {
        const response = await request
            .put(`/units/${variable.unitId}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
    })
    it("TC-045 - Update unit invalid unit id", async function() {
        const response = await request
            .put(`/units/abc123`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
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
    it("TC-046 - Delete unit successful", async function() {
        const response = await request
            .delete(`/units/${variable.unitId}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
        // update variable
        delete variable.unitId
        delete variable.unitName
        fs.writeFileSync('kasirAja/variables.json', JSON.stringify(variable, null, 2), err => {
            if (err) {
                console.log(err);
            }
        });
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
    })
    it("TC-047 - Delete unit invalid unit id", async function() {
        const response = await request
            .delete(`/units/abc123`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
        expect(response.status).to.eql(404)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('id tidak valid')
    })
});
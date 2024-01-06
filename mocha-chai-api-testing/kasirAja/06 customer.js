url = "https://kasir-api.belajarqa.com"
const request = require("supertest")(url)
const expect = require("chai").expect; // assertion library
const fs = require("fs"); // importing the fs module
const variable = require('./variables.json'); // for reading json file

// start testing
describe("Add Customer", function(){
    it("TC-065 - Add customer successful", async function() { 
        const response = await request
            .post(`/customers`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "name": "Budi",
                "phone": "081234567890",
                "address": "Bandoeng",
                "description": "Budi anak Pak Edi"
            });
        // save variable
        variable['customerId'] = response.body.data.customerId
        variable['customerName'] = response.body.data.name
        fs.writeFileSync('kasirAja/variables.json', JSON.stringify(variable, null, 2), err => {
            if (err) {
                console.log(err);
            }
        });
        expect(response.status).to.eql(201)
        expect(response.body.status).to.eql('success')
        expect(response.body.message).to.eql('Customer berhasil ditambahkan')
        expect(response.body.data.customerId).to.eql(variable.customerId)
        expect(response.body.data.name).to.eql(variable.customerName)
    })
    it("TC-066 - Add customer empty name", async function() {
        const response = await request
            .post(`/customers`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "name": "",
                "phone": "081234567890",
                "address": "Bandoeng",
                "description": "Budi anak Pak Edi"
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"name\" is not allowed to be empty')
    })
    it("TC-067 - Add customer empty description", async function() {
        const response = await request
            .post(`/customers`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "name": "Budi",
                "phone": "081234567890",
                "address": "Bandoeng",
                "description": ""
            });
        // EXPECTED TO FAIL, BUT ACTUAL TEST CASE SUCCESSFUL 201
        console.log("       TC-067 => This test case is expected to FAIL because the 'description' field is mandatory, but the actual test case succeeded at 201")
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"description\" is not allowed to be empty')
    })
    it("TC-068 - Add customer empty", async function() {
        const response = await request
            .post(`/customers`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"name\" is required')
    })
    it("TC-069 - Add customer phone is not number", async function() {
        const response = await request
            .post(`/customers`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "name": "Budi",
                "phone": "abc",
                "address": "Bandoeng",
                "description": ""
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"phone\" must be a number')
    })
});

describe("Get Customer Detail", function(){
    it("TC-070 - Get customer detail successful", async function() {
        const response = await request
            .get(`/customers/${variable.customerId}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
        expect(response.body.data.customer.name).to.eql(variable.customerName)
    })
    it("TC-071 - Get customer detail invalid customer id", async function() {
        const response = await request
            .get(`/customers/abc123`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
        expect(response.status).to.eql(404)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('id tidak valid')
    })
});

describe("Get Customer List", function(){
    it("TC-072 - Get customer list successful", async function() {
        const response = await request
            .get(`/customers`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
    })
    it("TC-073 - Get customer list page 1", async function() {
        const response = await request
            .get(`/customers`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .set('p', 1)
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
        expect(response.body.data.meta.page).to.eql(1)
    })
    it("TC-074 - Get customer list by customer name", async function() {
        const response = await request
            .get(`/customers`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .set('q', variable.customerName)
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
        expect(response.body.data.customers[0].name).to.eql(variable.customerName)
    })
    it("TC-075 - Get customer list by page & category name", async function() {
        const response = await request
            .get(`/customers`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .set('p', 1)
            .set('q', variable.customerName)
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
        expect(response.body.data.meta.page).to.eql(1)
        expect(response.body.data.customers[0].name).to.eql(variable.customerName)
    })
});

describe("Update Customer", function(){
    it("TC-076 - Update customer successful", async function() {
        const response = await request
            .put(`/customers/${variable.customerId}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "name": "Budi Doremi",
                "phone": "08987654321",
                "address": "Bandung",
                "description": "Pelanggan VIP"
            });
        // update variable
        variable['customerName'] = response.body.data.name
        fs.writeFileSync('kasirAja/variables.json', JSON.stringify(variable, null, 2), err => {
            if (err) {
                console.log(err);
            }
        });
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
        expect(response.body.data.name).to.eql(variable.customerName)
    })
    it("TC-077 - Update customer empty name", async function() {
        const response = await request
            .put(`/customers/${variable.customerId}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "name": "",
                "phone": "08987654321",
                "address": "Bandung",
                "description": "Pelanggan VIP"
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"name\" is not allowed to be empty')
    })
    it("TC-078 - Update customer empty phone", async function() {
        const response = await request
            .put(`/customers/${variable.customerId}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "name": "Budi Doremi",
                "phone": "",
                "address": "Bandung",
                "description": "Pelanggan VIP"
            });
        // EXPECTED TO FAIL, BUT ACTUAL TEST CASE SUCCESSFUL 201
        console.log("       TC-078 => This test case is expected to FAIL because the 'phone' field is mandatory, but the actual test case succeeded at 200")
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"phone\" is not allowed to be empty')
    })
    it("TC-079 - Update customer phone is not number", async function() {
        const response = await request
            .put(`/customers/${variable.customerId}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "name": "Budi Doremi",
                "phone": "abc",
                "address": "Bandung",
                "description": "Pelanggan VIP"
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
    })
    it("TC-080 - Update customer empty address", async function() {
        const response = await request
        .put(`/customers/${variable.customerId}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "name": "Budi Doremi",
                "phone": "08987654321",
                "address": "",
                "description": "Pelanggan VIP"
            });
        // EXPECTED TO FAIL, BUT ACTUAL TEST CASE SUCCESSFUL 201
        console.log("       TC-080 => This test case is expected to FAIL because the 'address' field is mandatory, but the actual test case succeeded at 200")
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"address\" is not allowed to be empty')
    })
    it("TC-081 - Update customer empty description", async function() {
        const response = await request
            .put(`/customers/${variable.customerId}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "name": "Budi Doremi",
                "phone": "08987654321",
                "address": "Bandung",
                "description": ""
            });
        // EXPECTED TO FAIL, BUT ACTUAL TEST CASE SUCCESSFUL 201
        console.log("       TC-081 => This test case is expected to FAIL because the 'description' field is mandatory, but the actual test case succeeded at 200")
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"description\" is not allowed to be empty')
    })
    it("TC-082 - Update customer empty", async function() {
        const response = await request
            .put(`/customers/${variable.customerId}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"name\" is required')
    })
    it("TC-083 - Update customer invalid customer id", async function() {
        const response = await request
            .put(`/customers/abc123`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "name": "Budi Doremi",
                "phone": "08987654321",
                "address": "Bandung",
                "description": "Pelanggan VIP"
            });
        expect(response.status).to.eql(404)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('id tidak valid')
    })
});

describe("Delete Customer", function(){
    it("TC-084 - Delete customer successful", async function() {
        const response = await request
            .delete(`/customers/${variable.customerId}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
        // update variable
        delete variable.customerId
        delete variable.customerName
        fs.writeFileSync('kasirAja/variables.json', JSON.stringify(variable, null, 2), err => {
            if (err) {
                console.log(err);
            }
        });
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
    })
    it("TC-085 - Delete customer invalid customer id", async function() {
        const response = await request
            .delete(`/customers/abc123`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
        expect(response.status).to.eql(404)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('id tidak valid')
    })
});
url = "https://kasir-api.belajarqa.com"
const request = require("supertest")(url)
const expect = require("chai").expect; // assertion library
const fs = require("fs"); // importing the fs module
const variable = require('./variables.json'); // for reading json file

// start testing
describe("Add Category", function(){
    it("TC-048 - Add category successful", async function() { 
        const response = await request
            .post(`/categories`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "name": "makanan ringan",
                "description": "makanan ringan dari indofood"
            });
        // save variable
        variable['categoryId'] = response.body.data.categoryId
        variable['categoryName'] = response.body.data.name
        fs.writeFileSync('kasirAja/variables.json', JSON.stringify(variable, null, 2), err => {
            if (err) {
                console.log(err);
            }
        });
        expect(response.status).to.eql(201)
        expect(response.body.status).to.eql('success')
        expect(response.body.message).to.eql('Category berhasil ditambahkan')
        expect(response.body.data.categoryId).to.eql(variable.categoryId)
        expect(response.body.data.name).to.eql(variable.categoryName)
    })
    it("TC-049 - Add category empty name", async function() {
        const response = await request
            .post(`/categories`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "name": "",
                "description": "makanan ringan dari indofood"
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"name\" is not allowed to be empty')
    })
    it("TC-050 - Add category empty description", async function() {
        const response = await request
            .post(`/categories`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "name": variable.categoryName,
                "description": ""
            });
        // EXPECTED TO FAIL, BUT ACTUAL TEST CASE SUCCESSFUL 201
        console.log("       TC-050 => This test case is expected to FAIL because the 'description' field is mandatory, but the actual test case succeeded at 201")
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"description\" is not allowed to be empty')
    })
    it("TC-051 - Add category empty", async function() {
        const response = await request
            .post(`/categories`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"name\" is required')
    })
});

describe("Get Category Detail", function(){
    it("TC-052 - Get category detail successful", async function() {
        const response = await request
            .get(`/categories/${variable.categoryId}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
        expect(response.body.data.category.name).to.eql(variable.categoryName)
    })
    it("TC-053 - Get category detail invalid category id", async function() {
        const response = await request
            .get(`/categories/abc123`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
        expect(response.status).to.eql(404)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('id tidak valid')
    })
});

describe("Get Category List", function(){
    it("TC-054 - Get category list successful", async function() {
        const response = await request
            .get(`/categories`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
    })
    it("TC-055 - Get category list page 1", async function() {
        const response = await request
            .get(`/categories`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .set('p', 1)
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
        expect(response.body.data.meta.page).to.eql(1)
    })
    it("TC-056 - Get category list by category name", async function() {
        const response = await request
            .get(`/categories`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .set('q', variable.categoryName)
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
        expect(response.body.data.categories[0].name).to.eql(variable.categoryName)
    })
    it("TC-057 - Get category list by page & category name", async function() {
        const response = await request
            .get(`/categories`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .set('p', 1)
            .set('q', variable.categoryName)
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
        expect(response.body.data.meta.page).to.eql(1)
        expect(response.body.data.categories[0].name).to.eql(variable.categoryName)
    })
});

describe("Update Category", function(){
    it("TC-058 - Update category successful", async function() {
        const response = await request
            .put(`/categories/${variable.categoryId}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "name": "update-minuman",
                "description": "no-minuman"
            });
        // update variable
        variable['categoryName'] = response.body.data.name
        fs.writeFileSync('kasirAja/variables.json', JSON.stringify(variable, null, 2), err => {
            if (err) {
                console.log(err);
            }
        });
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
        expect(response.body.data.name).to.eql(variable.categoryName)
    })
    it("TC-059 - Update category empty name", async function() {
        const response = await request
            .put(`/categories/${variable.categoryId}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "name": "",
                "description": "no-minuman"
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
    })
    it("TC-060 - Update category empty description", async function() {
        const response = await request
            .put(`/categories/${variable.categoryId}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "name": "update-minuman",
                "description": ""
            });
        // EXPECTED TO FAIL, BUT ACTUAL TEST CASE SUCCESSFUL 201
        console.log("       TC-060 => This test case is expected to FAIL because the 'description' field is mandatory, but the actual test case succeeded at 201")
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
    })
    it("TC-061 - Update category empty", async function() {
        const response = await request
            .put(`/categories/${variable.categoryId}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
    })
    it("TC-062 - Update category invalid category id", async function() {
        const response = await request
            .put(`/categories/abc123`) // HTTP method dan endpoint
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

describe("Delete Category", function(){
    it("TC-063 - Delete category successful", async function() {
        const response = await request
            .delete(`/categories/${variable.categoryId}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
        // update variable
        delete variable.categoryId
        delete variable.categoryName
        fs.writeFileSync('kasirAja/variables.json', JSON.stringify(variable, null, 2), err => {
            if (err) {
                console.log(err);
            }
        });
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
    })
    it("TC-064 - Delete category invalid category id", async function() {
        const response = await request
            .delete(`/categories/abc123`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
        expect(response.status).to.eql(404)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('id tidak valid')
    })
});
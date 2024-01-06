url = "https://kasir-api.belajarqa.com"
const request = require("supertest")(url)
const expect = require("chai").expect; // assertion library
const fs = require("fs"); // importing the fs module
const variable = require('./variables.json'); // for reading json file

// start testing
describe("Add Product", function(){
    it("TC-086 - Add product successful", async function() { 
        const response = await request
            .post(`/products`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "category_id": "811f547e-a24e-4f94-bfe1-b7ed7d11c03f",
                "code": "A314ASDDFIER3432",
                "name": "taro",
                "price": "3500",
                "cost": "3000",
                "stock": "5"
            });
        // save variable
        variable['productId'] = response.body.data.productId
        variable['productName'] = response.body.data.name
        fs.writeFileSync('kasirAja/variables.json', JSON.stringify(variable, null, 2), err => {
            if (err) {
                console.log(err);
            }
        });
        expect(response.status).to.eql(201)
        expect(response.body.status).to.eql('success')
        expect(response.body.message).to.eql('Product berhasil ditambahkan')
        expect(response.body.data.productId).to.eql(variable.productId)
        expect(response.body.data.name).to.eql(variable.productName)
    })
    it("TC-087 - Add product empty category id", async function() {
        const response = await request
            .post(`/products`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "category_id": "",
                "code": "A314ASDDFIER3432",
                "name": "taro",
                "price": "3500",
                "cost": "3000",
                "stock": "5"
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"category_id\" is not allowed to be empty')
    })
    it("TC-088 - Add product empty code", async function() {
        const response = await request
            .post(`/products`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "category_id": "811f547e-a24e-4f94-bfe1-b7ed7d11c03f",
                "code": "",
                "name": "taro",
                "price": "3500",
                "cost": "3000",
                "stock": "5"
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"code\" is not allowed to be empty')
    })
    it("TC-089 - Add product empty name", async function() {
        const response = await request
            .post(`/products`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "category_id": "811f547e-a24e-4f94-bfe1-b7ed7d11c03f",
                "code": "A314ASDDFIER3432",
                "name": "",
                "price": "3500",
                "cost": "3000",
                "stock": "5"
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"name\" is not allowed to be empty')
    })
    it("TC-090 - Add product empty price", async function() {
        const response = await request
            .post(`/products`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "category_id": "811f547e-a24e-4f94-bfe1-b7ed7d11c03f",
                "code": "A314ASDDFIER3432",
                "name": "taro",
                "price": "",
                "cost": "3000",
                "stock": "5"
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"price\" must be a number')  
    })
    it("TC-091 - Add product empty cost", async function() {
        const response = await request
            .post(`/products`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "category_id": "811f547e-a24e-4f94-bfe1-b7ed7d11c03f",
                "code": "A314ASDDFIER3432",
                "name": "taro",
                "price": "3500",
                "cost": "",
                "stock": "5"
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"cost\" must be a number')
    })
    it("TC-092 - Add product empty stock", async function() {
        const response = await request
            .post(`/products`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "category_id": "811f547e-a24e-4f94-bfe1-b7ed7d11c03f",
                "code": "A314ASDDFIER3432",
                "name": "taro",
                "price": "3500",
                "cost": "3000",
                "stock": ""
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"stock\" must be a number')
    })
    it("TC-093 - Add product empty", async function() {
        const response = await request
            .post(`/products`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"code\" is required')
    })
    it("TC-094 - Add product price is not number", async function() {
        const response = await request
            .post(`/products`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "category_id": "811f547e-a24e-4f94-bfe1-b7ed7d11c03f",
                "code": "A314ASDDFIER3432",
                "name": "taro",
                "price": "abc",
                "cost": "3000",
                "stock": "5"
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"price\" must be a number')
    })
    it("TC-095 - Add product cost is not number", async function() {
        const response = await request
            .post(`/products`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "category_id": "811f547e-a24e-4f94-bfe1-b7ed7d11c03f",
                "code": "A314ASDDFIER3432",
                "name": "taro",
                "price": "3500",
                "cost": "abc",
                "stock": "5"
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"cost\" must be a number')
    })
    it("TC-096 - Add product stock is not number", async function() {
        const response = await request
            .post(`/products`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "category_id": "811f547e-a24e-4f94-bfe1-b7ed7d11c03f",
                "code": "A314ASDDFIER3432",
                "name": "taro",
                "price": "3500",
                "cost": "3000",
                "stock": "abc"
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"stock\" must be a number')
    })
});

describe("Get Product Detail", function(){
    it("TC-097 - Get product detail successful", async function() {
        const response = await request
            .get(`/products/${variable.productId}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
        expect(response.body.data.product.name).to.eql(variable.productName)
    })
    it("TC-098 - Get product detail invalid product id", async function() {
        const response = await request
            .get(`/products/abc123`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
        expect(response.status).to.eql(404)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('id tidak valid')
    })
});

describe("Get Product List", function(){
    it("TC-099 - Get product list successful", async function() {
        const response = await request
            .get(`/products`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
    })
    it("TC-100 - Get product list page 1", async function() {
        const response = await request
            .get(`/products?page=1`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .set('p', 1)
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
        expect(response.body.data.meta.page).to.eql('1')
    })
    it("TC-101 - Get product list with stock", async function() {
        const response = await request
            .get(`/products?withStock=true`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .set('withStock', 'true')
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
        expect(response.body.data.products[0]).to.have.any.keys('stock')
    })
    it("TC-102 - Get product list with category", async function() {
        const response = await request
            .get(`/products?withCategory=true`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .set('withCategory', 'true')
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
        expect(response.body.data.products[0]).to.have.any.keys('category_name')
    })
    it("TC-103 - Get product list by product name", async function() {
        const response = await request
            .get(`/products?q=${variable.productName}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .set('q', variable.productName)
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
        expect(response.body.data.products[0]).to.have.any.keys('name')
    })
});

describe("Update Product", function(){
    it("TC-104 - Update product successful", async function() {
        const response = await request
            .put(`/products/${variable.productId}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "category_id" : "811f547e-a24e-4f94-bfe1-b7ed7d11c03f",
                "code": "A314ASDDFIER3432",
                "name": "taro",
                "price": "3500",
                "cost": "3000",
                "stock": "1"
            });
        // update variable
        variable['productName'] = response.body.data.name
        fs.writeFileSync('kasirAja/variables.json', JSON.stringify(variable, null, 2), err => {
            if (err) {
                console.log(err);
            }
        });
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
        expect(response.body.message).to.eql("Product berhasil diupdate")
        expect(response.body.data.name).to.eql(variable.productName)
    })
    it("TC-105 - Update product empty category id", async function() {
        const response = await request
            .put(`/products/${variable.productId}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "category_id" : "",
                "code": "A314ASDDFIER3432",
                "name": "taro",
                "price": "3500",
                "cost": "3000",
                "stock": "1"
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"category_id\" is not allowed to be empty')
    })
    it("TC-106 - Update product empty code", async function() {
        const response = await request
            .put(`/products/${variable.productId}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "category_id" : "811f547e-a24e-4f94-bfe1-b7ed7d11c03f",
                "code": "",
                "name": "taro",
                "price": "3500",
                "cost": "3000",
                "stock": "1"
            });
            expect(response.status).to.eql(400)
            expect(response.body.status).to.eql('fail')
            expect(response.body.message).to.eql('\"code\" is not allowed to be empty')
    })
    it("TC-107 - Update product empty name", async function() {
        const response = await request
            .put(`/products/${variable.productId}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "category_id" : "811f547e-a24e-4f94-bfe1-b7ed7d11c03f",
                "code": "A314ASDDFIER3432",
                "name": "",
                "price": "3500",
                "cost": "3000",
                "stock": "1"
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"name\" is not allowed to be empty')
    })
    it("TC-108 - Update product empty price", async function() {
        const response = await request
        .put(`/products/${variable.productId}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "category_id" : "811f547e-a24e-4f94-bfe1-b7ed7d11c03f",
                "code": "A314ASDDFIER3432",
                "name": "taro",
                "price": "",
                "cost": "3000",
                "stock": "1"
            });
            expect(response.status).to.eql(400)
            expect(response.body.status).to.eql('fail')
            expect(response.body.message).to.eql('\"price\" must be a number')
    })
    it("TC-109 - Update product empty cost", async function() {
        const response = await request
            .put(`/products/${variable.productId}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "category_id" : "811f547e-a24e-4f94-bfe1-b7ed7d11c03f",
                "code": "A314ASDDFIER3432",
                "name": "taro",
                "price": "3500",
                "cost": "",
                "stock": "1"
            });
            expect(response.status).to.eql(400)
            expect(response.body.status).to.eql('fail')
            expect(response.body.message).to.eql('\"cost\" must be a number')
    })
    it("TC-110 - Update product empty stock", async function() {
        const response = await request
            .put(`/products/${variable.productId}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "category_id" : "811f547e-a24e-4f94-bfe1-b7ed7d11c03f",
                "code": "A314ASDDFIER3432",
                "name": "taro",
                "price": "3500",
                "cost": "3000",
                "stock": ""
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"stock\" must be a number')
    })
    it("TC-111 - Update product empty", async function() {
        const response = await request
            .put(`/products/${variable.productId}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"code\" is required')
    })
    it("TC-112 - Update product invalid product id", async function() {
        const response = await request
            .put(`/products/abc123`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "category_id" : "811f547e-a24e-4f94-bfe1-b7ed7d11c03f",
                "code": "A314ASDDFIER3432",
                "name": "taro",
                "price": "3500",
                "cost": "3000",
                "stock": "1"
            });
        expect(response.status).to.eql(404)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('id tidak valid')
    })
});

describe("Delete Product", function(){
    it("TC-113 - Delete product successful", async function() {
        const response = await request
            .delete(`/products/${variable.productId}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
        // update variable
        delete variable.productId
        delete variable.productName
        fs.writeFileSync('kasirAja/variables.json', JSON.stringify(variable, null, 2), err => {
            if (err) {
                console.log(err);
            }
        });
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
        expect(response.body.message).to.eql('Product berhasil dihapus')
    })
    it("TC-114 - Delete product invalid product id", async function() {
        const response = await request
            .delete(`/products/abc123`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
        expect(response.status).to.eql(404)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('id tidak valid')
    })
});
url = "https://kasir-api.belajarqa.com"
const request = require("supertest")(url)
const expect = require("chai").expect; // assertion library
const fs = require("fs"); // importing the fs module
const variable = require('./variables.json'); // for reading json file

// save variable
variable['currentdate'] = new Date("2023-01-01");
variable['futuredate'] = new Date("2024-08-08");

fs.writeFileSync('kasirAja/variables.json', JSON.stringify(variable, null, 2), err => {
    if (err) {
        console.log(err);
    }
});


// start testing
describe("Add Sales", function(){
    it("TC-115 - Add sales successful", async function() { 
        const response = await request
            .post(`/sales`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "officeId": "2f458834-0b21-466f-9f56-d35a8ed6f6ba",
                "customerId": "811f547e-a24e-4f94-bfe1-b7ed7d11c03f",
                "date": "2023-02-01",
                "invoice": "INV001",
                "amount": 2000,
                "discount": 0,
                "description": "Pembelian pertama",
                "items" : [
                    {
                        "productId": "681fa14f-8bed-4bee-a4a3-5c15a9e3fc5d",
                        "quantity": 1,
                        "price": 2000
                    }
                ]
            });
        // save variable
        variable['saleId'] = response.body.data.saleId
        variable['salesName'] = response.body.data.name
        fs.writeFileSync('kasirAja/variables.json', JSON.stringify(variable, null, 2), err => {
            if (err) {
                console.log(err);
            }
        });
        expect(response.status).to.eql(201)
        expect(response.body.status).to.eql('success')
        expect(response.body.message).to.eql('transaksi ditambahkan')
        expect(response.body.data.saleId).to.eql(variable.saleId)
        expect(response.body.data.name).to.eql(variable.salesName)
    })
    it("TC-116 - Add sales empty office id", async function() {
        const response = await request
            .post(`/sales`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "officeId": "",
                "customerId": "811f547e-a24e-4f94-bfe1-b7ed7d11c03f",
                "date": "2023-02-01",
                "invoice": "INV001",
                "amount": 2000,
                "discount": 0,
                "description": "Pembelian pertama",
                "items" : [
                    {
                        "productId": "681fa14f-8bed-4bee-a4a3-5c15a9e3fc5d",
                        "quantity": 1,
                        "price": 2000
                    }
                ]
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"officeId\" is not allowed to be empty')
    })
    it("TC-117 - Add sales empty customer id", async function() {
        const response = await request
            .post(`/sales`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "officeId": "2f458834-0b21-466f-9f56-d35a8ed6f6ba",
                "customerId": "",
                "date": "2023-02-01",
                "invoice": "INV001",
                "amount": 2000,
                "discount": 0,
                "description": "Pembelian pertama",
                "items" : [
                    {
                        "productId": "681fa14f-8bed-4bee-a4a3-5c15a9e3fc5d",
                        "quantity": 1,
                        "price": 2000
                    }
                ]
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"customerId\" is not allowed to be empty')
    })
    it("TC-118 - Add sales date is not valid date", async function() {
        const response = await request
            .post(`/sales`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "officeId": "2f458834-0b21-466f-9f56-d35a8ed6f6ba",
                "customerId": "811f547e-a24e-4f94-bfe1-b7ed7d11c03f",
                "date": "abc",
                "invoice": "INV001",
                "amount": 2000,
                "discount": 0,
                "description": "Pembelian pertama",
                "items" : [
                    {
                        "productId": "681fa14f-8bed-4bee-a4a3-5c15a9e3fc5d",
                        "quantity": 1,
                        "price": 2000
                    }
                ]
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"date\" must be a valid date')
    })
    it("TC-119 - Add sales amount is not number", async function() {
        const response = await request
            .post(`/sales`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "officeId": "2f458834-0b21-466f-9f56-d35a8ed6f6ba",
                "customerId": "811f547e-a24e-4f94-bfe1-b7ed7d11c03f",
                "date": "2023-02-01",
                "invoice": "INV001",
                "amount": "2000pcs",
                "discount": 0,
                "description": "Pembelian pertama",
                "items" : [
                    {
                        "productId": "681fa14f-8bed-4bee-a4a3-5c15a9e3fc5d",
                        "quantity": 1,
                        "price": 2000
                    }
                ]
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"amount\" must be a number')  
    })
    it("TC-120 - Add sales discount is not number", async function() {
        const response = await request
            .post(`/sales`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "officeId": "2f458834-0b21-466f-9f56-d35a8ed6f6ba",
                "customerId": "811f547e-a24e-4f94-bfe1-b7ed7d11c03f",
                "date": "2023-02-01",
                "invoice": "INV001",
                "amount": 2000,
                "discount": "0%",
                "description": "Pembelian pertama",
                "items" : [
                    {
                        "productId": "681fa14f-8bed-4bee-a4a3-5c15a9e3fc5d",
                        "quantity": 1,
                        "price": 2000
                    }
                ]
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"discount\" must be a number')
    })
    it("TC-121 - Add sales empty product id", async function() {
        const response = await request
            .post(`/sales`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "officeId": "2f458834-0b21-466f-9f56-d35a8ed6f6ba",
                "customerId": "811f547e-a24e-4f94-bfe1-b7ed7d11c03f",
                "date": "2023-02-01",
                "invoice": "INV001",
                "amount": 2000,
                "discount": 0,
                "description": "Pembelian pertama",
                "items" : [
                    {
                        "productId": "",
                        "quantity": 1,
                        "price": 2000
                    }
                ]
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"items[0].productId\" is not allowed to be empty')
    })
    it("TC-122 - Add sales empty quantity", async function() {
        const response = await request
            .post(`/sales`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "officeId": "2f458834-0b21-466f-9f56-d35a8ed6f6ba",
                "customerId": "811f547e-a24e-4f94-bfe1-b7ed7d11c03f",
                "date": "2023-02-01",
                "invoice": "INV001",
                "amount": 2000,
                "discount": 0,
                "description": "Pembelian pertama",
                "items" : [
                    {
                        "productId": "681fa14f-8bed-4bee-a4a3-5c15a9e3fc5d",
                        "price": 2000
                    }
                ]
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"items[0].quantity\" is required')
    })
    it("TC-123 - Add sales quantity is not number", async function() {
        const response = await request
            .post(`/sales`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "officeId": "2f458834-0b21-466f-9f56-d35a8ed6f6ba",
                "customerId": "811f547e-a24e-4f94-bfe1-b7ed7d11c03f",
                "date": "2023-02-01",
                "invoice": "INV001",
                "amount": 2000,
                "discount": 0,
                "description": "Pembelian pertama",
                "items" : [
                    {
                        "productId": "681fa14f-8bed-4bee-a4a3-5c15a9e3fc5d",
                        "quantity": "1pcs",
                        "price": 2000
                    }
                ]
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"items[0].quantity\" must be a number')
    })
    it("TC-124 - Add sales empty price", async function() {
        const response = await request
            .post(`/sales`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "officeId": "2f458834-0b21-466f-9f56-d35a8ed6f6ba",
                "customerId": "811f547e-a24e-4f94-bfe1-b7ed7d11c03f",
                "date": "2023-02-01",
                "invoice": "INV001",
                "amount": 2000,
                "discount": 0,
                "description": "Pembelian pertama",
                "items" : [
                    {
                        "productId": "681fa14f-8bed-4bee-a4a3-5c15a9e3fc5d",
                        "quantity": 1
                    }
                ]
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"items[0].price\" is required')
    })
    it("TC-125 - Add sales price is not number", async function() {
        const response = await request
            .post(`/sales`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "officeId": "2f458834-0b21-466f-9f56-d35a8ed6f6ba",
                "customerId": "811f547e-a24e-4f94-bfe1-b7ed7d11c03f",
                "date": "2023-02-01",
                "invoice": "INV001",
                "amount": 2000,
                "discount": 0,
                "description": "Pembelian pertama",
                "items" : [
                    {
                        "productId": "681fa14f-8bed-4bee-a4a3-5c15a9e3fc5d",
                        "quantity": 1,
                        "price": "dua ribu"
                    }
                ]
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"items[0].price\" must be a number')
    })
    it("TC-126 - Add sales empty", async function() {
        const response = await request
            .post(`/sales`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"officeId\" is required')
    })
});

describe("Get List Sales Data", function(){
    it("TC-127 - Get list sales data successful", async function() {
        const response = await request
            .get(`/sales?startDate={${variable.currentdate}}&endDate={${variable.futuredate}}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .set('startDate', variable.currentdate)
            .set('endDate', variable.futuredate)
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
    })
    it("TC-128 - Get list sales data invalid startDate", async function() {
        const response = await request
            .get(`/sales?startDate={{abc}}&endDate={{futuredate}}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"startDate\" must be a valid date')
    })
    it("TC-129 - Get list sales data invalid endDate", async function() {
        const response = await request
            .get(`/sales?startDate={{currentdate}}&endDate={{abc}}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"endDate\" must be a valid date')
    })
});

describe("Get Sale Order Data", function(){
    it("TC-130 - Get sale order data successful", async function() {
        const response = await request
            .get(`/sales/${variable.saleId}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
    })
    it("TC-131 - Get sale order data invalid sales id", async function() {
        const response = await request
            .get(`/sales/abc123`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
        expect(response.status).to.eql(404)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('id tidak valid')
    })
});

describe("Add Transaction", function(){
    it("TC-132 - Add transaction successful", async function() { 
        const response = await request
            .post(`/purchases`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "officeId": "2f458834-0b21-466f-9f56-d35a8ed6f6ba",
                "date": "2023-01-28",
                "invoice": "INV/02/12/2023/001",
                "amount": 14000,
                "discount": 0,
                "description": "testing",
                "items" : [
                    {
                        "productId": "681fa14f-8bed-4bee-a4a3-5c15a9e3fc5d",
                        "quantity": 4,
                        "cost": 1000
                    }
                ]
            });
        // save variable
        variable['purchaseId'] = response.body.data.purchaseId
        fs.writeFileSync('kasirAja/variables.json', JSON.stringify(variable, null, 2), err => {
            if (err) {
                console.log(err);
            }
        });
        expect(response.status).to.eql(201)
        expect(response.body.status).to.eql('success')
        expect(response.body.message).to.eql('transaksi ditambahkan')
        expect(response.body.data.purchaseId).to.eql(variable.purchaseId)
    })
    it("TC-133 - Add transaction empty office id", async function() {
        const response = await request
            .post(`/purchases`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "officeId": "",
                "date": "2023-01-28",
                "invoice": "INV/02/12/2023/001",
                "amount": 14000,
                "discount": 0,
                "description": "testing",
                "items" : [
                    {
                        "productId": "681fa14f-8bed-4bee-a4a3-5c15a9e3fc5d",
                        "quantity": 4,
                        "cost": 1000
                    }
                ]
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"officeId\" is not allowed to be empty')
    })
    it("TC-134 - Add transaction empty date", async function() {
        const response = await request
            .post(`/purchases`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "officeId": "2f458834-0b21-466f-9f56-d35a8ed6f6ba",
                "invoice": "INV/02/12/2023/001",
                "amount": 14000,
                "discount": 0,
                "description": "testing",
                "items" : [
                    {
                        "productId": "681fa14f-8bed-4bee-a4a3-5c15a9e3fc5d",
                        "quantity": 4,
                        "cost": 1000
                    }
                ]
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"date\" is required')
    })
    it("TC-135 - Add transaction invalid date", async function() {
        const response = await request
            .post(`/purchases`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "officeId": "2f458834-0b21-466f-9f56-d35a8ed6f6ba",
                "date": "abc",
                "invoice": "INV/02/12/2023/001",
                "amount": 14000,
                "discount": 0,
                "description": "testing",
                "items" : [
                    {
                        "productId": "681fa14f-8bed-4bee-a4a3-5c15a9e3fc5d",
                        "quantity": 4,
                        "cost": 1000
                    }
                ]
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"date\" must be a valid date')
    })
    it("TC-136 - Add transaction empty invoice", async function() {
        const response = await request
            .post(`/purchases`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "officeId": "2f458834-0b21-466f-9f56-d35a8ed6f6ba",
                "date": "2023-01-28",
                "invoice": "",
                "amount": 14000,
                "discount": 0,
                "description": "testing",
                "items" : [
                    {
                        "productId": "681fa14f-8bed-4bee-a4a3-5c15a9e3fc5d",
                        "quantity": 4,
                        "cost": 1000
                    }
                ]
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"invoice\" is not allowed to be empty')  
    })
    it("TC-137 - Add transaction empty amount", async function() {
        const response = await request
            .post(`/purchases`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "officeId": "2f458834-0b21-466f-9f56-d35a8ed6f6ba",
                "date": "2023-01-28",
                "invoice": "INV/02/12/2023/001",
                "discount": 0,
                "description": "testing",
                "items" : [
                    {
                        "productId": "681fa14f-8bed-4bee-a4a3-5c15a9e3fc5d",
                        "quantity": 4,
                        "cost": 1000
                    }
                ]
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"amount\" is required')
    })
    it("TC-138 - Add transaction amount is not number", async function() {
        const response = await request
            .post(`/purchases`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "officeId": "2f458834-0b21-466f-9f56-d35a8ed6f6ba",
                "date": "2023-01-28",
                "invoice": "INV/02/12/2023/001",
                "amount": "14000pcs",
                "discount": "0%",
                "description": "testing",
                "items" : [
                    {
                        "productId": "681fa14f-8bed-4bee-a4a3-5c15a9e3fc5d",
                        "quantity": 4,
                        "cost": 1000
                    }
                ]
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"amount\" must be a number')
    })
    it("TC-139 - Add transaction empty discount", async function() {
        const response = await request
            .post(`/purchases`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "officeId": "2f458834-0b21-466f-9f56-d35a8ed6f6ba",
                "date": "2023-01-28",
                "invoice": "INV/02/12/2023/001",
                "amount": 14000,
                "description": "testing",
                "items" : [
                    {
                        "productId": "681fa14f-8bed-4bee-a4a3-5c15a9e3fc5d",
                        "quantity": 4,
                        "cost": 1000
                    }
                ]
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"discount\" is required')
    })
    it("TC-140 - Add transaction discount is not number", async function() {
        const response = await request
            .post(`/purchases`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "officeId": "2f458834-0b21-466f-9f56-d35a8ed6f6ba",
                "date": "2023-01-28",
                "invoice": "INV/02/12/2023/001",
                "amount": 14000,
                "discount": "abc",
                "description": "testing",
                "items" : [
                    {
                        "productId": "681fa14f-8bed-4bee-a4a3-5c15a9e3fc5d",
                        "quantity": 4,
                        "cost": 1000
                    }
                ]
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"discount\" must be a number')
    })
    it("TC-141 - Add transaction empty description", async function() {
        const response = await request
            .post(`/purchases`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "officeId": "2f458834-0b21-466f-9f56-d35a8ed6f6ba",
                "date": "2023-01-28",
                "invoice": "INV/02/12/2023/001",
                "amount": 14000,
                "discount": 0,
                "description": "",
                "items" : [
                    {
                        "productId": "681fa14f-8bed-4bee-a4a3-5c15a9e3fc5d",
                        "quantity": 4,
                        "cost": 1000
                    }
                ]
            });
        // EXPECTED TO FAIL, BUT ACTUAL TEST CASE SUCCESSFUL 201
        console.log("       TC-141 => This test case is expected to FAIL because the 'description' field is mandatory, but the actual test case succeeded at 201")
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"description\" is required')
    })
    it("TC-142 - Add transaction empty items.productId", async function() {
        const response = await request
            .post(`/purchases`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "officeId": "2f458834-0b21-466f-9f56-d35a8ed6f6ba",
                "date": "2023-01-28",
                "invoice": "INV/02/12/2023/001",
                "amount": 14000,
                "discount": 0,
                "description": "testing",
                "items" : [
                    {
                        "productId": "",
                        "quantity": 4,
                        "cost": 1000
                    }
                ]
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"items[0].productId\" is not allowed to be empty')
    })
    it("TC-143 - Add transaction empty items.quantity", async function() {
        const response = await request
            .post(`/purchases`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "officeId": "2f458834-0b21-466f-9f56-d35a8ed6f6ba",
                "date": "2023-01-28",
                "invoice": "INV/02/12/2023/001",
                "amount": 14000,
                "discount": 0,
                "description": "testing",
                "items" : [
                    {
                        "productId": "681fa14f-8bed-4bee-a4a3-5c15a9e3fc5d",
                        "cost": 1000
                    }
                ]
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"items[0].quantity\" is required')
    })
    it("TC-144 - Add transaction empty items.cost", async function() {
        const response = await request
            .post(`/purchases`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "officeId": "2f458834-0b21-466f-9f56-d35a8ed6f6ba",
                "date": "2023-01-28",
                "invoice": "INV/02/12/2023/001",
                "amount": 14000,
                "discount": 0,
                "description": "testing",
                "items" : [
                    {
                        "productId": "681fa14f-8bed-4bee-a4a3-5c15a9e3fc5d",
                        "quantity": 4
                    }
                ]
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"items[0].cost\" is required')
    })
    it("TC-145 - Add transaction items.quantity is not number", async function() {
        const response = await request
            .post(`/purchases`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "officeId": "2f458834-0b21-466f-9f56-d35a8ed6f6ba",
                "date": "2023-01-28",
                "invoice": "INV/02/12/2023/001",
                "amount": 14000,
                "discount": 0,
                "description": "testing",
                "items" : [
                    {
                        "productId": "681fa14f-8bed-4bee-a4a3-5c15a9e3fc5d",
                        "quantity": "4pcs",
                        "cost": 1000
                    }
                ]
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"items[0].quantity\" must be a number')
    })
    it("TC-146 - Add transaction items.cost is not number", async function() {
        const response = await request
            .post(`/purchases`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .send({
                "officeId": "2f458834-0b21-466f-9f56-d35a8ed6f6ba",
                "date": "2023-01-28",
                "invoice": "INV/02/12/2023/001",
                "amount": 14000,
                "discount": 0,
                "description": "testing",
                "items" : [
                    {
                        "productId": "681fa14f-8bed-4bee-a4a3-5c15a9e3fc5d",
                        "quantity": 4,
                        "cost": "1000abc"
                    }
                ]
            });
        expect(response.status).to.eql(400)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('\"items[0].cost\" must be a number')
    })
});

describe("Get List of Transactions", function(){
    it("TC-147 - Get list of transactions successful", async function() {
        const response = await request
            .get(`/purchases`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
    })
    it("TC-148 - Get list of transactions current date", async function() {
        const response = await request
            .get(`/purchases?startDate={{${variable.currentdate}}}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
            .set('startDate', `${variable.currentdate}`)
            expect(response.status).to.eql(200)
            expect(response.body.status).to.eql('success')
    })
});

describe("Get Transaction Detail", function(){
    it("TC-149 - Get transaction detail successful", async function() {
        const response = await request
            .get(`/purchases/${variable.purchaseId}`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
        expect(response.status).to.eql(200)
        expect(response.body.status).to.eql('success')
    })
    it("TC-150 - Get transaction detail invalid purchase id", async function() {
        const response = await request
            .get(`/purchases/abc123`) // HTTP method dan endpoint
            .set('Authorization', `Bearer ${variable.accessToken}`)
        expect(response.status).to.eql(404)
        expect(response.body.status).to.eql('fail')
        expect(response.body.message).to.eql('id tidak valid')
    })
});
// const old_resp = require("./test.json")

// console.log(old_resp)

// response = {
//     "status": "success",
//     "message": "Authentication berhasil ditambahkan",
//     "data": {
//       "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAxNGNlMDk3LWZhZDEtNDY5Ni04MWYwLWZiY2Y2ZTkxN2YxNiIsImNvbXBhbnlJZCI6Ijg4ZTkyM2IyLWJmMGItNGIzMi1iZGVjLWJlYmNiM2EwNDgxMyIsImlhdCI6MTcwMjMwNjA4Mn0.hept567hanFHDBC1FqfEjxHoY3U7jzmioyeWIHGPPbw",
//       "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAxNGNlMDk3LWZhZDEtNDY5Ni04MWYwLWZiY2Y2ZTkxN2YxNiIsImNvbXBhbnlJZCI6Ijg4ZTkyM2IyLWJmMGItNGIzMi1iZGVjLWJlYmNiM2EwNDgxMyIsImlhdCI6MTcwMjMwNjA4Mn0.Z028F_ev0I5UhqADRkkVQmG1ysQUDPhCtTZNyuSt0yE",
//       "user": {
//         "id": "014ce097-fad1-4696-81f0-fbcf6e917f16",
//         "name": "Toko Serbaguna",
//         "role": "admin",
//         "email": "toko1@gmail.com",
//         "officeId": "fe249f08-689c-4992-b971-b69eedaa213e",
//         "companyId": "88e923b2-bf0b-4b32-bdec-bebcb3a04813",
//         "company_name": "Toko Serbaguna"
//       }
//     }
// }

// old_resp.status = "success"

// console.log(old_resp)

const fs = require("fs");

var variable = {}

variable['accessToken'] = "tes aja ya"
// variable['user_id'] = "FF"

fs.writeFile('kasirAja/test.json', JSON.stringify(variable, null, 2), err => {
    if (err) {
        console.log(err);
    }
});



// console.log(variable.accessToken)
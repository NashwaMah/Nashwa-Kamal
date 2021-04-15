
require('dotenv').config()

class HealthcareAPI {
    constructor() {
        //  for API requests 
        this.axios = require('axios')
        this.fs = require("fs");
    }
    async  RunHealthCheckAndGetCount(needed_count) {
        console.log("Run Health Check ")
        const response = await this.axios.get(process.env.APIUrl + "healthcheck", {
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json'
            }
        });
        switch (needed_count) {
            case "products":
                console.log("Total Number of Products " + response.data.documents.products)
                return response.data.documents.products

            case "categories":
                console.log("Total Number of Categories " + response.data.documents.categories)
                return response.data.documents.categories

            case "stores":
                console.log("Total Number of stores " + response.data.documents.stores)
                return response.data.documents.stores
        }
    }
}
export default HealthcareAPI
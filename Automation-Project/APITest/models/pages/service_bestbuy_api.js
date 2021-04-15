import { t } from 'testcafe';
require('dotenv').config()
import healthcareApi from '../pages/healthcare_bestbuy_api.js'

class BestBuyServiceAPI {
    constructor() {
        //  for API requests 
        this.axios = require('axios')
        this.fs = require("fs");
        // import healthcare API for use
        this.healthcare_api = new healthcareApi()
    }

    async  CreateNewService(service_data) {
        console.log("Create new service")
        const response = await this.axios.post(process.env.APIUrl + "services/", JSON.parse(JSON.stringify(service_data)), {
            headers: {
                'content-type': 'application/json'
            }
        });
        console.log("Create new service Response :")
        console.log(response.data)
        await t.expect(response.status).eql(201)
        await t.expect(response.data.name).eql(service_data.name)
        return response.data.id
    }

    async  GetServiceById(service_id) {
        console.log("Get Service by ID ")
        const response = await this.axios.get(process.env.APIUrl + "services/" + service_id, {
            headers: {
                'content-type': 'application/json'
            }
        });
        console.log("Get Product with ID " + service_id + " Response :")
        console.log(response.data)
        await t.expect(response.status).eql(200)
    }

    async  DeleteService(service_id) {
        console.log("Delete Service")
        const products_count = await this.healthcare_api.RunHealthCheckAndGetCount("services")
        const response = await this.axios.delete(process.env.APIUrl + "services/" + service_id, {
            headers: {
                'content-type': 'application/json'
            }
        });
        console.log("Delete Service Response :")
        console.log(response.data)
        await t.expect(response.status).eql(200)
        await t.expect(response.data.id).eql(service_id)

    }

    async  PatchService(service_id, service_body) {
        console.log("Update service")
        const response = await this.axios.patch(process.env.APIUrl + "services/" + service_id, JSON.parse(JSON.stringify(service_body)), {
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json'
            }
        });
        console.log("Update service Response :")
        console.log(response.data)
        await t.expect(response.status).eql(200)
        await t.expect(response.data.name).eql(service_body.name)
    }

    async  GetLimitedServices(limit) {
        console.log("Get Limited services ")
        const response = await this.axios.patch(process.env.APIUrl + "services?$limit=" + limit, {
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json'
            }
        });
        console.log("Number of services returned " + response.data.length)
        await t.expect(response.status).eql(200)
        await t.expect(response.data.length).eql(limit)
    }


}
export default BestBuyServiceAPI
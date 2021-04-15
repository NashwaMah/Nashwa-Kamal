import { t } from 'testcafe';
require('dotenv').config()
import healthcareApi from '../pages/healthcare_bestbuy_api.js'

class BestBuyStoreAPI {
    constructor() {
        //  for API requests 
        this.axios = require('axios')
        this.fs = require("fs");
        // import healthcare API for use
        this.healthcare_api = new healthcareApi()
    }

    async  CreateNewStore(store_body) {
        console.log("Create new Store")
        const stores_count = await this.healthcare_api.RunHealthCheckAndGetCount("stores")
        const response = await this.axios.post(process.env.APIUrl + "stores/", JSON.parse(JSON.stringify(store_body)), {
            headers: {
                'content-type': 'application/json'
            }
        });
        console.log("Create new Store Response :")
        console.log(response.data)
        await t.expect(response.status).eql(201)
        await t.expect(stores_count + 1).eql(await this.healthcare_api.RunHealthCheckAndGetCount("stores"))
        return response.data.id
    }

    async  GetStoreById(store_id) {
        console.log("Get Store by ID ")
        const response = await this.axios.get(process.env.APIUrl + "stores/" + store_id, {
            headers: {
                'content-type': 'application/json'
            }
        });
        console.log("Get Store with ID " + store_id + " Response :")
        console.log(response.data)
        await t.expect(response.status).eql(200)
        return response
    }

    async  DeleteStore(store_id) {
        console.log("Delete Store")
        const stores_count = await this.healthcare_api.RunHealthCheckAndGetCount("stores")
        const response = await this.axios.delete(process.env.APIUrl + "stores/" + store_id, {
            headers: {
                'content-type': 'application/json'
            }
        });
        console.log("Delete Store Response :")
        console.log(response.data)
        await t.expect(stores_count - 1).eql(await this.healthcare_api.RunHealthCheckAndGetCount("stores"))
        await t.expect(response.status).eql(200)

    }

    async  PatchStore(store_id, store_body) {
        console.log("Update Store")
        const response = await this.axios.patch(process.env.APIUrl + "stores/" + store_id, JSON.parse(JSON.stringify(store_body)), {
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json'
            }
        });
        console.log("Update Store Response :")
        console.log(response.data)
        await t.expect(response.status).eql(200)
        await t.expect(response.data.id).eql(store_id)
    }

    async  GetLimitedStores(store_limit) {
        console.log("Get Limited Stores ")
        const response = await this.axios.patch(process.env.APIUrl + "stores?$limit=" + store_limit, {
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json'
            }
        });

        console.log("Number of stores returned " + response.data.length)
        await t.expect(response.status).eql(200)
        await t.expect(response.data.length).eql(store_limit)
    }


}
export default BestBuyStoreAPI
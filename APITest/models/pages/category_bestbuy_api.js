import { t } from 'testcafe';
require('dotenv').config()
import healthcareApi from '../pages/healthcare_bestbuy_api.js'

class BestBuyCategoryAPI {
    constructor() {
        //  for API requests 
        this.axios = require('axios')
        this.fs = require("fs");

        // import healthcare API for use
        this.healthcare_api = new healthcareApi()

    }

    async  CreateNewCategory(category_data) {
        console.log("Create new category")
        const categories_count = await this.healthcare_api.RunHealthCheckAndGetCount("categories")
        const response = await this.axios.post(process.env.APIUrl + "categories/", JSON.parse(JSON.stringify(category_data)), {
            headers: {
                'content-type': 'application/json'
            }
        });
        console.log("Create new category Response :")
        console.log(response.data)
        await t.expect(response.status).eql(201)
        await t.expect(categories_count + 1).eql(await this.healthcare_api.RunHealthCheckAndGetCount("categories"))
        return response.data.id
    }

    async  GetCategoryById(category_id) {
        console.log("Get Product by ID ")
        const response = await this.axios.get(process.env.APIUrl + "categories/" + category_id, {
            headers: {
                'content-type': 'application/json'
            }
        });
        console.log("Get Product with ID " + category_id + " Response :")
        console.log(response.data)
        await t.expect(response.status).eql(200)
    }

    async  DeleteCategory(category_id) {
        console.log("Delete category")
        const products_count = await this.healthcare_api.RunHealthCheckAndGetCount("categories")
        const response = await this.axios.delete(process.env.APIUrl + "categories/" + category_id, {
            headers: {
                'content-type': 'application/json'
            }
        });
        console.log("Delete category Response :")
        console.log(response.data)
        await t.expect(products_count - 1).eql(await this.healthcare_api.RunHealthCheckAndGetCount("categories"))
        await t.expect(response.status).eql(200)
    }

    async  PatchCategory(category_id, category_body) {
        console.log("Update category")
        const response = await this.axios.patch(process.env.APIUrl + "categories/" + category_id, JSON.parse(JSON.stringify(category_body)), {
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json'
            }
        });
        console.log("Update category Response :")
        console.log(response.data)
        await t.expect(response.status).eql(200)
        await delete response.data.createdAt
        await delete response.data.updatedAt
        await t.expect(response.data).eql(JSON.parse(JSON.stringify(category_body)))
    }

    async  GetLimitedCategory(limit) {
        console.log("Get Limited categories ")
        const response = await this.axios.patch(process.env.APIUrl + "categories?$limit=" + limit, {
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json'
            }
        });

        console.log("Number of categories returned " + response.data.length)
        await t.expect(response.status).eql(200)
        await t.expect(response.data.length).eql(limit)
    }


}
export default BestBuyCategoryAPI
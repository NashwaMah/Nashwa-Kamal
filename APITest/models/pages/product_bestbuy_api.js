import { t } from 'testcafe';
require('dotenv').config()
import healthcareApi from '../pages/healthcare_bestbuy_api.js'

class BestBuyProductAPI {
    constructor() {
        // test data needed from json files 
        this.product_data = require('../../test-helpers/test-data/product_data.json')
        //  for API requests 
        this.axios = require('axios')
        this.fs = require("fs");
        // import healthcare API for use
        this.healthcare_api = new healthcareApi()

    }

    async  CreateNewProduct() {
        console.log("Create new Product")
        const products_count = await this.healthcare_api.RunHealthCheckAndGetCount("products")
        const response = await this.axios.post(process.env.APIUrl + "products/", JSON.parse(JSON.stringify(this.product_data.newProduct)), {
            headers: {
                'content-type': 'application/json'
            }
        });
        console.log("Create new Product Response :")
        console.log(response.data)
        await t.expect(response.status).eql(201)
        await t.expect(products_count + 1).eql(await this.healthcare_api.RunHealthCheckAndGetCount("products"))
        return response.data.id
    }

    async  GetProductById(product_id) {
        console.log("Get Product by ID ")
        const response = await this.axios.get(process.env.APIUrl + "products/" + product_id, {
            headers: {
                'content-type': 'application/json'
            }
        });
        console.log("Get Product with ID " + product_id + " Response :")
        console.log(response.data)
        await t.expect(response.status).eql(200)
    }

    async  DeleteProduct(product_id) {
        console.log("Delete Prodcuct")
        const products_count = await this.healthcare_api.RunHealthCheckAndGetCount("products")
        const response = await this.axios.delete(process.env.APIUrl + "products/" + product_id, {
            headers: {
                'content-type': 'application/json'
            }
        });
        console.log("Delete Prodcuct Response :")
        console.log(response.data)
        await t.expect(products_count - 1).eql(await this.healthcare_api.RunHealthCheckAndGetCount("products"))
        await t.expect(response.status).eql(200)
    }

    async  PatchProduct(product_id) {
        console.log("Update Product")
        const response = await this.axios.patch(process.env.APIUrl + "products/" + product_id, JSON.parse(JSON.stringify(this.product_data.updateProduct)), {
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json'
            }
        });
        console.log("Update Prodcuct Response :")
        console.log(response.data)
        await t.expect(response.status).eql(200)
        await delete response.data.createdAt
        await delete response.data.id
        await delete response.data.updatedAt
        await t.expect(response.data).eql(JSON.parse(JSON.stringify(this.product_data.updateProduct)))
    }

    async  GetLimitedProducts() {
        console.log("Get Limited Products ")
        const response = await this.axios.patch(process.env.APIUrl + "products?$limit=" + this.product_data.limit, {
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json'
            }
        });

        console.log("Number of products returned " + response.data.length)
        await t.expect(response.status).eql(200)
        await t.expect(response.data.length).eql(this.product_data.limit)
    }


}
export default BestBuyProductAPI
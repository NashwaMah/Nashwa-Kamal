require('dotenv').config()
import BestbuyApi from '../models/pages/product_bestbuy_api.js'
const bestbuy_api = new BestbuyApi()


fixture`Run Product Bestbuy APIs`
    .page`${process.env.APIUrl}`


test(' -----  Create new Product  -----', async t => {
    await bestbuy_api.CreateNewProduct()
});

test(' -----  Update  Product  -----', async t => {
    const product_id = await bestbuy_api.CreateNewProduct()
    await bestbuy_api.PatchProduct(product_id)
});

test(' -----  Delete  Product  -----', async t => {
    const product_id = await bestbuy_api.CreateNewProduct()
    await bestbuy_api.DeleteProduct(product_id)

});

test(' -----  Get Product By ID -----', async t => {
    const product_id = await bestbuy_api.CreateNewProduct()
    await bestbuy_api.GetProductById(product_id)
});

test(' -----  Get Product By limit -----', async t => {
    await bestbuy_api.GetLimitedProducts()

});
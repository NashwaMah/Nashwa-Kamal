require('dotenv').config()
import BestbuyApi from '../models/pages/category_bestbuy_api.js'
const bestbuy_api = new BestbuyApi()
const category_data = require('../test-helpers/test-data/category_data.json')



fixture`Run Category Bestbuy APIs`
    .page`${process.env.APIUrl}`


test(' -----  Create new Category  -----', async t => {
    await bestbuy_api.CreateNewCategory(category_data.newCategory)
});

test(' -----  Get Category By ID -----', async t => {
    await bestbuy_api.GetCategoryById(category_data.newCategory.id)
});

test(' -----  Update  Category  -----', async t => {
    await bestbuy_api.PatchCategory(category_data.newCategory.id, category_data.updateCategory)
});


test(' -----  Get Category By limit -----', async t => {
    await bestbuy_api.GetLimitedCategory(category_data.limit)

});

test(' -----  Delete  Category  -----', async t => {
    await bestbuy_api.DeleteCategory(category_data.newCategory.id)
});
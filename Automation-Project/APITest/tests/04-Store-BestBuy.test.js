require('dotenv').config()
import StoreBestbuyApi from '../models/pages/store_bestbuy_api.js'
const store_bestbuy_api = new StoreBestbuyApi()
const store_data = require('../test-helpers/test-data/store_data.json')

fixture`Run Store Bestbuy APIs`
    .page`${process.env.APIUrl}`

test(' -----  Create new Store  -----', async t => {
    await store_bestbuy_api.CreateNewStore(store_data.newStore)
});

test(' -----  Get Store By ID -----', async t => {
    const store_id = await store_bestbuy_api.CreateNewStore(store_data.newStore)
    await store_bestbuy_api.GetStoreById(store_id)
});

test(' -----  Update Store  -----', async t => {
    const store_id = await store_bestbuy_api.CreateNewStore(store_data.newStore)
    await store_bestbuy_api.PatchStore(store_id, store_data.updateStore)
});


test(' -----  Get Store By limit -----', async t => {
    await store_bestbuy_api.GetLimitedStores(store_data.limit)

});

test(' -----  Delete  Service  -----', async t => {
    const store_id = await store_bestbuy_api.CreateNewStore(store_data.newStore)
    await store_bestbuy_api.DeleteStore(store_id)
});


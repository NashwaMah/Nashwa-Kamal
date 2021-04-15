require('dotenv').config()
import BestbuyApi from '../models/pages/service_bestbuy_api.js'
const bestbuy_api = new BestbuyApi()
const service_data = require('../test-helpers/test-data/service_data.json')

fixture`Run Service Bestbuy APIs`
    .page`${process.env.APIUrl}`


test(' -----  Create new Service  -----', async t => {
    await bestbuy_api.CreateNewService(service_data.newService)
});

test(' -----  Get Service By ID -----', async t => {
    const service_id = await bestbuy_api.CreateNewService(service_data.newService)
    await bestbuy_api.GetServiceById(service_id)
});

test(' -----  Update  Service  -----', async t => {
    const service_id = await bestbuy_api.CreateNewService(service_data.newService)
    await bestbuy_api.PatchService(service_id, service_data.updateService)
});


test(' -----  Get Service By limit -----', async t => {
    await bestbuy_api.GetLimitedServices(service_data.limit)

});

test(' -----  Delete  Service  -----', async t => {
    const service_id = await bestbuy_api.CreateNewService(service_data.newService)
    await bestbuy_api.DeleteService(service_id)
});


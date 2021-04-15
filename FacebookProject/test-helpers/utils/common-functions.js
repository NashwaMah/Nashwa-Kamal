require('dotenv').config()
import { t } from 'testcafe'


export async function typeText(field,text)
{
  await t.typeText(field,text , { paste: true,replace:true } )

}

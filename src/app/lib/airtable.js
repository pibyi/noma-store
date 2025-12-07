import Airtable from 'airtable'

const airtableClient = new Airtable({
    apiKey: process.env.AIRTABLE_ACCESS_TOKEN,
}).base(process.env.AIRTABLE_BASE_ID)

export { airtableClient }

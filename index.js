var { Client } = require('pg')
const client = new Client({
  host: process.env.HOST_REFERENCE,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD_REFERENCE,
  database: process.env.DATABASE_NAME
});

client.connect();

exports.handler = async function (event) {
  try {

    let results = await client.query(`SELECT comment_id,name,comment
    FROM public."comment" WHERE restaurant_id = ${event.pathParameters.restaurantId};`);

    let response =
    {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(results.rows),

    };
    return response;

  } catch (err) {
    return err;
  }
}


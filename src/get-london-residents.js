const fetch = require('node-fetch')

const ENDPOINT = 'http://bpdts-test-app-v4.herokuapp.com/city/London/users'

module.exports = async function () {
  let result
  try {
    result = await fetch(ENDPOINT).then(res => res.json())
  } catch (e) {
    result = []
    console.error({ message: `Error fetching ${ENDPOINT}`, e })
  }

  return result
}
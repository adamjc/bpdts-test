const fetch = require('node-fetch')
const geolib = require('geolib')

const LONDON_COORDS = {
  latitude: 51.5074,
  longitude: 0.1278
}

const RADIUS_IN_METRES = 96560.64

const ENDPOINT = 'http://bpdts-test-app-v4.herokuapp.com/users'

function isWithinRadius ({ latitude, longitude }) {
  return geolib.isPointWithinRadius({ latitude, longitude }, LONDON_COORDS, RADIUS_IN_METRES)
}

module.exports = async function () {
  let users
  try {
    users = await fetch(ENDPOINT).then(res => res.json())

    return users.filter(isWithinRadius)
  } catch (e) {
    users = []
    console.error({ message: `Error fetching ${ENDPOINT}`, e })
  }

  return users
}
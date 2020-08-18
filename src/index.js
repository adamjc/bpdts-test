const fetch = require('node-fetch')
const getLondonResidents = require('./get-london-residents.js')
const getUsersInLondon = require('./get-users-in-london.js')
const uniqBy = require('lodash.uniqby')

exports.handler = async () => {
  const usersInLondon = await Promise.all([getLondonResidents(), getUsersInLondon()])
  return uniqBy(usersInLondon.flat(Infinity), (el) => el.id)
}
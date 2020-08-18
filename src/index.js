const getLondonResidents = require('./get-london-residents.js')
const getUsersInLondon = require('./get-users-in-london.js')
const uniqBy = require('lodash.uniqby')

exports.handler = async () => {
  const usersInLondon = await Promise.all([getLondonResidents(), getUsersInLondon()])
  const dedupedUsers = uniqBy(usersInLondon.flat(Infinity), (el) => el.id)

  return {
    statusCode: 200,
    body: JSON.stringify(dedupedUsers)
  }
}
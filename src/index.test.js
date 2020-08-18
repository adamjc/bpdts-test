const handler = require('./index.js')
const getUsersInLondon = require('./get-users-in-london.js')
const getLondonResidents = require('./get-london-residents.js')
const fetch = require('node-fetch')

jest.mock('node-fetch')

describe('BPDTS Test API', () => {
  const allUsers = require('../test-data/all.json')
  const justLondon = require('../test-data/just-london.json')

  fetch.mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(justLondon)
  }).mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(allUsers)
  })
  
  it('returns a list of people living in or within 60 miles of London', async () => {
    const result = await handler()

    expect(result).toEqual(justLondon)
  })
})
const getUsersInLondon = require('./get-users-in-london.js')
const fetch = require('node-fetch')

jest.mock('node-fetch')

describe('getUsersInLondon', () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

  beforeEach(() => {
    fetch.mockReset()
  })

  test('it makes a GET request to http://bpdts-test-app-v4.herokuapp.com/users', async () => {
    fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue([])
    })

    await getUsersInLondon()

    expect(fetch).toHaveBeenCalledWith('http://bpdts-test-app-v4.herokuapp.com/users')
  })

  test('it returns [] if the upstream fails', async () => {
    fetch.mockRejectedValue('whoops')

    const result = await getUsersInLondon()

    expect(result).toEqual([])
    expect(consoleSpy).toHaveBeenCalled()
  })

  test('it returns only users that are within 60 miles of London', async () => {
    const all = require('../test-data/all.json')
    const justLondon = require('../test-data/just-london.json')

    fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(all)
    })

    const result = await getUsersInLondon()

    expect(result).toEqual(justLondon)
  })
})
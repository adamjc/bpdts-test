const getLondonResidents = require('./get-london-residents.js')
const fetch = require('node-fetch')

jest.mock('node-fetch')

describe('getLondonResidents', () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

  beforeEach(() => {
    fetch.mockReset()
  })

  test('it makes a GET request to http://bpdts-test-app-v4.herokuapp.com/city/London/users', async () => {
    fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue([])
    })

    await getLondonResidents()

    expect(fetch).toHaveBeenCalledWith('http://bpdts-test-app-v4.herokuapp.com/city/London/users')
  })

  test('it returns [] if the upstream fails', async () => {
    fetch.mockRejectedValue('whoops')

    const result = await getLondonResidents()

    expect(result).toEqual([])
    expect(consoleSpy).toHaveBeenCalled()
  })

  test('it returns whatever the endpoint gives it', async () => {
    const dummyData = [{
      a: 1,
      b: 2
    }]

    fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(dummyData)
    })

    const result = await getLondonResidents()

    expect(result).toEqual(dummyData)
  })
})
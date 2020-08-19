# BPDTS Test

URL: https://38zghphr1f.execute-api.eu-west-1.amazonaws.com/

Stack:
- CI/CD Pipeline: This is using GitHub Actions, and viewable under the `.github` folder
- Source: This uses node.js and is viewable under `src`. Run `npm i && npm test` to run the tests
- Infrastructure: This uses CloudFormation and is viewable in `stack.yaml`

Further improvements:
- Maintainability: config-drive url endpoints if they are liable to change
- Testing: Better / More robust integration / unit tests (e.g. test more scenarios)
- Monitoring: add metrics around whatever keys we are interested in and alarms off those metrics
- Scalability: This should be OK as it's a managed system. We could add a cache in-front of the request to the API. If the number of lambdas used is > 1000 then we could ask the customer account team to increase this cap.
- High Availability: This should be OK as it's a managed system.
- Protection: Authorisation/Authentication can be added through an API Authorizor Lambda

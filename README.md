# remeind-poc
Experiment (prove of concept)

## Getting Started
run command `npm install` or `yarn` for install packages and dependencies

config your secret `config/default.json`

```json
{
  "awsConfig": {
    "accessKeyId": "",
    "secretAccessKey": "",
    "region": ""
  },
  "Role": "",
  "TopicArn": "",
  "prefixFunctionArn": ""
}
```

**Run commands with prefix (dirname)**
```bash
node create-lambda/index.js
```

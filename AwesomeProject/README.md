## Set up

With expo, in the root directory, run

```bash
yarn
```

and then

```bash
yarn run android
```

### Notes

This project was only tested on an Android emulator `Pixel 2 API 30`

There is an issue with babel and `d3-array` in
`node_modules/d3-array/src/cumsum.js` which I tried to fix by adding the
following to the `package.json` file:

```json
  "resolutions": {
    "d3-array": "./d3-array"
  }
```

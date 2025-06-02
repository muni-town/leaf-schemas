# Leaf Schemas

A central repository for Leaf Component schemas as [JSON Schema Draft 7](https://json-schema.org/draft-07/).

## Consistent Hashing

Component schema files are named with a short name and a hash of the schema.

``` text
basicMeta:9cd7e821c93631b9f816c30a55dc2d68256bc108135d2c17feb8b9bf2fa5ade4.json
```

The hash is generated using the [canonicalize](https://www.npmjs.com/package/canonicalize) library to ensure consistency. The script is provided and can be run to generate new hashes. Just write the schema file `shortName.json` and run `npm run hash-schemas` (after installing canonicalize with `npm install`).

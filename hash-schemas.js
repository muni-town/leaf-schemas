// hashSchemas.js
const fs = require("fs")
const path = require("path")
const crypto = require("crypto")
const canonicalize = require("canonicalize")

const dir = path.join(__dirname, "schemas")
const files = fs.readdirSync(dir)

files.forEach(file => {
  const ext = path.extname(file)
  const base = path.basename(file, ext)

  // Skip if not .json or already contains colon
  if (ext !== ".json" || file.includes(":")) return

  const filePath = path.join(dir, file)
  let jsonData

  try {
    jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"))
  } catch (err) {
    console.error(`Skipping ${file}: invalid JSON`)
    return
  }

  const canon = canonicalize(jsonData)
  const hash = crypto.createHash("sha256").update(canon).digest("hex")

  const newFileName = `${base}:${hash}${ext}`
  const newFilePath = path.join(dir, newFileName)

  try {
    fs.renameSync(filePath, newFilePath)
    console.log(`Renamed ${file} → ${newFileName}`)
  } catch (err) {
    console.error(`Failed to rename ${file}: ${err.message}`)
  }
})

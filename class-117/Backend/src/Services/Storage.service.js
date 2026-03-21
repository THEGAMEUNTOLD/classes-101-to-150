const ImageKit = require("@imagekit/nodejs").default

const client = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
})

async function uploadToImageKit({buffer, fileName,folder = ""}) {

    const file = await client.files.upload({
        file: await ImageKit.toFile(Buffer.from(buffer)),
        fileName: fileName,
        folder
    })
    return file
}

module.exports = { uploadToImageKit }
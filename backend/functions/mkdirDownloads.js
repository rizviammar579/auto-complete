import fs from "fs"

export async function mkdirDownloads() {

    if (!fs.existsSync("./downloads")) {

        fs.mkdirSync("./downloads")

    }


}
import fs from 'fs/promises'

const readFile = async (path) => {
    const data = await fs.readFile(path, 'utf8')
    return data
}

export default readFile
import path from 'path'
import __dirname from '../../utils/dirname.util.js'

const serverHtmlFileIndex = async (request, response) => {
    const _path = path.join(__dirname, '..', 'public', `index.html`,)
    const data = await readFile(_path)
    response.send(data)
}


export default serverHtmlFileIndex
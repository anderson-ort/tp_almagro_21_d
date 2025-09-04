import path from 'path'
import __dirname from '../../utils/dirname.util.js'
import readFile from '../../utils/readfile.util.js'


const serverJsonFile = async (request, response) => {
    const _path = path.join(__dirname, '..', 'database', 'ferreteria.db.json')
    let data = await readFile(_path)
    data = JSON.parse(data)
    response.send({ data })
}

export default serverJsonFile
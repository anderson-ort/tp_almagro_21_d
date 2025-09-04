import path from 'path';
import __dirname from '../../utils/dirname.util.js'


const serverError = async (request, response) => {
    console.log("estoy en el middleware");


    const _path = path.join(__dirname, '..', 'public', `error.html`,)
    let data = await readFile(_path)

    data = data
        .replaceAll('{{status}}', 404)
        .replaceAll('{{message}}', 'No encontrado')

    response
        .status(404)
        .send(data)
}

export default serverError
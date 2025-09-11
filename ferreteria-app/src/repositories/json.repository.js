import fs from 'fs/promises';

export class DataBaseRepository {
  constructor(path) {
    this.path = path;
  }

  async getAllData() {
    const data = await fs.readFile(this.path, (encoding = 'utf8'));
    return await JSON.parse(data);
  }

  async getById(idParam) {
    let data = await this.getAllData();
    if (!data) throw Error('Esta vacio');
    const filteredData = data.filter((product) => product.id === idParam);
    if (!filteredData) throw Error('No existe este producto');
    return filteredData;
  }
}

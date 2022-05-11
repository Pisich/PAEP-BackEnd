const aseguradoraController = require('../../../src/controllers/aseguradora.controller');
const { NotFoundError } = require('../../../src/utils/errors');

describe('Aseguradora Controller Test', () => {
  it('Get Non-Existent Aseguradora By Nombre', () => {
    expect(async function() {console.log(await aseguradoraController.getByNombre('AseguradoraABZ'))})
    .toThrow(NotFoundError);
  });
});
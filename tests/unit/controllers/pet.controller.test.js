const PetController = require('../../../src/controllers/pet.controller');

const fileHelpers = jasmine.createSpyObj('MockedHelpers', ['save', 'get'])

describe('test', () => {
  let petContoller;
  beforeEach(() => {
    petContoller = new PetController(fileHelpers.save, fileHelpers.get);
  });
  it('hello', () => {
    petContoller.list();
    expect(2).toBe(2);
  });
});
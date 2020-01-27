import { Initialize, DatabaseController, Model } from '../src/models'

/**
 * Dummy test
 */
describe('Model', () => {
  it('works if Initialization works', () => {
    let result = true
    try {
      Initialize(null)
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if DatabaseController query returns an error when no databaseController has been set', async () => {
    let result = false
    try {
      await MyModel.query({})
    } catch (error) {
      result = true
    }
    expect(result).toBeTruthy()
  })
  it('works if DatabaseController save returns an error when no databaseController has been set', async () => {
    let result = false
    try {
      const myModel = new MyModel()
      await myModel.save()
    } catch (error) {
      result = true
    }
    expect(result).toBeTruthy()
  })
  it('works if DatabaseController saveAll returns an error when no databaseController has been set', async () => {
    let result = false
    try {
      await MyModel.saveAll([])
    } catch (error) {
      result = true
    }
    expect(result).toBeTruthy()
  })
  it('works if DatabaseController remove returns an error when no databaseController has been set', async () => {
    let result = false
    try {
      const myModel = new MyModel()
      await myModel.remove()
    } catch (error) {
      result = true
    }
    expect(result).toBeTruthy()
  })
  it('works if DatabaseController removeAll returns an error when no databaseController has been set', async () => {
    let result = false
    try {
      await MyModel.removeAll([])
    } catch (error) {
      result = true
    }
    expect(result).toBeTruthy()
  })
  it('works if Initialization works', () => {
    let result = true
    try {
      Initialize(new MyDatabaseController())
    } catch (error) {
      result = false
    }
    expect(result).toBeTruthy()
  })
  it('works if DatabaseController saveAll returns an error when a wrong model is passed as argument', async () => {
    let result = false
    try {
      await MyModel.saveAll([new MyWrongModel()])
    } catch (error) {
      result = true
    }
    expect(result).toBeTruthy()
  })
  it('works if DatabaseController removeAll returns an error when a wrong model is passed as argument', async () => {
    let result = false
    try {
      await MyModel.removeAll([new MyWrongModel()])
    } catch (error) {
      result = true
    }
    expect(result).toBeTruthy()
  })
  it('works if DatabaseController query works', async () => {
    expect(await MyModel.query({})).toEqual('query')
  })
  it('works if DatabaseController save works', async () => {
    const myModel = new MyModel()
    expect(await myModel.save()).toEqual('save')
  })
  it('works if DatabaseController saveAll works', async () => {
    expect(await MyModel.saveAll([new MyModel()])).toEqual('saveAll')
  })
  it('works if DatabaseController remove works', async () => {
    const myModel = new MyModel()
    expect(await myModel.remove()).toEqual('remove')
  })
  it('works if DatabaseController removeAll works', async () => {
    expect(await MyModel.removeAll([new MyModel()])).toEqual('removeAll')
  })
})

class MyModel extends Model {
  constructor() {
    super()
    this.loadSchema({
      num: Number
    })
  }
}

class MyWrongModel extends Model {
  constructor() {
    super()
    this.loadSchema({
      str: String
    })
  }
}

class MyDatabaseController extends DatabaseController {
  public async query(modelName: String, params: Object): Promise<any> {
    return 'query'
  }
  public async save(model: Model): Promise<any> {
    return 'save'
  }
  public async saveAll(models: Model[]): Promise<any> {
    return 'saveAll'
  }
  public async remove(model: Model): Promise<any> {
    return 'remove'
  }
  public async removeAll(models: Model[]): Promise<any> {
    return 'removeAll'
  }
}
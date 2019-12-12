import { Model, registerCallbacks, InitializeModelProperties } from '../src/models'

describe('First level of populating', () => {
  beforeAll(() => {
    InitializeModelProperties()

    registerCallbacks('Role', async () => {
      return {
        id: 'abc',
        name: 'admin',
        write: true,
        read: true
      }
    })

    registerCallbacks('Car', async (foreignKeyValue: string) => {
      return {
        id: foreignKeyValue,
        registration: 'abc',
        brand: '123'
      }
    })

    registerCallbacks('Brand', async (foreignKeyValue: string) => {
      return {
        id: foreignKeyValue,
        name: 'Renault'
      }
    })
  })

  //
  it('should create object with subobject', () => {
    const user = User.fromDatabase({
      id: 'onche',
      lastname: 'HEN',
      firstname: 'Xavier',
      role: 'abc',
      cars: ['ecf', 'aeo', 'acf'],
      subobject: {
        ballek: true
      }
    })

    expect(user.subobject.ballek).toBeTruthy()
  })

  //
  it('should return ids without populating', () => {
    const user = User.fromDatabase({
      id: 'onche',
      lastname: 'HEN',
      firstname: 'Xavier',
      role: 'abc',
      cars: ['ecf', 'aeo', 'acf'],
      subobject: {
        ballek: true
      }
    })

    expect(user).toMatchObject({
      id: 'onche',
      lastname: 'HEN',
      firstname: 'Xavier',
      role: 'abc',
      cars: ['ecf', 'aeo', 'acf'],
      subobject: {
        ballek: true
      }
    })
  })

  //
  it('should populate role', async () => {
    const user = User.fromDatabase({
      id: 'onche',
      lastname: 'HEN',
      firstname: 'Xavier',
      role: 'abc',
      cars: ['ecf', 'aeo', 'acf'],
      subobject: {
        ballek: true
      }
    })

    await user.populate('role')

    expect(user).toMatchObject({
      id: 'onche',
      lastname: 'HEN',
      firstname: 'Xavier',
      role: {
        id: 'abc',
        name: 'admin',
        write: true,
        read: true
      },
      cars: ['ecf', 'aeo', 'acf'],
      subobject: {
        ballek: true
      }
    })
  })

  //
  it('should populate cars', async () => {
    const user = User.fromDatabase({
      id: 'onche',
      lastname: 'HEN',
      firstname: 'Xavier',
      role: 'abc',
      cars: ['ecf', 'acf'],
      subobject: {
        ballek: true
      }
    })

    await user.populate('cars')

    expect(user).toMatchObject({
      id: 'onche',
      lastname: 'HEN',
      firstname: 'Xavier',
      role: 'abc',
      cars: [
        { id: 'ecf', brand: '123', registration: 'abc' },
        { id: 'acf', brand: '123', registration: 'abc' }
      ],
      subobject: {
        ballek: true
      }
    })
  })

  //
  it('should populate cars & role', async () => {
    const user = User.fromDatabase({
      id: 'onche',
      lastname: 'HEN',
      firstname: 'Xavier',
      role: 'abc',
      cars: ['ecf', 'acf'],
      subobject: {
        ballek: true
      }
    })

    await user.populate('cars role')

    expect(user).toMatchObject({
      id: 'onche',
      lastname: 'HEN',
      firstname: 'Xavier',
      role: {
        id: 'abc',
        name: 'admin',
        write: true,
        read: true
      },
      cars: [
        { id: 'ecf', brand: '123', registration: 'abc' },
        { id: 'acf', brand: '123', registration: 'abc' }
      ],
      subobject: {
        ballek: true
      }
    })
  })

  //
  it('should populate cars (subpopulate brand) & role', async () => {
    const user = User.fromDatabase({
      id: 'onche',
      lastname: 'HEN',
      firstname: 'Xavier',
      role: 'abc',
      cars: ['ecf', 'acf'],
      subobject: {
        ballek: true
      }
    })

    await user.populate('cars.brand  role role')

    expect(user).toMatchObject({
      id: 'onche',
      lastname: 'HEN',
      firstname: 'Xavier',
      role: {
        id: 'abc',
        name: 'admin',
        write: true,
        read: true
      },
      cars: [
        {
          id: 'ecf',
          brand: {
            id: '123',
            name: 'Renault'
          },
          registration: 'abc'
        },
        {
          id: 'acf',
          brand: {
            id: '123',
            name: 'Renault'
          },
          registration: 'abc'
        }
      ],
      subobject: {
        ballek: true
      }
    })
  })
})

class User extends Model {
  constructor() {
    super()

    this.loadSchema({
      id: String,
      lastname: String,
      firstname: String,
      role: {
        type: Model,
        model: Role,
        reference: true
      },
      subobject: SubObject,
      cars: [
        {
          type: Model,
          model: Car,
          reference: true
        }
      ]
    })
  }
}

class Role extends Model {
  constructor() {
    super()

    this.loadSchema({
      id: String,
      name: String,
      write: Boolean,
      read: Boolean
    })
  }
}

class Car extends Model {
  constructor() {
    super()
    this.loadSchema({
      id: String,
      brand: {
        type: Model,
        model: Brand,
        reference: true
      },
      registration: String
    })
  }
}

class Brand extends Model {
  constructor() {
    super()
    this.loadSchema({
      id: String,
      name: String
    })
  }
}

class SubObject extends Model {
  constructor() {
    super()
    this.loadSchema({
      ballek: Boolean
    })
  }
}

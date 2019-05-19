export class HomeDataFixture {
  data = [
    {
      id: 12134234,
      type: 'Std.Note',
      categories: [1, 2],
      tags: [8, 1],
      summary: 'Note #1'
    },
    {
      id: 9808239423,
      type: 'Email.Address',
      categories: [7],
      tags: [],
      summary: 'address@some.where'
    }
  ]
  meta = {}
}

export class HomeCollectionFixture {
  types = {
    'Std': ['Std.Note', 'Std.Document'],
    'Email': ['Email.Address', 'Email.Message']
  }
  categories = {
    id: 1,
    name: 'ROOT',
    children: [
      {
        id: 2,
        name: 'Первая категория',
        children: [
          {
            id: 3,
            name: 'Подкатегория',
            children: []
          }
        ]
      },
      {
        id: 4,
        name: 'Вторая категория',
        children: [
          {
            id: 6,
            name: 'Подкатегория',
            children: [
              {
                id: 7,
                name: 'ПодПодкатегория',
                children: []
              }
            ]
          },
          {
            id: 10,
            name: 'Подкатегория',
            children: []
          }
        ]
      }
    ]
  }
  tags = {
    id: 1,
    name: 'ROOT',
    children: [
      {
        id: 8,
        name: 'Tag',
        children: [
          {
            id: 3,
            name: 'Sub tag',
            children: []
          }
        ]
      },
      {
        id: 1,
        name: 'Other tag',
        children: []
      }
    ]
  }
}

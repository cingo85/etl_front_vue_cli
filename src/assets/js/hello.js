export default {
  name: 'vueData',
  data() {
    return {
      functionTable: {
        ColTable: ['default', 'default', 'default', 'default', 'default', 'default', 'default'],
        RowTable: ['default', 'default', 'default']
      },
      DB: [
        {
          DBname: 'DB0',
          TableName: '學生基本資料0'
        },
        {
          DBname: 'DB1',
          TableName: '學生基本資料1'
        },
        {
          DBname: 'DB2',
          TableName: '學生基本資料2'
        },
        {
          DBname: 'DB3',
          TableName: '學生基本資料3'
        },
        {
          DBname: 'DB4',
          TableName: '學生基本資料4'
        },
        {
          DBname: 'DB5',
          TableName: '學生基本資料5'
        },
        {
          DBname: 'DB6',
          TableName: '學生基本資料6'
        },
        {
          DBname: 'DB7',
          TableName: '學生基本資料1'
        }
      ],
      newDB: [],
      sortnum: [],
      functionData: [
        {
          eng: '1',
          chin: '姓名',
          type: 'String',
          pk: 'yes',
          logic: 'nothing1'
        },
        {
          eng: '2',
          chin: '姓名',
          type: 'String',
          pk: 'yes',
          logic: 'nothing2'
        },
        {
          eng: '3',
          chin: '姓名',
          type: 'String',
          pk: 'yes',
          logic: 'nothing2'
        }
      ]
    }
  }
}

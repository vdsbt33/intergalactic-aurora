class BaseController {
  constructor() {
    this.table = '';
    this.fields = [];
    this.prefix = '';
    this.model = undefined;
  }

  // 
  // Sets all avaible fields in a variable
  // 
  setFields(table, values, model) {
    let self = this;

    self.table = table;
    self.fields = [];
    self.model = model;
    
    self.prefix = values[0].split('_', 1)[0];
    
    values.forEach (function (val, index){
      self.fields.push(val.split('_', 2)[1]);
    });

  }

  // 
  // Generate query
  // 
  getQuery(type, values_arr, conditions_map) {
    let self = this;
    var result = '';

    console.log('Type = ' + type + ' / Values = ' + values_arr + ' / Cond = ' + conditions_map);

    switch (type) {
      case ('get'):

        break;
      case ('post'):
          result += 'insert into ' + self.table + ' ( ';
          // Columns
          self.fields.forEach(function (value, index) {
            if (value != self.fields[0]) {
              if (value != self.fields[1])
                result += ', ';
              result += self.prefix + '_' + value;
            }
          });
          result += ' ) values ( ';
          // Values
              self.fields.forEach(function(value, index) {
            if (value != self.fields[0]) {
              console.log('I = ' + index + ' / V = ' + value + ' / Val = ' + values_arr[self.prefix + value] + ' - ' + values_arr[2]);
              if (value != self.fields[1])
                result += ', ';
              result += values_arr[value];
            }
          });
          result += ' );';
        break;
      case ('put'):

        break;
      case ('delete'):

        break;
    }

    return result;
  }

  // 
  // Returns WHERE conditions of the Controller
  // 
  getWhere(conditions) {
    var result = '';
    let self = this;

    if (conditions.length > 0){
      result += ' where ';


      var isFirst = true;
      self.fields.forEach(function (val, index) {
        if (conditions[val] !== undefined) {
          if (!isFirst)
            result += ' and ';
          else
            isFirst = false;
          
          switch (typeof self.model[self.prefix + '_' + val]) {
            case 'number':
              result += self.prefix + '_' + val + ' = ' + conditions[val];
              break;
            case 'boolean':
              result += self.prefix + '_' + val + ' = ' + conditions[val];
              break;
            case 'object':
                result += self.prefix + '_' + val + ' >= ' + conditions[val];
              break;
            default:
              result += self.prefix + '_' + val + ' = ' + "'" + conditions[val] + "'";
              break;
          }
        }
      });
    }
    return result;
  }

}

module.exports = BaseController;
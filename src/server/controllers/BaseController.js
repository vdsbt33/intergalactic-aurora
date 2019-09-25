const utils = require('../../addons/utilities');

class BaseController {
  constructor() {
    this.table = '';
    this.fields = [];
    this.prefix = '';
    this.model = undefined;
  }

  getField(index) {
    return this.prefix + '_' + this.fields[index];
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
  GetPostSQL(object) {
    const utils = require('../../addons/utilities');
    let self = this;
    var result = 'insert into ' + self.table + ' ( ';
    
    // Columns
    self.fields.forEach(function (value, index) {
      if (object[self.getField(index)] !== undefined) {
        if (value != self.fields[0]) {
          if (value != self.fields[1])
            result += ', ';
          result += self.getField(index);
        }
      }
    });
    result += ' ) values ( ';
    // Values
      self.fields.forEach(function(value, index) {
        if (object[self.getField(index)] !== undefined) {
          if (value != self.fields[0]) {

            if (value != self.fields[1])
              result += ', ';
            if (typeof (self.model[self.getField(index)]) == 'string')
            {  
              result += '\'' + object[self.getField(index)] + '\'';
            }
            else if (typeof (self.model[self.getField(index)]) == 'object') {
                var value = '';
              try {
                value = utils.DateToString(new Date(object[self.getField(index)]));
              }
              finally {
                if (value == '' || value === undefined)
                  value = object[self.getField(index)];
                }
              result += '\'' + value + '\'';
            } else {
              result += object[self.getField(index)];
            }
          }
        }
    });
    result += ' );';

    return result;
  }

  // 
  // Get Update query
  // 
  GetUpdateSQL(object) {
    let self = this;
    var result = 'update ' + self.table + ' set ';
    
    var validValues = [];
    for (var i = 1; i < self.fields.length; i++) {
      if (object[self.getField(i)] !== undefined && object[self.getField(i)] != '')
      {
        validValues.push(i);
        break;
      }
    }

    console.log(validValues);

    // Columns - values
    validValues.forEach(function(value, index){
      if (index > 0 && index < validValues.length) {
        result += ', ';
      }
      
      console.log(index + '/'+ validValues +' | Q = ' + result);

      result += ' ' + self.getField(validValues[index]) + ' = ';

      if (typeof (self.model[self.getField(validValues[index])]) == 'string')
      {  
        result += '\'' + object[self.getField(validValues[index])] + '\'';
      }
      else if (typeof (self.model[self.getField(validValues[index])]) == 'object') {
        result += '\'' + object[self.getField(validValues[index])] + '\'';
      } else {
        result += object[self.getField(validValues[index])];
      }
    });

    // Where
    result +=  ' where ' + self.getField(0) + " = " + object[self.getField(0)];
    console.log('Res = ' + result);
    return result;
  }

  // 
  // Get Delete query
  // 
  GetDeleteSQL(id) {
    let self = this;
    
    return 'delete from ' + self.table + ' where ' + self.getField(0) + ' = ' + id;
  }

  // 
  // Returns WHERE conditions of the Controller
  // 
  GetWhere(conditions) {
    var result = '';
    let self = this;

    if (conditions.length > 0){
      result += ' where ';


      self.fields.forEach(function (value, index) {
        if (conditions[value] !== undefined) {
          if (index > 0)
            result += ' and ';


          switch (typeof self.model[self.prefix + '_' + value]) {
            case 'number':
              result += self.getField(index) + ' = ' + conditions[value];
              break;
            case 'boolean':
              result += self.getField(index) + ' = ' + conditions[value];
              break;
            case 'object':
                result += self.getField(index) + ' >= ' + conditions[value];
              break;
            default:
              result += self.getField(index) + ' = ' + "'" + conditions[value] + "'";
              break;
          }
        }
      });
    }
    return result;
  }

}

module.exports = BaseController;
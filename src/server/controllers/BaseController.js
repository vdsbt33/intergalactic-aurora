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
  // Get Update query
  // 
  GetUpdateSQL(oldObject, newObject) {
    const utils = require('../../addons/utilities');
    let self = this;
    var result = 'update ' + self.table + ' set ';
        
    // Columns - values
    self.fields.forEach(function(value, index){
      if (newObject[self.getField(index)] !== undefined) {
        console.log('VAL = ' + result);

        if (index < self.fields.length && index > 0)
          result += ', ';
      
        result += ' ' + value + ' = ';

        if (typeof (self.model[self.getField(index)]) == 'string')
        {  
          result += '\'' + newObject[self.getField(index)] + '\'';
        }
        else if (typeof (self.model[self.getField(index)]) == 'newObject') {
          result += '\'' + newObject[self.getField(index)] + '\'';
        } else {
          result += newObject[self.getField(index)];
        }
      }
    });

    // Where
    result += ' where ';
    self.fields.forEach(function (value, index){
      if (newObject[self.getField(index)] !== undefined) {
        if (index < self.fields.length && index > 0)
          result += ' and ';
          
        result += self.getField(index) + " = ";

        if (typeof (self.model[self.getField(index)]) == 'string')
        {  
          result += '\'' + oldObject[self.getField(index)] + '\'';
        }
        else if (typeof (self.model[self.getField(index)]) == 'object') {
          result += '\'' + oldObject[self.getField(index)] + '\'';
        } else {
          result += oldObject[self.getField(index)];
        }
      }
    });
    
  }

  // 
  // Generate query
  // 
  getQuery(type, object, conditions) {
    const utils = require('../../addons/utilities');
    
    let self = this;
    // object[self.getField(index)]
    var result = '';

    // if (object === undefined && type != 'post' && type != 'delete' (type != 'post' && conditions.length <= 0))
    //   throw 'All fields\' values must be present in object and only POST does not need a condition';

    switch (type) {
      case ('get'):

        break;
      case ('post'):
          result += 'insert into ' + self.table + ' ( ';
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
                      var value = 'a';
                    try {
                      value = utils.DateToString(new Date(object[self.getField(index)]));
                    }
                    finally {
                      if (value == 'a' || value === undefined)
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
        break;
      case ('put'):
        
        
        break;
      case ('delete'):

        result += 'delete from ' + self.table + ' where ';
        // Columns
        var conditionsCount = 0;
        conditions.forEach(function(value, index) {
          if (value != null && value != undefined && value != '')
            conditionsCount++;
        });

        conditions.forEach(function (value, index) {
          if (value != undefined && value != null && value != '') {

            if (index < conditions.length && index > 0)
                result += ' and ';
              
            result += self.getField(index) + " = ";

            if (typeof (self.model[self.getField(index)]) == 'string')
            {  
              result += '\'' + conditions[index] + '\'';
            }
            else if (typeof (self.model[self.getField(index)]) == 'object') {
              result += '\'' + conditions[index] + '\'';
            } else {
              result += conditions[index];
            }
          }
        });
        
        break;
    }

    console.log('RESULT = ' + result);
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
      self.fields.forEach(function (value, index) {
        if (conditions[value] !== undefined) {
          if (!isFirst)
            result += ' and ';
          else
            isFirst = false;
          
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
const ProductInfo = require('../../components/models/ProductInfo');
const BaseController  = require('./BaseController');
var conn = require('./ConnectionController');

class ProductController extends BaseController {
  constructor() {
    super();
    /// Sql Commands
    this.Sql_Get = 'select pro_identi, pro_prname, pro_pprice, pro_descri, pro_crdate, pro_eddate, pro_active from shp_produc';
    super.setFields('shp_produc', ['pro_identi', 'pro_prname', 'pro_pprice', 'pro_descri', 'pro_crdate', 'pro_eddate', 'pro_active'], new ProductInfo());
  }
  

  /* 
  Route /product/get
  */ 
  async get(req, res) {
    const { pro_identi, pro_prname, pro_pprice, pro_descri, pro_crdate, pro_eddate, pro_active } = req.body;
    

    console.log(this.Sql_Get + super.GetWhere(req.query));
    const query = this.Sql_Get + super.GetWhere(req.query);
    
    var objects = [];
    conn().query(query, function(err, result) {
      if (err) throw err;
      for (var i = 0; i < result.length; i++) {
        objects.push(result[i]);
      }

      return res.json(objects);
    });
  }
  
  /* 
  Route /product/post
  */ 
  async post(req, res) {
    const { Id, Name, Price, Description, CreationDate, EditedDate, Active } = req.body;

    console.log('/// ' + Name);

    // if (!prname && !pprice) 
    //   return 'ERROR. You must insert PRNAME and PPRICE.';
    
    // pro_identi, pro_prname, pro_pprice, pro_descri, pro_crdate, pro_eddate, pro_active
    var object = new ProductInfo(undefined, Name, Price, Description, undefined, undefined, Active);
    var conditions = new Map([]);


    const query = super.getQuery('post', object, conditions);
    
    conn().query(query, function(err, result) {
      if (err) throw err;

      return res.json(result[0]);
    });
  }
  
  /* 
  Route /product/delete
  */ 
  async delete(req, res) {
    const { Id, Name, Price, Description, CreationDate, EditedDate, Active } = req.body;

    var object = undefined;
    var conditions = [Id, Name, Price, Description, CreationDate, EditedDate, Active];

    console.log('/// ' + conditions);

    const query = super.getQuery('delete', object, conditions);
    
    conn().query(query, function(err, result) {
      if (err) throw err;

      return res.json(result[0]);
    });
  }
  
  /* 
  Route /product/put
  */ 
  async put(req, res) {
    const { Id, Name, Price, Description, CreationDate, EditedDate, Active
          } = req.body;

    var object = new ProductInfo(Id, Name, Price, Description, CreationDate, EditedDate, Active);
    if (CreationDate === undefined)
    object.pro_crdate = undefined;

    console.log('/// ' + object);

    const query = super.GetUpdateSQL(object);
    
    conn().query(query, function(err, result) {
      if (err) throw err;

      return res.json(result[0]);
    });
  }

}


module.exports = new ProductController();
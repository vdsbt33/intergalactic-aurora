const ProductInfo = require('../../components/models/ProductInfo');
const BaseController  = require('./BaseController');
var conn = require('./ConnectionController');

class ProductController extends BaseController {
  constructor() {
    super();
    /// Sql Commands
    this.Sql_Get = 'select pro_identi, pro_prname, pro_pprice, pro_descri, pro_crdate, pro_eddate, pro_active from shp_produc';
    this.Sql_Post = 'insert into shp_produc ( pro_prname, pro_pprice, pro_descri, pro_crdate, pro_eddate, pro_active ) values ( ?, ?, ?, ?, ?, ? )';
    super.setFields('shp_produc', ['pro_identi', 'pro_prname', 'pro_pprice', 'pro_descri', 'pro_crdate', 'pro_eddate', 'pro_active'], new ProductInfo());
  }
  

  /* 
  Route /product/get
  */ 
  async get(req, res) {
    const { pro_identi, pro_prname, pro_pprice, pro_descri, pro_crdate, pro_eddate, pro_active } = req.body;
    

    console.log(this.Sql_Get + super.getWhere(req.query));
    const query = this.Sql_Get + super.getWhere(req.query);
    
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
    const { pro_prname, pro_pprice, pro_descri, pro_crdate, pro_eddate, pro_active } = req.body;

    if (!pro_prname && !pro_pprice) 
    var values = [req.body];
    var conditions = [];
    console.log(super.getQuery('post', values, new Map(conditions)));
    
    console.log(this.Sql_Post + super.getWhere(req.query));
    const query = this.Sql_Post + super.getWhere(req.query);
    
    conn().query(query, function(err, result) {
      if (err) throw err;

      return res.json(result[0]);
    });
  }

}


module.exports = new ProductController();

// 
// Structure
// 
class ProductInfo {
  constructor(pro_identi, pro_prname, pro_pprice, pro_descri, pro_crdate, pro_eddate, pro_active) {
    this.pro_identi = pro_identi != undefined ? pro_identi : 0;
    this.pro_prname = pro_prname != undefined ? pro_prname : '';
    this.pro_pprice = pro_pprice != undefined ? pro_pprice : 0;
    this.pro_descri = pro_descri != undefined ? pro_descri : '';
    this.pro_crdate = pro_crdate != undefined ? pro_crdate : new Date();
    this.pro_eddate = pro_eddate != undefined ? pro_eddate : '';
    this.pro_active = pro_active != undefined ? pro_active : true;
  }
}

module.exports = ProductInfo;
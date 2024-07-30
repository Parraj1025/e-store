// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');
const Category = require('./Category');
const Tag = require('./Tag')
// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
    },
    // category_id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: Category,
    //     key: 'id'
    //   }
    // },
    tag_id: {
      type: DataTypes.INTEGER,
     references: {
      model: Tag,
       key: 'id'
     }}
    },
    // define columns
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Product',
  }
);


Product.belongsTo(Tag, { foreignKey: 'id' });
Tag.hasMany(Product, { foreignKey: 'id' })

module.exports = Product;

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Produk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Produk.belongsTo(models.User, {
        as: "created",
        foreignKey: "createdBy",
      }),
        Produk.belongsTo(models.User, {
          as: "updated",
          foreignKey: "updatedBy",
        }),
        Produk.belongsTo(models.User, {
          as: "deleted",
          foreignKey: "deletedBy",
        });
    }
  }
  Produk.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: DataTypes.STRING,
      harga: DataTypes.INTEGER,
      deskripsi: DataTypes.STRING,
      category: DataTypes.ENUM("makanan", "minuman", "fashion"),
      createdBy: DataTypes.UUID,
      updatedBy: DataTypes.UUID,
      deletedBy: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Produk",
      paranoid: true,
    }
  );
  return Produk;
};

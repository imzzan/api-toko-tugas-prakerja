"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Produk, {
        as: "created",
        foreignKey: "createdBy",
      }),
        User.hasMany(models.Produk, {
          as: "updated",
          foreignKey: "updatedBy",
        }),
        User.hasMany(models.Produk, {
          as: "deleted",
          foreignKey: "deletedBy",
        });
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.ENUM("admin", "costomer"),
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};

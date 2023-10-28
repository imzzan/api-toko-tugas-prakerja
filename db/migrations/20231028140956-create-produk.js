'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Produks', {
      id: {
        allowNull: false,
        primaryKey: true,
        type : Sequelize.UUID,
        defaultValue : Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING,
        allowNull : false,
        validate : {
          noEmpty : true,
        }
      },
      harga: {
        type: Sequelize.INTEGER,
        allowNull : false,
      },
      deskripsi: {
        type: Sequelize.STRING,
        allowNull : false,
        validate : {
          noEmpty : true,
        }
      },
      category: {
        type: Sequelize.ENUM("makanan", "minuman", "fashion")
      },
      createdBy: {
        allowNull: false,
        type: Sequelize.UUID,
        references : {
          model : "Users",
          key : "id"
        }
      },
      updatedBy: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model : "Users",
          key : "id"
        }
      },
      deletedBy: {
        type: Sequelize.UUID,
        allowNull : true,
        references: {
          model : "Users",
          key : "id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Produks');
  }
};
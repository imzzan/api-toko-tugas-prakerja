'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
        allowNull : false,
        validate : {
          noEmpty : true,
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull : false,
        unique : true,
        validate : {
          noEmpty : true,
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull : false,
        validate : {
          noEmpty : true,
        }
      },
      role: {
        type: Sequelize.ENUM('admin', 'costomer')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
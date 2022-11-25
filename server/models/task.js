'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Task extends Model { }

  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Do not leave title empty'},
        notNull: { msg: 'Do not leave title null'}
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Do not leave category empty'},
        notNull: { msg: 'Do not leave category null'}
      }
    },
    UserId: DataTypes.INTEGER

  }, { sequelize });

  Task.associate = function(models) {
    // associations can be defined here
    Task.belongsTo(models.User)
  };
  return Task;
};
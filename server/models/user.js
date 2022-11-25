'use strict';
const bcrypt = require('bcrypt')
const saltRounds=10
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model { }
  
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Do not leave email empty'},
        notNull: { msg: 'Do not leave email null'},
        uniqueEmail(input){
          return User.findOne({
            where: { email: input }
          })
          .then(response => {
            if (response) throw new Error('Email taken.')
          })
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Do not leave password empty'},
        notNull: { msg: 'Do not leave password null'}
      }
    },
    organization: DataTypes.STRING,
  }, { sequelize });

  User.addHook('beforeCreate', (user, options)=> {
    user.password = bcrypt.hashSync(user.password, saltRounds)
    user.organization = 'Hacktiv8'
  })
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Task)
  };
  return User;
};
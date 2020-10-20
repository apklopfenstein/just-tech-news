const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our User Model
class User extends Model {}

// define table columns and confirguration
User.init(
    {
        // Define an id column
        id: {
            // Use the special Sequelize DataTypes objects provide what type of data it is
            type: DataTypes.INTEGER,
            // This is the equivalent of SQL's `NOT NULL` option
            allowNull: false,
            // Instruct that this is the Primary Key
            primaryKey: true,
            // Turn on auto increment
            autoIncrement: true
        },
        // Define a username column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // Define an email column
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            // There cannot be any duplicate email values in this table
            unique: true,
            // If allowNull is set to false, we can run our data through validators before creating the table data
            validate: {
                isEmail: true
            }
        },
        // Define a password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // this means the password must be atleast four characters long
                len: [4]
            }
        }
    },
    {
        // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))

        // Pass in our imported sequelize connection (the direct connection to our database)
        sequelize,
        // Dont automatically create createdAt/updatedAt timestamp fields
        timestamps: false,
        // Don't pluralize name of database table
        freezeTableName: true,
        // Use underscores instead of camel-casing
        underscored: true,
        // Make it so our model name stays lowercase in the database
        modelName: 'user'
    }
);

module.exports = User;
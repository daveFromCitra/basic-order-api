import { Model, DataTypes } from 'sequelize'
import sequelize from '../config/connection.js'

class Order extends Model {}

Order.init({
    id: {
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    sourceId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    account: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'item',
}
)

export default Order
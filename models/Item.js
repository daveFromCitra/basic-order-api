import { Model, DataTypes } from 'sequelize'
import sequelize from '../config/connection.js'

class Item extends Model {}
Item.init({
    id: {
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    itemTemplate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    itemTemplate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    shippingAddressName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    shippingAddressLine1: {
        type: DataTypes.STRING,
        allowNull: false
    },    
    shippingAddressLine2: {
        type: DataTypes.STRING,
        allowNull: true
    },
    shippingAddressLine3: {
        type: DataTypes.STRING,
        allowNull: true
    },
    shippingAddressZipCode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    shippingAddressTown: {
        type: DataTypes.STRING,
        allowNull: false
    },
    shippingAddressState: {
        type: DataTypes.STRING,
        allowNull: false
    },
    shippingAddressIsoCountry: {
        type: DataTypes.STRING,
        allowNull: false
    },
    shippingAddressCountry: {
        type: DataTypes.STRING,
        allowNull: true
    },
    shippingAddressEmail: {
        type: DataTypes.STRING,
        allowNull: true
    },
    shippingAddressPhone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    artFrontUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    artBackUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
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

export default Item
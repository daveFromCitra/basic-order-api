import Order from './Order.js';
import Item from './Item.js';
// import Account from './Account.js';

// Order had many items
Order.hasMany(Item)

// Item belongs to one Order
Item.belongsTo(Order)


export default {
    Item,
    Order
}


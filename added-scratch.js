import express from 'express';
import { Sequelize, DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

const sequelize = new Sequelize('database_name', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  account: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

const Item = sequelize.define('Item', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  template: {
    type: DataTypes.STRING,
    allowNull: false
  },
  artworkFront: {
    type: DataTypes.STRING,
    allowNull: false
  },
  artworkBack: {
    type: DataTypes.STRING,
    allowNull: false
  },
  shippingName: {
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
  shippingAddressPostalCode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  shippingAddressCity: {
    type: DataTypes.STRING,
    allowNull: false
  },
  shippingAddressState: {
    type: DataTypes.STRING,
    allowNull: false
  },
  shippingAddressCountry: {
    type: DataTypes.STRING,
    allowNull: false
  },
  shippingAddressPhoneNumber: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Order.hasMany(Item, { as: 'items', foreignKey: 'orderId' });
Item.belongsTo(Order, { as: 'order', foreignKey: 'orderId' });

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to database has been established successfully.');
    await sequelize.sync();
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

const app = express();
app.use(express.json());

app.post('/orders', async (req, res) => {
  try {
    const { account, items } = req.body;
    const orderId = uuidv4(); // generate a new UUID for the order

    const createdOrder = await Order.create({ id: orderId, account });

    const createdItems = await Promise.all(items.map(item => {
      const itemId = uuidv4(); // generate a new UUID for the item
      return Item.create({
        id: itemId,
        template: item.template,
        artworkFront: item.artworkFront,
        artworkBack: item.artworkBack,
        shippingName: item.shippingName,
        shippingAddressLine1: item.shippingAddressLine1,
        shippingAddressLine2: item.shippingAddressLine2,
        shippingAddressLine3: item.shippingAddressLine3,
        shippingAddressPostalCode: item.shippingAddressPostalCode,
        shippingAddressCity: item.shippingAddressCity,
        shippingAddressState: item.shippingAddressState,
        shippingAddressCountry: item.shippingAddressCountry,
        shippingAddressPhoneNumber: item.shippingAddressPhoneNumber,
        orderId: orderId
      });
    }));

    res.json({
      order: createdOrder,
      items: createdItems
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

app.get('/order/:id', async (req, res) => {
    try {
      const orderId = req.params.id;
      const order = await Order.findByPk(orderId, { include: [{ model: Item, as: 'items' }] });
      if (!order) {
        res.status(404).json({ message: 'Order not found' });
        return;
      }
      res.json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error getting order' });
    }
  });

  app.get('/orders', async (req, res) => {
    try {
      const orders = await Order.findAll({ include: [{ model: Item, as: 'items' }] });
      res.json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error getting orders' });
    }
  });


app.listen(3000, () => {
  console.log('Server listening on port 3000');
});


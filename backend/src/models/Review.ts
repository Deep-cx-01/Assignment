import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import Product from './Product';

class Review extends Model {
  public id!: string;
  public userId!: string;
  public productId!: string;
  public rating!: number;
  public comment!: string;
  public helpful!: number;
  public tags!: string[];
  public images?: string[];
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Review.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Product,
        key: 'id',
      },
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    helpful: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
  },
  {
    sequelize,
    modelName: 'Review',
    indexes: [
      {
        unique: true,
        fields: ['userId', 'productId'],
        name: 'unique_user_product_review',
      },
    ],
  }
);

// Define associations
Review.belongsTo(User, { foreignKey: 'userId' });
Review.belongsTo(Product, { foreignKey: 'productId' });

export default Review; 
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Product extends Model {
  public id!: string;
  public name!: string;
  public description!: string;
  public price!: number;
  public image!: string;
  public category!: string;
  public averageRating!: number;
  public totalReviews!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100],
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    averageRating: {
      type: DataTypes.DECIMAL(3, 2),
      defaultValue: 0,
      validate: {
        min: 0,
        max: 5,
      },
    },
    totalReviews: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
  },
  {
    sequelize,
    modelName: 'Product',
  }
);

export default Product; 
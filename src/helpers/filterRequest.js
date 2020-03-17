import Sequelize from 'sequelize';

const {
  Op, where, cast, col,
} = Sequelize;

const requestFilter = (key, value) => [
  where(
    cast(col(key), 'varchar'),
    { [Op.iLike]: `%${value}%` },
  ),
];
export default (requestFilter);

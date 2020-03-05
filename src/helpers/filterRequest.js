import Sequelize from 'sequelize';

const {
  Op, where, cast, col,
} = Sequelize;

const requestFilter = (key, value) => [
  where(
    cast(col(key), 'varchar'),
    { [Op.like]: `%${value}%` },
  ),
];
export default (requestFilter);

import { Config } from "src/config/config";
import DB from "src/utility/dbUtil";
const { name: dbName } = Config.db[0];

export default class UserService {
  static async regist(data: any) {
    const dml = "INSERT INTO `tbUser`";
    const model = "(`id`, `pwd`)";
    const value = "VALUES (?,?)";
    const sql = [dml, model, value].join(" ");

    return await DB.execute(dbName, sql, [data.id, data.pwd]);
  }

  static async login(data: any) {
    const dql = "SELECT `id`, `pwd`";
    const model = "FROM `tbUser`";
    const value = "WHERE `id` = ? AND `pwd` = ?";
    const sql = [dql, model, value].join(" ");

    const rows = await DB.execute(dbName, sql, [data.id, data.pwd]);
    return rows[0];
  }

  static async auth(data: any) {
    const dql = "SELECT `id`, `name`, `phone`";
    const model = "FROM `tbUser`";
    const value = "WHERE `userIdx` = ?";
    const sql = [dql, model, value].join(" ");

    const result = await DB.execute(dbName, sql, [data.userIdx]);
    return result[0];
  }
}

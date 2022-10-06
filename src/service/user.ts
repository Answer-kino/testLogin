import { Config } from "src/config/config";
import DB from "src/utility/dbUtil";
const { name: dbName } = Config.db[0];

export default class UserService {
  static async regist(data: any) {
    const dml = "INSERT INTO `user`";
    const model = "(`id`, `pwd`, `name`)";
    const value = "VALUES (?,?,?)";
    const sql = [dml, model, value].join(" ");

    return await DB.execute(dbName, sql, [data.id, data.pwd, data.name]);
  }

  static async curPassword(data: any) {
    const dql = "SELECT `pwd`";
    const model = "FROM `user`";
    const value = "WHERE `id` = ?";
    const sql = [dql, model, value].join(" ");

    const rows = await DB.execute(dbName, sql, [data.id]);
    return rows[0];
  }

  static async login(data: any) {
    const dql = "SELECT `userIdx`, `id`";
    const model = "FROM `user`";
    const value = "WHERE `id` = ?";
    const sql = [dql, model, value].join(" ");

    const rows = await DB.execute(dbName, sql, [data.id, data.pwd]);
    return rows[0];
  }

  static async auth(data: any) {
    const dql = "SELECT `userIdx`, `id`, `name`";
    const model = "FROM `user`";
    const value = "WHERE `id` = ? AND `userIdx` = ?";
    const sql = [dql, model, value].join(" ");

    const result = await DB.execute(dbName, sql, [data.id, data.userIdx]);
    return result[0];
  }
}

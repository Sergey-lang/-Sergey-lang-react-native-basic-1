import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('post.db');

export class DB {
  // SQLTransaction
  /* https://docs.expo.dev/versions/latest/sdk/sqlite/#sqltransaction */

  /* https://www.w3schools.com/sql/sql_primarykey.asp */
  static init() {
    return new Promise((res, rej) => {
      db.transaction((tx) => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY NOT NULL, text TEXT NOT NULL, img TEXT, date TEXT, booked INT)',
          [],
          res,
          (_, error) => rej(error),
        );
      });
    });
  };

  static getPosts() {
    return new Promise((res, rej) => {
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT * FROM posts',
            [],
            (_, result) => res(result.rows._array),
            (_, error) => rej(error),
          );
        });
      }
    );
  };

  /* https://www.w3schools.com/sql/sql_insert.asp */
  static createPosts({ text, date, booked, img }) {
    return new Promise((res, rej) => {
        db.transaction((tx) => {
          tx.executeSql(
            `INSERT INTO posts (text, date, booked, img) VALUES (?,?,?,?)`,
            [text, date, 0, img],
            (_, result) => res(result.insertId),
            (_, error) => rej(error),
          );
        });
      }
    );
  };

  /* https://www.w3schools.com/sql/sql_update.asp */
  static updatePosts(post) {
    return new Promise((res, rej) => {
        db.transaction((tx) => {
          tx.executeSql(
            'UPDATE posts SET booked = ? WHERE id = ?',
            [post.booked ? 0 : 1, post.id],
            res,
            (_, error) => rej(error),
          );
        });
      }
    );
  };

  /* https://www.w3schools.com/sql/sql_delete.asp */
  static removePosts(id) {
    return new Promise((res, rej) => {
        db.transaction((tx) => {
          tx.executeSql(
            'DELETE FROM posts WHERE id = ?',
            [id],
            res,
            (_, error) => rej(error),
          );
        });
      }
    );
  }
}

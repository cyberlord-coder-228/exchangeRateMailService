import Database from 'better-sqlite3';
const db = new Database('users.db');

// const query = `
//   CREATE TABLE emails (
//     id INTEGER PRIMARY KEY,
//     email STRING NOT NULL UNIQUE
//   )
// `;
// db.exec(query);

const subscribtionData = db.prepare(
  "INSERT INTO emails (email) VALUES (?)"
);

async function subscribe(req, res) {
  try {
    subscribtionData.run(req.body.email);
    res.status(201).send(`User subscribed: ${req.body.email}`);
  } catch(e) {
    console.error(e);
  }
}

const unsubscribeQuery = db.prepare(
  "DELETE FROM emails WHERE (email) = (?)"
);

async function unsubscribe(req, res) {
  try {
    unsubscribeQuery.run(req.body.email);
    res.status(201).send(`User unsubscribed: ${req.body.email}`);
    console.log(`User ${req.body.email} unsubscribed`);
  } catch(e) {
    console.error(e);
  }
}

export { subscribe, unsubscribe };

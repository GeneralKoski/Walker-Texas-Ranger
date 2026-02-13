import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("pedometer.db");

export const initDatabase = async () => {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS daily_steps (
      id INTEGER PRIMARY KEY NOT NULL,
      date TEXT UNIQUE NOT NULL,
      count INTEGER DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY NOT NULL,
      value TEXT
    );
  `);
};

export const saveDailySteps = async (date, count) => {
  await db.runAsync(
    "INSERT OR REPLACE INTO daily_steps (date, count) VALUES (?, ?);",
    [date, count],
  );
};

export const getStepsByDate = async (date) => {
  const result = await db.getFirstAsync(
    "SELECT count FROM daily_steps WHERE date = ?;",
    [date],
  );
  return result ? result.count : 0;
};

export const getStepsRange = async (startDate, endDate) => {
  return await db.getAllAsync(
    "SELECT * FROM daily_steps WHERE date BETWEEN ? AND ? ORDER BY date DESC;",
    [startDate, endDate],
  );
};

export const getWeeklySteps = async () => {
  // Get last 7 days
  return await db.getAllAsync(
    "SELECT * FROM daily_steps ORDER BY date DESC LIMIT 7;",
  );
};

export const setTarget = async (target) => {
  await db.runAsync(
    "INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?);",
    ["daily_goal", target.toString()],
  );
};

export const getTarget = async () => {
  const result = await db.getFirstAsync(
    "SELECT value FROM settings WHERE key = ?;",
    ["daily_goal"],
  );
  return result ? parseInt(result.value) : 10000;
};

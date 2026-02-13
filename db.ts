import * as SQLite from "expo-sqlite";

interface DailyStepsRow {
  id: number;
  date: string;
  count: number;
}

interface SettingsRow {
  key: string;
  value: string;
}

const db = SQLite.openDatabaseSync("pedometer.db");

export const initDatabase = async (): Promise<void> => {
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

export const saveDailySteps = async (date: string, count: number): Promise<void> => {
  await db.runAsync(
    "INSERT OR REPLACE INTO daily_steps (date, count) VALUES (?, ?);",
    [date, count],
  );
};

export const getStepsByDate = async (date: string): Promise<number> => {
  const result = await db.getFirstAsync<DailyStepsRow>(
    "SELECT count FROM daily_steps WHERE date = ?;",
    [date],
  );
  return result ? result.count : 0;
};

export const getStepsRange = async (
  startDate: string,
  endDate: string,
): Promise<DailyStepsRow[]> => {
  return await db.getAllAsync<DailyStepsRow>(
    "SELECT * FROM daily_steps WHERE date BETWEEN ? AND ? ORDER BY date DESC;",
    [startDate, endDate],
  );
};

export const getWeeklySteps = async (): Promise<DailyStepsRow[]> => {
  return await db.getAllAsync<DailyStepsRow>(
    "SELECT * FROM daily_steps ORDER BY date DESC LIMIT 7;",
  );
};

export const setTarget = async (target: number): Promise<void> => {
  await db.runAsync(
    "INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?);",
    ["daily_goal", target.toString()],
  );
};

export const getTarget = async (): Promise<number> => {
  const result = await db.getFirstAsync<SettingsRow>(
    "SELECT value FROM settings WHERE key = ?;",
    ["daily_goal"],
  );
  return result ? parseInt(result.value, 10) : 10000;
};

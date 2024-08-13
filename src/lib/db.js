import { sql } from "@vercel/postgres";

export async function initDb() {
  await sql`
    CREATE TABLE IF NOT EXISTS mock_data (
      hash TEXT PRIMARY KEY,
      data JSONB NOT NULL,
      expiration_time BIGINT NOT NULL
    )
  `;
}

export async function saveData(hash, data, expirationTime) {
  await sql`
    INSERT INTO mock_data (hash, data, expiration_time)
    VALUES (${hash}, ${JSON.stringify(data)}, ${expirationTime})
    ON CONFLICT (hash) DO UPDATE
    SET data = ${JSON.stringify(data)}, expiration_time = ${expirationTime}
  `;
}

export async function getData(hash) {
  const result = await sql`
    SELECT * FROM mock_data WHERE hash = ${hash}
  `;
  if (result.rows.length > 0) {
    return {
      data: result.rows[0].data,
      expirationTime: result.rows[0].expiration_time,
    };
  }
  return null;
}

export async function deleteExpiredData() {
  await sql`
    DELETE FROM mock_data WHERE expiration_time < ${Date.now()}
  `;
}

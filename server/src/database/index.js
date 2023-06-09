// Remember to set type: module in package.json or use .mjs extension
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { LowSync } from 'lowdb';
import { JSONFileSync } from 'lowdb/node';

// File path
const __dirname = dirname(fileURLToPath(import.meta.url));

const file = join(__dirname, 'db.json');

console.log(file);

// Configure lowdb to write to JSONFileSync
const adapter = new JSONFileSync(file);
const db = new LowSync(adapter);

// Read data from JSON file, this will set db.data content
db.read();

export default db;

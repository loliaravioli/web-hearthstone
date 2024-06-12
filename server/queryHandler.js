const { Pool } = require('pg');
const dbConfig = process.env.DATABASE_URL ? {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 5 * 1000,
    idleTimeoutMillis: 10 * 1000
} : {
    user: 'postgres',
    host: 'localhost',
    database: 'scrabble',
    password: 'admin',
    port: 5432,
    connectionTimeoutMillis: 5 * 1000,
    idleTimeoutMillis: 10 * 1000
}, pool = new Pool(dbConfig);

class QueryHandler {
    constructor(tableName, pool) {
        this.tableName = tableName;
        this.pool = pool;
    }

    async delete(params = {}) {
        const { where = [] } = params;
        let query = `DELETE FROM ${this.tableName}`;
        if (where.length > 0) {
            let whereConditions = [];
            for (const s of where) {
                if (typeof s['value'] === 'number' || (s['type'] && s['type'] === 'SQL')) {
                    whereConditions.push(`${s['key']}=${s['value']}`);
                }
                else if (typeof s['value'] === 'string') {
                    whereConditions.push(`${s['key']}='${s['value']}'`);
                }
            }
            const whereSection = whereConditions.join(' AND ');
            query += ` WHERE ${whereSection}`;
        }
        query += ' RETURNING *;';
        console.log(query);

        try {
            const client = await this.pool.connect();
            const { rows } = await client.query(query);
            client.release();
            return rows;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async insert(params = {}) {
        const { columns = [], values = [] } = params;
        let query = `INSERT INTO ${this.tableName} (${columns.join(', ')}) VALUES (`;
        if (values.length > 0) {
            let valuesList = [];
            for (const s of values) {
                if (typeof s === 'string') {
                    valuesList.push(`'${s}'`);
                } else if (typeof s === 'number') {
                    valuesList.push(s);
                }
            }
            const valuesSection = valuesList.join(', ');
            query += valuesSection;
        }
        query += ');';
        console.log(query);

        try {
            const client = await this.pool.connect();
            const { rows } = await client.query(query);
            client.release();
            return rows;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async select(params = {}) {
        const { columns = '*', where = [] } = params;
        let query = `SELECT ${columns} FROM ${this.tableName}`;
        if (where.length > 0) {
            let whereConditions = [];
            for (const s of where) {
                if (typeof s['value'] === 'string') {
                    whereConditions.push(`${s['key']}='${s['value']}'`);
                } else if (typeof s['value'] === 'number') {
                    whereConditions.push(`${s['key']}=${s['value']}`);
                }
            }
            const whereSection = whereConditions.join(' AND ');
            query += ` WHERE ${whereSection}`;
        }
        query += ';';
        console.log(query);

        try {
            const client = await this.pool.connect();
            const { rows } = await client.query(query);
            client.release();
            return rows;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async update(params = {}) {
        const { set = [], where = [] } = params;

        let setConditions = [];
        for (const s of set) {
            if (typeof s['value'] === 'string') {
                setConditions.push(`${s['key']}='${s['value']}'`);
            } else if (typeof s['value'] === 'number') {
                setConditions.push(`${s['key']}=${s['value']}`);
            }
        }
        const setSection = setConditions.join(', ');

        let whereConditions = [];
        for (const s of where) {
            if (typeof s['value'] === 'string') {
                whereConditions.push(`${s['key']}='${s['value']}'`);
            } else if (typeof s['value'] === 'number') {
                whereConditions.push(`${s['key']}=${s['value']}`);
            }
        }
        const whereSection = whereConditions.join(' AND ');

        const query = `UPDATE ${this.tableName} SET ${setSection} WHERE ${whereSection};`;
        console.log(query);

        try {
            const client = await this.pool.connect();
            const { rows } = await client.query(query);
            client.release();
            return rows;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
}

module.exports = new QueryHandler('game', pool);
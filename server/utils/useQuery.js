import mysql from 'mysql2/promise'

export default function useQuery() {
	const CONFIG = useRuntimeConfig()

	async function doDBQuery(sql, inserts) {
		const conn1 = await mysql.createPool({
			host: CONFIG.DB_HOST,
			user: CONFIG.DB_USER,
			password: CONFIG.DB_PASSWORD,
			database: CONFIG.DB_DATABASE,
		})
		if (inserts) {
			sql = mysql.format(sql, inserts)
		}
		// console.log('IN dbQery sql = ', sql)
		const [rows, fields] = await conn1.execute(sql)
		await conn1.end()
		return rows
	}

	async function doDBQueryBuffalorugby(sql, inserts) {
		const conn1 = await mysql.createPool({
			host: CONFIG.DB_HOST,
			user: CONFIG.DB_USER,
			password: CONFIG.DB_PASSWORD,
			database: 'buffalorugby',
		})

		const r = await conn1.execute("SET time_zone = '+00:00'")
		if (inserts) {
			sql = mysql.format(sql, inserts)
		}
		const [rows, fields] = await conn1.execute(sql)
		await conn1.end()
		return rows
	}

	async function doDBQueryDatestring(sql, inserts) {
		const conn1 = await mysql.createPool({
			host: CONFIG.DB_HOST,
			user: CONFIG.DB_USER,
			password: CONFIG.DB_PASSWORD,
			database: 'buffalorugby',
			dateStrings: '["DATETIME", "DATE"]',
		})

		await conn1.execute("SET time_zone = '+00:00'")
		if (inserts) {
			sql = mysql.format(sql, inserts)
		}
		const [rows, fields] = await conn1.execute(sql)
		await conn1.end()
		return rows
	}

	async function doDBQueryTZ0(sql, inserts) {
		const conn1 = await mysql.createPool({
			host: CONFIG.DB_HOST,
			user: CONFIG.DB_USER,
			password: CONFIG.DB_PASSWORD,
			database: 'buffalorugby',
		})

		await conn1.execute("SET time_zone = '+00:00'")
		if (inserts) {
			sql = mysql.format(sql, inserts)
		}
		const [rows, fields] = await conn1.execute(sql)
		await conn1.end()
		return rows
	}

	return {
		doDBQuery,
		doDBQueryBuffalorugby,
		doDBQueryDatestring,
		doDBQueryTZ0,
	}
}

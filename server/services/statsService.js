import mysql from 'mysql2/promise'
const CONFIG = useRuntimeConfig()
const { doDBQueryBuffalorugby } = useQuery()
const { getConnectionBuffalorugby } = useDBConnection()

export const statsService = {
	getAll,
	getOne,
	addOne,
	editOne,
	getYear,
	getSeason,
	getAdjacent,
	getPrevious,
	getGameTypes,
	getPlayerStats,
	getGameCount,
	getPlayerGames,
	getRosterStats,
	getTeamStats,
	getTeamStatsTotal,
	getPlayers,
	getHistory,
	getHistoryTotals,
	getHistoryStreaks,
	getHistoryCurrentStreak,
	deleteOne,
	changeStatus,
}

async function getHistoryTotals(id) {
	const sql = `SELECT
								COUNT(game_id) as game_count,
								SUM(IF(ptsFor>ptsAgn,1,0)) as wins,
								SUM(IF(ptsFor<ptsAgn,1,0)) as losses,
								MAX(ptsFor) as maxFor,
								MAX(ptsAgn) as maxAgn,
								MAX(ptsFor-ptsAgn) as maxWinMargin,
								MAX(ptsAgn-ptsFor) as maxLossMargin,
								SUM(IF(ptsFor=ptsAgn AND ptsFor != 0 ,1,0)) as ties,
								SUM(IF((ptsFor=0) AND (ptsAgn=0),1,0)) as unknown
							FROM
								inbrc_stats_games
							WHERE
								opponent_id = ${id}
								AND deleted = 0
								AND Status = 1`

	const stats = await doDBQueryBuffalorugby(sql)
	return stats[0]
}

async function getHistoryStreaks(id) {
	const sql1 = `SELECT
									date_ut,
									result,
									(
									SELECT
											COUNT(*)
									FROM
											inbrc_stats_games G
									WHERE
											G.result <> GR.result AND G.date_ut <= GR.date_ut AND G.opponent_id = ${id}
									ORDER BY
											G.date_ut ASC
								) AS rungroup
								FROM
									inbrc_stats_games GR
								WHERE
									opponent_id = ${id} AND result <> 'U'
									AND GR.deleted = 0
									AND GR.Status = 1
								ORDER BY
									date_ut ASC`

	const sql = `SELECT
								result,
								MIN(date_ut) as StartDate,
								MAX(date_ut) as EndDate,
								COUNT(*) as Games
								FROM (${sql1}) A
								GROUP BY result, RunGroup
								HAVING COUNT(*) > 1
								ORDER BY Min(date_ut)`

	const stats = await doDBQueryBuffalorugby(sql)
	return stats
}

async function getHistoryCurrentStreak(id) {
	/* 	const sql1 = `SELECT
									date,
									date_ut,
									result,
									(
									SELECT
											COUNT(*)
									FROM
											inbrc_stats_games G
									WHERE
											G.result <> GR.result AND G.date_ut <= GR.date_ut AND G.opponent_id = ${id}
									ORDER BY
											G.date_ut ASC
								) AS rungroup
								FROM
									inbrc_stats_games GR
								WHERE
									opponent_id = ${id}
									AND GR.deleted = 0
									AND GR.Status = 1
								ORDER BY
									date_ut ASC`
 */
	/* 	const sql2 = `SELECT result,
								MIN(date_ut) as StartDate,
								MAX(date_ut) as EndDate,
								COUNT(*) as Games
								FROM (SELECT
									date_ut,
									result,
									(
									SELECT
											COUNT(*)
									FROM
											inbrc_stats_games G
									WHERE
											G.result <> GR.result AND G.date_ut <= GR.date_ut AND G.opponent_id = ${id}
									ORDER BY
											G.date_ut ASC
								) AS rungroup
								FROM
									inbrc_stats_games GR
								WHERE
									opponent_id = ${id}
									AND GR.deleted = 0
									AND GR.Status = 1
								ORDER BY
									date ASC) A
								GROUP BY result, RunGroup
								ORDER BY Min(date_ut)`

								 */
	const sql = `SELECT TOP 1 *
								FROM (SELECT result,
								MIN(date_ut) as StartDate,
								MAX(date_ut) as EndDate,
								COUNT(*) as Games
								FROM (SELECT
									date_ut,
									result,
									(
									SELECT
											COUNT(*)
									FROM
											inbrc_stats_games G
									WHERE
											G.result <> GR.result AND G.date_ut <= GR.date_ut AND G.opponent_id = ${id}
									ORDER BY
											G.date_ut ASC
								) AS rungroup
								FROM
									inbrc_stats_games GR
								WHERE
									opponent_id = ${id}
									AND GR.deleted = 0
									AND GR.Status = 1
								ORDER BY
									date ASC) A
								GROUP BY result, RunGroup
								ORDER BY Min(date_ut)) B
								ORDER BY Games DESC
								WHERE
									result = 'W'
									AND
									opponent_id = ${id}`

	const stats = await doDBQueryBuffalorugby(sql)
	return stats
}

async function getHistory(id) {
	const sql = `SELECT
			o.opponent_name,
			g.date_ut,
			g.venue,
			g.comment,
			g.game_level,
			g.occasion,
			t.game_type,
			g.ptsFor,
			g.ptsAgn
		FROM
			inbrc_stats_game_types t,
			inbrc_stats_games g
			LEFT JOIN inbrc_opponents o ON o.opponent_id = g.opponent_id
		WHERE
			t.game_type_id = g.game_type_id
			AND g.opponent_id = ${id}
			AND g.deleted = 0
			AND g.Status = 1
		ORDER BY
			g.date_ut ASC`

	const games = await doDBQueryBuffalorugby(sql)
	return games
}

async function getAll(sort = 'DESC') {
	const sql =
		`SELECT
				game_id,
				game_id as id,
				o.opponent_name,
				o.opponent_name AS title,
				g.opponent_id,
				referee,
				venue,
				comment,
				g.date_ut,
				t.game_type,
				t.game_type_id,
				game_level,
				occasion,
				ptsFor,
				ptsAgn,
				g.Status,
				g.Status as status,
				g.deleted,
				g.deleted_dt,
				g.created_dt,
				g.modified_dt
			FROM
				inbrc_stats_game_types t,
				inbrc_stats_games g
				LEFT JOIN inbrc_opponents o ON o.opponent_id = g.opponent_id
			WHERE
				g.deleted = 0
				AND g.Status = 1
				AND t.game_type_id = g.game_type_id
			ORDER BY
				date_ut ` + sort

	const games = await doDBQueryBuffalorugby(sql)
	return games
}

async function getPrevious(date_ut) {
	const sql = `SELECT
						g.game_id,
						o.opponent_name,
						g.date_ut,
						g.game_level
					FROM
						inbrc_stats_games g
						LEFT JOIN inbrc_opponents o ON o.opponent_id = g.opponent_id
					WHERE
						g.deleted = 0
						AND
						g.status = 1
						AND date_ut <= '${date_ut}'
					ORDER BY
						date_ut DESC
					LIMIT 10`
	const games = await doDBQueryBuffalorugby(sql)
	return games
}

async function getYear(year) {
	const YEAR2 = parseInt(year) + 1

	const sql = `SELECT
				game_id,
				game_id as id,
				o.opponent_name as title,
				referee,
				venue,
				comment,
				g.date,
				g.date as dt,
				g.date_ut,
				g.time,
				t.game_type,
				t.game_type_id,
				game_level,
				occasion,
				ptsFor,
				ptsAgn,
				g.Status,
				g.Status as status,
				g.deleted,
				g.deleted_dt,
				g.created_dt,
				g.modified_dt
			FROM
				inbrc_stats_game_types t,
				inbrc_stats_games g,
				LEFT JOIN inbrc_opponents o ON o.opponent_id = g.opponent_id
			WHERE
				g.deleted = 0
				AND g.Status = 1
				AND t.game_type_id = g.game_type_id
				AND ( YEAR(date) = ${year} OR YEAR(date) = ${YEAR2} )
			ORDER BY
				dt DESC`

	const games = await doDBQueryBuffalorugby(sql)
	return games
}

async function getSeason(year1) {
	const YEAR2 = parseInt(year1) + 1
	// Unix Epoch
	let sql = `SELECT
								game_id,
								game_id as id,
								o.opponent_name,
								g.opponent_id,
								o.opponent_name as title,
								referee,
								venue,
								comment,
								g.date_ut,
								g.date as date,
								g.date as dt,
								g.date,
								t.game_type,
								t.game_type_id,
								game_level,
								occasion,
								ptsFor,
								ptsAgn,
								g.Status,
								g.Status as status,
								g.deleted,
								g.deleted_dt,
								g.created_dt,
								g.modified_dt
							FROM
								inbrc_stats_game_types t,
								inbrc_stats_games g
								LEFT JOIN inbrc_opponents o ON o.opponent_id = g.opponent_id
							WHERE
								g.deleted = 0
								AND
								g.status = 1
								AND g.date_ut > 0
								AND t.game_type_id = g.game_type_id

								AND ( FROM_UNIXTIME(g.date_ut,'%Y') = ${year1} OR FROM_UNIXTIME(g.date_ut,'%Y') = ${YEAR2} )
								AND date_ut > UNIX_TIMESTAMP(CONCAT("${year1}","${CONFIG.SEASON_DIVIDE_DATE}")) AND  date_ut <= UNIX_TIMESTAMP(CONCAT("${YEAR2}","${CONFIG.SEASON_DIVIDE_DATE}"))
			
							ORDER BY
								g.date_ut DESC`
	const games1 = await doDBQueryBuffalorugby(sql)

	// Negative Unix Epoch Special case
	sql = `SELECT
						game_id,
						game_id as id,
						o.opponent_name,
						g.opponent_id,
						o.opponent_name as title,
						referee,
						venue,
						comment,
						g.date_ut,
						g.date as date,
						g.date as dt,
						g.date,
						t.game_type,
						t.game_type_id,
						game_level,
						occasion,
						ptsFor,
						ptsAgn,
						g.Status,
						g.Status as status,
						g.deleted,
						g.deleted_dt,
						g.created_dt,
						g.modified_dt
					FROM
						inbrc_stats_game_types t,
						inbrc_stats_games g
						LEFT JOIN inbrc_opponents o ON o.opponent_id = g.opponent_id
					WHERE
						g.deleted = 0
						AND
						g.status = 1
						AND g.date_ut < 0
						AND t.game_type_id = g.game_type_id

					AND
					( YEAR(
						DATE_ADD(
								DATE_ADD(
										FROM_UNIXTIME(0),
										INTERVAL g.date_ut SECOND
								),
								INTERVAL 9 HOUR
						)
						) = ${year1}  
						OR 
						YEAR(
								DATE_ADD(
										DATE_ADD(
												FROM_UNIXTIME(0),
												INTERVAL g.date_ut SECOND
										),
										INTERVAL 9 HOUR
								)
						) = ${YEAR2}
					) 
							AND DATE_ADD(
									DATE_ADD(
											FROM_UNIXTIME(0),
											INTERVAL g.date_ut SECOND
									),
									INTERVAL 9 HOUR
							) > '${year1 + CONFIG.SEASON_DIVIDE_DATE}' 
								AND DATE_ADD(
									DATE_ADD(
											FROM_UNIXTIME(0),
											INTERVAL g.date_ut SECOND
									),
									INTERVAL 9 HOUR
							) < '${YEAR2 + CONFIG.SEASON_DIVIDE_DATE}'

					ORDER BY
							g.date_ut ASC`
	// console.log('sql= ', sql)
	const games2 = await doDBQueryBuffalorugby(sql)

	// console.log('games1 ', games1.length)
	// console.log(' games2 ', games2.length)
	const games = games1.concat(games2)
	// console.log(' games ', games.length)

	return games
}

async function getGameTypes() {
	const sql = `SELECT
				game_type,
				game_type_id
			FROM
				inbrc_stats_game_types
			WHERE 1`

	const gametypes = await doDBQueryBuffalorugby(sql)
	return gametypes
}

// unix time
async function getOne(id) {
	const sql = `SELECT
									g.game_id,
									g.opponent_id,
									o.opponent_name,
									g.referee,
									g.venue,
									g.comment,
									g.date,
									g.date_ut,
									g.game_type_id,
									t.game_type,
									g.game_level,
									g.occasion,
									g.ptsFor,
									g.ptsAgn,
									g.status,
									g.created_dt,
									g.modified_dt
								FROM
									inbrc_stats_game_types t,
									inbrc_stats_games g
									LEFT JOIN inbrc_opponents o ON o.opponent_id = g.opponent_id
								WHERE
									g.game_id = ${id}
									AND g.game_type_id = t.game_type_id`

	const games = await doDBQueryBuffalorugby(sql)
	return games[0]
}

/* get adjacent games */
async function getAdjacent(direction) {
	let FILTER = ''
	let FILTER2 = ''

	if (direction === 'Next') {
		FILTER = '>='
		FILTER2 = 'ASC'
	} else {
		FILTER = '<='
		FILTER2 = 'DESC'
	}

	const sql = `SELECT
					o.opponent_name,
					referee,
					venue,
					g.date_ut,
					t.game_type,
					game_level,
					ptsFor,
					ptsAgn
				FROM
					inbrc_stats_game_types t,
					inbrc_stats_games g
					LEFT JOIN inbrc_opponents o ON o.opponent_id = g.opponent_id
				WHERE
					t.game_type_id = g.game_type_id
					AND date_ut ${FILTER} UNIX_TIMESTAMP()
					AND g.Status = 1
					AND g.deleted = 0
				ORDER BY
					date_ut ${FILTER2}
				LIMIT 2`
	const stats = await doDBQueryBuffalorugby(sql)
	return stats
}

// Needs work
async function getRosterStats() {
	const sql = `SELECT
								IF(
									MONTH(g.date) > 7 AND MONTH(date) <= 12,
									YEAR(g.date),
									YEAR(g.date) - 1
								) AS yr,
								COUNT(g.game_id) AS ct_games,
								SUM(IF(p.registered >= 15, 1, 0)) AS ct_atleastfifteen,
								SUM(
										IF(
												p.registered > 0 AND p.registered < 15,
												1,
												0
										)
								) AS ct_partial,
								SUM(IF(p.registered = 0, 1, 0)) AS ct_none
							FROM
								inbrc_stats_games g
							INNER JOIN(
								SELECT
										game_id,
										SUM(IF(player_id > 0, 1, 0)) AS registered
								FROM
									inbrc_stats_player
								GROUP BY
										game_id
							) p
							ON
								p.game_id = g.game_id
							WHERE
								g.game_type_id <> 7 AND g.deleted = 0 AND g.status = 1
							GROUP BY
								yr
							ORDER BY
								yr
							DESC`

	const roster_count = await doDBQueryBuffalorugby(sql)
	return roster_count
}

async function getPlayers(id) {
	const sql = `SELECT
								position_id,
								player_id,
								a1.member_firstname pfn,
								a1.member_lastname pln,
								CONCAT(a1.member_lastname,", ",a1.member_firstname) as pname,
								a2.member_firstname rfn,
								a2.member_lastname rln,
								CONCAT(a2.member_lastname,", ",a2.member_firstname) as rname,
								tries,
								assists,
								conv,
								penk,
								dgoal,
								yellow,
								red,
								replaced_by
							FROM inbrc_stats_player p
								left join inbrc_accounts a1 on a1.account_id = p.player_id
								left join inbrc_accounts a2 on a2.account_id = p.replaced_by
							WHERE
								p.deleted=0
								AND p.game_id=${id}
							ORDER BY
								position_id asc`

	const players = await doDBQueryBuffalorugby(sql)
	return players
}

async function getGameCount(gametype, account_id) {
	let FILTER = ''
	if (gametype == '7') {
		FILTER = ' = 7'
	} else {
		FILTER = ' <> 7'
	}

	const sql = `SELECT
    CONCAT(
        a.member_firstname,
        ' ',
        a.member_lastname
    ) AS NAME,
    COUNT(p.player_id) AS gamecount
FROM
    inbrc_stats_player p,
    inbrc_accounts a,
    inbrc_stats_games g
WHERE
    (p.player_id = a.account_id) 
    AND(p.game_id = g.game_id) 
    AND(g.game_type_id ${FILTER} ) 
    AND(g.game_type_id <> 8) 
    AND(a.account_id = ${account_id})
		AND g.Status = 1
		AND g.deleted = 0`

	const stats = await doDBQueryBuffalorugby(sql)
	return stats[0].gamecount
}

async function getPlayerStats(id) {
	let FILTER = ''
	if (id == '7') {
		FILTER = ' = 7'
	} else {
		FILTER = ' <> 7'
	}

	const sql = `SELECT
								a.member_year AS year,
								m.member_type,
								IF(a.member_type_id = '2', TRUE, FALSE) AS isactive,
								CONCAT(a.member_firstname,' ',a.member_lastname) AS name,
								COUNT(p.player_id) AS games,
								SUM(p.tries) AS tries,
								MAX(p.tries) AS maxtries,
								SUM(p.conv) AS conv,
								MAX(p.conv) AS maxconv,
								SUM(p.penk) AS pk,
								MAX(p.penk) AS maxpk,
								SUM(p.dgoal) AS dg,
								MAX(p.dgoal) AS maxdg,
								SUM(p.yellow) AS yellow,
								SUM(p.red) AS red,
								SUM(p.tries) * 5 + SUM(p.conv) * 2 + SUM(p.penk) * 3 + SUM(p.dgoal) * 3 AS pts,
								SUM(p.tries) / COUNT(p.player_id) AS tpg
							FROM
								inbrc_stats_player p,
								inbrc_accounts a,
								inbrc_member_types m,
								inbrc_stats_games g
							WHERE
								(p.player_id = a.account_id)
								AND (a.member_type_id = m.member_type_id)
								AND (a.member_type_id IN(2,3,6,8,10))
								AND (p.game_id = g.game_id)
								AND (g.game_type_id ${FILTER})
								AND (g.game_type_id <> 8)
								AND g.Status = 1
								AND g.deleted = 0
							GROUP BY
								p.player_id
							ORDER BY
								games desc`

	const stats = await doDBQueryBuffalorugby(sql)
	return stats
}

async function getTeamStats(gt) {
	let FILTER = ''
	if (gt === '7') {
		FILTER = 'AND game_type_id = 7'
	} else if (gt === '0') {
		// all 15s
		FILTER = 'AND game_type_id <> 7'
	}
	// do not include scrimmages game_type-id 8

	const sql = `SELECT
								COUNT(game_id) as game_count,
								IF(
									MONTH(date) > 7 AND MONTH(date) <= 12,
									CONCAT(YEAR(date),
									' Fall'),
									CONCAT(
											YEAR(date),
											' Spring'
									)
								) AS season,
								IF(
										MONTH(date) > 7 AND MONTH(date) <= 12,
										YEAR(date),
										YEAR(date) - 1
								) AS year,
								IF( MONTH(date) > 7 AND MONTH(date) <= 12, 'Fall', 'Spring') as half,
								SUM(IF(ptsFor > ptsAgn,1,0)) as wins,
								SUM(IF(ptsFor < ptsAgn,1,0)) as losses,
								SUM(IF(ptsFor = ptsAgn AND ptsFor != 0,1,0)) as ties,
								SUM(IF((ptsFor = 0) AND (ptsAgn = 0),1,0)) as unknown
							FROM
								inbrc_stats_games
							WHERE
								game_type_id <> 8
								${FILTER}
								AND Status = 1
								AND deleted = 0
							GROUP BY
								season
							ORDER BY
								season ASC`

	const stats = await doDBQueryBuffalorugby(sql)
	return stats
}

async function getTeamStatsTotal(gt) {
	let FILTER = ''
	if (gt === '7') {
		FILTER = 'AND game_type_id = 7'
	} else if (gt === '0') {
		FILTER = 'AND game_type_id <> 7'
	}

	const sql = `SELECT
								COUNT(game_id) as game_count,
								SUM(IF(ptsFor>ptsAgn,1,0)) as wins,
								SUM(IF(ptsFor<ptsAgn,1,0)) as losses,
								SUM(IF(ptsFor=ptsAgn AND ptsFor != 0 ,1,0)) as ties,
								SUM(IF((ptsFor=0) AND (ptsAgn=0),1,0)) as unknown
							FROM
								inbrc_stats_games
							WHERE
								game_type_id <> 8
								${FILTER}
								AND Status = 1
								AND deleted = 0`

	const stats = await doDBQueryBuffalorugby(sql)
	return stats[0]
}

async function getPlayerGames(id) {
	const sql = `SELECT
					a.member_lastname,
					a.member_firstname,
					o.opponent_name,
					g.game_type_id,
					t.game_type,
					g.game_level,
					g.occasion,
					g.venue,
					g.date_ut,
					g.date,
					g.ptsFor,
					g.ptsAgn,
					p.tries,
					p.assists,
					p.conv,
					p.penk,
					p.dgoal,
					p.yellow,
					p.red,
					g.game_id
				FROM
				 inbrc_stats_player p,
				 inbrc_accounts a,
				 inbrc_stats_game_types t,
					inbrc_stats_games g
					LEFT JOIN inbrc_opponents o ON o.opponent_id = g.opponent_id
				WHERE
					p.player_id = ${id}
					AND
					p.game_id = g.game_id
					AND
					p.player_id = a.account_id
					AND
					g.game_type_id = t.game_type_id
					AND g.Status = 1
					AND g.deleted = 0
				ORDER BY
					g.date_ut DESC`

	const stats = await doDBQueryBuffalorugby(sql)
	return stats
}

async function addOne({
	opponent_id,
	referee,
	venue,
	comment,
	date,
	date_ut,
	game_type_id,
	game_level,
	occasion,
	ptsFor,
	ptsAgn,
	players,
}) {
	const conn = await getConnectionBuffalorugby()

	try {
		await conn.query('START TRANSACTION')

		let sql = `INSERT INTO inbrc_stats_games 
								SET
								opponent_id = ?,
								referee = ?,
								venue = ?,
								comment = ?,
								date = ?,
								date_ut = ?,
								game_type_id = ?,
								game_level = ?,
								occasion = ?,
								ptsFor = ?,
								ptsAgn = ?,
								status = 1,
								deleted = 0,
								created_dt = NOW(),
								modified_dt = NOW()`
		let inserts = []
		inserts.push(
			opponent_id,
			referee,
			venue,
			comment,
			date,
			date_ut,
			game_type_id,
			game_level,
			occasion,
			ptsFor,
			ptsAgn
		)
		sql = mysql.format(sql, inserts)
		const [rows] = await conn.execute(sql)
		const game_id = rows.insertId

		// add records for 23 players
		for (let i = 0; i < 23; i++) {
			sql = `INSERT INTO inbrc_stats_player SET
									game_id = ${game_id},
									position_id = ?,
									player_id = ?,
									replaced_by = ?,
									tries = ?,
									assists = ?,
									conv = ?,
									penk = ?,
									dgoal = ?,
									yellow = ?,
									red = ?,
									Status = 1,
									deleted = 0,
									modified_dt = NOW(),
									created_dt = NOW()`
			inserts = []
			inserts.push(
				players[i].position_id,
				players[i].player_id,
				players[i].replaced_by,
				players[i].tries,
				players[i].assists,
				players[i].conv,
				players[i].penk,
				players[i].dgoal,
				players[i].yellow,
				players[i].red
			)
			sql = mysql.format(sql, inserts)

			await conn.execute(sql)
		}

		await conn.query('COMMIT')
		await conn.end()
		return `commit game_id = ${game_id}`
	} catch (e) {
		await conn.query('ROLLBACK')
		await conn.end()
		return 'rollback' + e
	}
}

async function editOne({
	game_id,
	opponent_id,
	referee,
	venue,
	date,
	date_ut,
	game_type_id,
	game_level,
	comment,
	occasion,
	ptsFor,
	ptsAgn,
	players,
}) {
	const conn = await getConnectionBuffalorugby()
	try {
		await conn.query('START TRANSACTION')

		let sql = `UPDATE inbrc_stats_games SET
								opponent_id = ?,
								referee = ?,
								venue = ?,
								comment = ?,
								date=?,
								date_ut = ?,
								game_type_id = ?,
								game_level = ?,
								occasion = ?,
								ptsFor = ?,
								ptsAgn = ?,
								modified_dt= NOW()
							WHERE
								game_id = ?`

		let inserts = []
		inserts.push(
			opponent_id,
			referee,
			venue,
			comment,
			date,
			date_ut,
			game_type_id,
			game_level,
			occasion,
			ptsFor,
			ptsAgn,
			game_id
		)
		sql = mysql.format(sql, inserts)
		await conn.execute(sql)

		// update records for 23 players
		for (let i = 0; i < 23; i++) {
			sql = `UPDATE inbrc_stats_player SET
					
					player_id = ?,
					replaced_by = ?,
					tries = ?,
					assists = ?,
					conv = ?,
					penk = ?,
					dgoal = ?,
					yellow = ?,
					red = ?,
					modified_dt = NOW()
				WHERE
					game_id = ? && position_id = ?`

			inserts = []
			inserts.push(
				players[i].player_id,
				players[i].replaced_by,
				players[i].tries,
				players[i].assists,
				players[i].conv,
				players[i].penk,
				players[i].dgoal,
				players[i].yellow,
				players[i].red,
				game_id,
				players[i].position_id
			)

			sql = mysql.format(sql, inserts)
			await conn.execute(sql)
		}
		await conn.query('COMMIT')
		await conn.end()
		return `commit game_id = ${game_id}`
	} catch (e) {
		await conn.query('ROLLBACK')
		await conn.end()
		return 'ROLLBACK' + e
	}
}

async function deleteOne(id) {
	const conn = await getConnectionBuffalorugby()

	try {
		await conn.query('START TRANSACTION')

		let sql = `UPDATE inbrc_stats_games SET deleted = 1, deleted_dt = NOW() WHERE game_id = ${id}`
		await conn.execute(sql)

		sql = `UPDATE inbrc_stats_player SET deleted = 1, deleted_dt = NOW() WHERE game_id = ${id}`
		await conn.execute(sql)

		await conn.query('COMMIT')
		await conn.end()
		return 'COMMIT'
	} catch (e) {
		await conn.query('ROLLBACK')
		await conn.end()
		return 'ROLLBACK' + e
	}
}

async function changeStatus({ id, status }) {
	const sql =
		`UPDATE inbrc_stats_games SET status = "` +
		status +
		`" WHERE game_id = ${id}`
	const players = await doDBQueryBuffalorugby(sql)

	return players
}

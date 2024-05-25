import * as SQLite from 'expo-sqlite';
const db = SQLite && SQLite.openDatabase("sessions.db")
/**
 * Sets up the database by creating a table called "sessions" with a single column
 * called "tokenId" of type TEXT and PRIMARY KEY constraint. If the table already
 * exists, it does nothing.
 *
 * @return {Promise<object>} A promise that resolves with the result of the SQL
 * query execution, or rejects with an error if there was an issue executing the
 * query.
 */
const setupDatabase = async () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS sessions (tokenId TEXT PRIMARY KEY)',
                [],
                (_, result) => resolve(result),
                (_, error) => reject(error)
            )
        })
    })
    return promise
};

/**
 * Inserts a new session with the provided tokenId into the sessions table.
 *
 * @param {string} tokenId - The tokenId to be inserted into the sessions table.
 * @return {Promise} A promise that resolves with the result of the transaction or rejects with an error.
 */
const insertSession = (tokenId) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO sessions (tokenId) VALUES (?)',
                [String(tokenId)],
                (_, result) => resolve(result), //Resolve trasaction
                (_, error) => reject(error) //
            );
        });
    })
    return promise

};

/**
 * Retrieves all sessions from the database.
 *
 * @return {Promise<object>} A promise that resolves with the result of the transaction or rejects with an error.
 */
const getSessions = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            //Define SQL statement. BEWARE of PARENTHESIS
            tx.executeSql(
                'SELECT * from sessions',
                [], //Parameters
                (_, result) => resolve(result), //Resolve trasaction
                (_, error) => reject(error) //Transaction error
            )
        })
    })
    return promise
};


/**
 * Deletes all sessions from the database.
 *
 * @return {Promise<object>} A promise that resolves with the result of the transaction or rejects with an error.
 */
const deleteSession = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "DELETE FROM sessions",
                [],
                (_, result) => resolve(result), //Resolve trasaction
                (_, error) => reject(error) //Transaction error
            )
        })
    })
    return promise
};

export { deleteSession, getSessions, insertSession, setupDatabase };


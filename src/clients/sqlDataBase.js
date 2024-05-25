import * as SQLite from 'expo-sqlite';
const db = SQLite && SQLite.openDatabase("sessions.db")
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

// Insert a new session with provided tokenId
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

// Get all sessions
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


// Truncate the sessions table
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

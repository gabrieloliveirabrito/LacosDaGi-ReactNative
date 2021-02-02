import { createConnection, Connection } from 'typeorm/browser';
import { Client, Tie, TieCategory, SaleTie, Sale } from "./models"

export default class Database {
    private static connection: Connection

    open = async () => {
        if (Database.connection) {
            if (!Database.connection.isConnected)
                Database.connection = await Database.connection.connect()
        } else {
            Database.connection = await createConnection({
                type: 'expo',
                database: 'test',
                logging: ['error', 'query', 'schema'],
                synchronize: true,
                entities: [Client],
                driver: require('expo-sqlite')
            });
        }
        return Database.connection
    }

    close = async () => {
        await Database.connection.close()
    }
}

export async function getDatabase(): Promise<Database> {
    let db = new Database()
    let conn = await db.open()

    let count = await conn.getRepository(Client).count()
    console.log(count)

    return db
}
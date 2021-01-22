import { createConnection, Connection } from 'typeorm/browser';
import { Client, Tie, TieCategory, SaleTie, Sale } from "./models"

export default class Database {
    private connection: Connection

    open = async () => {
        this.connection = await createConnection({
            type: 'react-native',
            database: 'test',
            location: 'default',
            logging: ['error', 'query', 'schema'],
            synchronize: true,
            entities: [Client, Tie, TieCategory, SaleTie, Sale],
        });

        return this.connection
    }

    close = async () => {
        if (this.connection)
            await this.connection.close()
    }
}

export async function getDatabase(): Promise<Database> {
    var connection = new Database()
    await connection.open()

    return connection
}
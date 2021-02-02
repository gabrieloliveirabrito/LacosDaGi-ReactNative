import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm/browser';


@Entity('client')
export default class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;
}
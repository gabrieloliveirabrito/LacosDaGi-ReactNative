import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
} from 'typeorm/browser';

import Tie from "./Tie"

@Entity('tieCategory')
export default class Author {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
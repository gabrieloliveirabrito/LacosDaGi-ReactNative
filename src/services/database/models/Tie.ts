import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    OneToMany,
    ManyToMany,
    JoinTable,
    ManyToOne,
    JoinColumn
} from 'typeorm/browser';

import TieCategory from "./TieCategory"

@Entity('tie')
export default class Tie {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToOne(_ => TieCategory)
    @JoinColumn()
    category: TieCategory

    @Column({ type: "blob" })
    image: Buffer;
}
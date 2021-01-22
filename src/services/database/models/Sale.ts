import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    OneToOne,
    ManyToOne,
    ManyToMany,
    JoinTable,
    JoinColumn
} from 'typeorm/browser';

import Client from "./Client"
import SaleTie from "./SaleTie"

@Entity('sale')
export default class Sale {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    description: string;

    @Column({ type: "decimal" })
    totalPrice: number;

    @ManyToOne(_ => Client)
    @JoinColumn()
    client: Client;

    @OneToMany(_ => SaleTie, (saleTie: SaleTie) => saleTie.sale)
    items: SaleTie[]
}
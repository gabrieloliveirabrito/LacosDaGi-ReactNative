import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm/browser';

import Sale from "./Sale"
import Tie from "./Tie"

@Entity('saleTie')
export default class SaleTie {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(_ => Sale)
  @JoinColumn()
  sale: Sale;

  @ManyToOne(_ => Tie)
  @JoinColumn()
  tie: Tie;
}
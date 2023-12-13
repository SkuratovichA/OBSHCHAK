import 'reflect-metadata'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  ManyToOne,
  CreateDateColumn,
  AfterInsert,
} from 'typeorm'
import {
  DebtGroupStatusType,
  DebtStatusType,
  ParticipationRoleType,
  ParticipationStatusType,
  PaymentMethodType,
  PaymentStatusType,
} from 'app-common'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId!: string

  @Column()
  name!: string

  @Column({ nullable: false })
  googleId!: string

  @Column()
  email!: string
}

@Entity()
export class Debt {
  @PrimaryGeneratedColumn('uuid')
  debtId!: string

  @Column()
  name!: string

  @Column()
  description!: string

  @Column('decimal')
  totalAmount!: number

  @ManyToOne(() => User)
  creatorUser!: User

  @Column({
    type: 'enum',
    enum: DebtStatusType,
    default: DebtStatusType.PENDING,
  })
  status!: DebtStatusType

  @CreateDateColumn()
  createdTimestamp!: Date

  @UpdateDateColumn({ nullable: true })
  resolvedTimestamp!: Date | null

  @AfterInsert()
  setResolvedTimestampBasedOnStatus() {
    switch (this.status) {
      case DebtStatusType.PENDING:
        this.resolvedTimestamp = null
        break
      case DebtStatusType.RESOLVED:
        this.resolvedTimestamp = this.resolvedTimestamp ?? new Date()
        break
    }
  }
}

@Entity()
export class DebtParticipation {
  @PrimaryGeneratedColumn('uuid')
  debtParticipationId!: string

  @ManyToOne(() => Debt)
  debt!: Debt

  @ManyToOne(() => User)
  user!: User

  @Column({
    type: 'enum',
    enum: ParticipationRoleType,
  })
  role!: ParticipationRoleType

  @Column('decimal')
  amount!: number

  @Column({
    type: 'enum',
    enum: ParticipationStatusType,
  })
  status!: ParticipationStatusType

  @CreateDateColumn()
  createdTimestamp!: Date

  @UpdateDateColumn()
  updatedTimestamp!: Date
}

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  paymentId!: string

  @ManyToOne(() => DebtParticipation)
  debtParticipation!: DebtParticipation

  @Column('decimal')
  amount!: number

  @Column({
    type: 'enum',
    enum: PaymentMethodType,
  })
  method!: PaymentMethodType

  @Column({
    type: 'enum',
    enum: PaymentStatusType,
  })
  status!: PaymentStatusType

  @CreateDateColumn()
  timestamp!: Date
}

@Entity()
export class DebtGroup {
  @PrimaryGeneratedColumn('uuid')
  debtGroupId!: string

  @Column()
  name!: string

  @Column()
  description!: string

  @Column('decimal')
  totalAmount!: number

  @ManyToOne(() => User)
  creatorUser!: User

  @Column({
    type: 'enum',
    enum: DebtGroupStatusType,
    default: DebtGroupStatusType.ACTIVE,
  })
  status!: DebtGroupStatusType

  @CreateDateColumn()
  createdTimestamp!: Date

  @UpdateDateColumn()
  resolvedTimestamp!: Date | null
}

@Entity()
export class DebtGroupParticipation {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @ManyToOne(() => DebtGroup, (debtGroup) => debtGroup.debtGroupId)
  debtGroup!: DebtGroup

  @ManyToOne(() => User, (user) => user.userId)
  user!: User

  @Column({
    type: 'enum',
    enum: ParticipationRoleType,
  })
  role!: ParticipationRoleType

  @Column('decimal')
  amount!: number
}

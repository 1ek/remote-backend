import { Column, DataType, Model, Table } from "sequelize-typescript";

interface DeviceCreationAttrs {
    name: string;
    token: string;
    host: string;
    port: number;
}

@Table({tableName: 'devices', timestamps: false, createdAt: false, updatedAt: false})
export class Device extends Model<Device, DeviceCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @Column({type: DataType.STRING, allowNull: false})
    token: string;

    @Column({type: DataType.STRING, allowNull: false})
    host: string;

    @Column({type: DataType.SMALLINT, allowNull: false})
    port: number;

    @Column({type: DataType.TEXT, allowNull: true})
    interface: string;

    @Column({type: DataType.BOOLEAN, defaultValue: false, allowNull: true})
    active: boolean;

}
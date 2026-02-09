import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";

//  Definición de los atributos de la tabla "alertas"
interface AlertaAttributes {
  id_alerta: number;
  id_usuario: number;
  id_estado: number;
  titulo: string;
  descripcion: string;
  ubicacion?: string;
  prioridad?: string;
  categoria?: string; 
  createdat?: Date;
  updatedat?: Date;
  deletedat?: Date;
}

//  Al crear una alerta, estos campos son opcionales porque se generan automáticamente
type AlertaCreationAttributes = Optional<
  AlertaAttributes,
  "id_alerta" | "prioridad" | "categoria" | "createdat" | "updatedat" | "deletedat"
>;

//  Clase del modelo que representa una alerta
class Alerta
  extends Model<AlertaAttributes, AlertaCreationAttributes>
  implements AlertaAttributes
{
  public id_alerta!: number;
  public id_usuario!: number;
  public id_estado!: number;
  public titulo!: string;
  public descripcion!: string;
  public ubicacion?: string;
  public prioridad?: string;
  public categoria?: string; 
  public readonly createdat!: Date;
  public readonly updatedat!: Date;
  public readonly deletedat!: Date;
}

//  Definición del modelo Sequelize
Alerta.init(
  {
    id_alerta: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "id_alerta",
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "id_usuario",
    },
    id_estado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "id_estado",
      references: {
        model: "estados",
        key: "id_estado",
      },
    },
    titulo: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ubicacion: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    prioridad: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    categoria: {
      type: DataTypes.STRING(100), 
      allowNull: false, // o false si la hiciste obligatoria en la BD
    },
  },
  {
    sequelize,
    tableName: "alertas",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    paranoid: true, // habilita borrado lógico
  }
);

export default Alerta;

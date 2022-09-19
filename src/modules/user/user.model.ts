import { getModelForClass, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export class User extends TimeStamps {
  @prop({ required: true, unique: true })
  public username: string;

  @prop({ required: true, unique: true })
  public email: string;

  @prop()
  public password: string;

  @prop({ required: true })
  public country: string;

  @prop({ required: true })
  public city: string;

  @prop()
  public img: string;

  @prop()
  public phone: string;

  @prop({ default: false })
  public isAdmin: boolean;
}

export const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true },
});

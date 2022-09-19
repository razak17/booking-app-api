import { getModelForClass, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export class User extends TimeStamps {
  @prop({ required: true})
  public title: string;

  @prop({ required: true})
  public desc: string;

  @prop({ required: true})
  public price: number;

  @prop({ required: true})
  public maxPeople: number;

  @prop({ required: true})
  public roomNumbers: {number: number, unavailableDates: {type: Date[]}}[];
}

export const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true },
});


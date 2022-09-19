import { getModelForClass, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export class Hotel extends TimeStamps {
  @prop({ required: true })
  public name: string;

  @prop({ required: true })
  public type: string;

  @prop({ required: true })
  public city: string;

  @prop({ required: true })
  public address: string;

  @prop({ required: true })
  public distance: string;

  @prop()
  public photos: string[];

  @prop({ required: true })
  public title: string;

  @prop({ required: true })
  public desc: string;

  @prop({ required: true })
  public rating: number;

  @prop()
  public rooms: string[];

  @prop()
  public cheapestPrice: number;

  @prop({ default: false })
  public featured: boolean;
}

export const HotelModel = getModelForClass(Hotel, {
  schemaOptions: { timestamps: true },
});

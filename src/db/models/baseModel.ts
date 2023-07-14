import { Schema, Model, model }  from "mongoose";
 
export class BaseModel<T> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private model: Model<any>;
    constructor(modelName: string, schema: Schema<T>) {
        this.model = model(modelName, schema);
    }
    async create(entity: T): Promise<void> {
        await this.model.create(entity);
    }
    async findOne(filter = {}): Promise<T | null> {
        return await this.model.findOne(filter, { _id: 0, __v: 0 }).lean();
    }
    async updateOne(filter = {}, dataToUpdate = {}): Promise<void> {
        await this.model.updateOne(filter, { $set: dataToUpdate });
    }
}
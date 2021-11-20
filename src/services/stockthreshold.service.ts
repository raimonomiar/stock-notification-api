import { IStockThreshold } from "src/shared/interfaces";
import { StockThreshold } from "../models";

export class StockThresholdService {

    async add(stockThreshold: IStockThreshold) {
        const existingStockThreshold = await StockThreshold.findOne({
            attributes: ['stockthresholdid'],
            where: {
                deletedat: null,
                useremailid: stockThreshold.useremailid,
                symbol: stockThreshold.symbol
            }
        });

        if (existingStockThreshold === null) {
            return await StockThreshold.create(stockThreshold);
        } else {
            return await StockThreshold.update(stockThreshold, {
                where: {
                    deletedat: null,
                    stockthresholdid: existingStockThreshold.getDataValue('stockthresholdid')
                }
            });
        }
    }

    async delete(stockThreshold: IStockThreshold) {
        const existingStockThreshold = await StockThreshold.findOne({
            attributes: ['stockthresholdid'],
            where: {
                deletedat: null,
                useremailid: stockThreshold.useremailid,
                symbol: stockThreshold.symbol
            }
        });

        if (existingStockThreshold === null) {
            return null;
        } else {
            return await StockThreshold.update({
                ...stockThreshold,
                deletedat: Date.now()
            }, {
                where: {
                    stockthresholdid: existingStockThreshold.getDataValue('stockthresholdid')
                }
            });
        }
    }

}
import { insertMoneyData } from "./insertMoneyData";

export const withdrawMoneyData = async () => {
    await insertMoneyData('expense');
};

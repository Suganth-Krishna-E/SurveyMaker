import { getAllMarksFromMap } from "./simplestorethreediv-script.js";

export default class DataStore {
    createNewDataStoreVariable(dataValue) {
        const dataStore = {
            'value': dataValue,
            'subscribers': [],
        }
        
        return dataStore;
    }
    
    setData(dataStore, data) {
        dataStore.value = Number(data);
        dataStore[`subscribers`].forEach((updateFunction) => {
            updateFunction(getAllMarksFromMap());
        });
    }
    
    getCallbackFunction(dataStore) {
        const stringCallback = this.getStringCallbackFromArrayOfFunctions(dataStore[`subscribers`])
        return stringCallback;
    }
    
    getStringCallbackFromArrayOfFunctions(arrayOfFunctions) {
        const endIndex = arrayOfFunctions.length;
        let index = 0;
        let stringResult = `function(data) { ${this.getAllFunctionAdded(arrayOfFunctions, index, endIndex)} };`
        return stringResult;
    }
    
    getAllFunctionAdded(arrOfFunctions, index, endIndex) {
        if(index === endIndex) {
            return;
        }
        else {
            return `${arrOfFunctions[index].name}(data, function() { ${this.getAllFunctionAdded(arrOfFunctions, index + 1, endIndex)} })`;
        }
    }
    
    subscribeToDataStore(datas, subscriber) {
        for(const dataStore of datas) {
            if(!dataStore.subscribers || !dataStore.subscribers.includes(subscriber)) {
                dataStore.subscribers.push(subscriber);               
            }
        }
    }

    unSubscribeToDataStore(datas, subscriber) {
        for(const dataStore of datas) {
            if(dataStore.subscribers && dataStore.subscribers.includes(subscriber)) {
                dataStore.subscribers.pop(subscriber);               
            }
        }
    }
}
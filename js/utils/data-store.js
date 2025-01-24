import { getAllMarksFromMap } from "./simplestorethreediv-script.js";

export default class DataStore {
    createNewDataStoreVariable(dataValue) {
        // console.log(`New dataStore creation called ${dataValue} created store`);
        const dataStore = {
            'value': dataValue,
            'subscribers': [],
        }
        
        return dataStore;
    }
    
    setData(dataStore, data) {
        console.log(dataStore);
        dataStore.value = Number(data);
        dataStore[`subscribers`].forEach((updateFunction) => {
            updateFunction(getAllMarksFromMap());
            console.log(`Call to ${updateFunction}`);
        });
        console.log(dataStore);

    
        // let stringCallback = 
        // `function(data) {
        //     updateAverageMark(data, function() {
        //         updateCutoffMark(data, function() {
        //             updateTotalMark(data, function() {
        //                 simpleDisplayAllMarks(data);
        //             })
        //         }) 
        //     })      
        // }`;
        // dataStore[`${subject}-callback`];
        // return this.getCallbackFunction(dataStore);
        
    }
    
    getCallbackFunction(dataStore) {
        const stringCallback = this.getStringCallbackFromArrayOfFunctions(dataStore[`subscribers`])
        const updateFunctionWhole = new Function(`return ${stringCallback}`)();
        console.log(updateFunctionWhole);
        // return updateFunctionWhole;
        return stringCallback;
    }
    
    getStringCallbackFromArrayOfFunctions(arrayOfFunctions) {
        const endIndex = arrayOfFunctions.length;
        let index = 0;
        let stringResult = `function(data) { ${this.getAllFunctionAdded(arrayOfFunctions, index, endIndex)} };`
        console.log(this.getAllFunctionAdded(arrayOfFunctions, index, endIndex));
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
        // console.log(`Unsubscribe functions called ${datas} ${subscriber}`);
        for(const dataStore of datas) {
            if(dataStore.subscribers && dataStore.subscribers.includes(subscriber)) {
                dataStore.subscribers.pop(subscriber);               
            }
        }
    }
}
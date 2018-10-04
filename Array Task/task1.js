'use strict'

const cars = require('./data/cars') // IMMUTABLE. DON'T CHANGE cars
const customers = require('./data/customers') // IMMUTABLE. DON'T CHANGE customers
const dealerships = require('./data/dealerships') // IMMUTABLE. DON'T CHANGE dealerships
const orders = require('./data/orders') // IMMUTABLE. DON'T CHANGE orders
let task3Array;

////////////////////////  First SubTask ///////////////////////////
const subtask1 = ()=>{
    const dealersArray = dealerships.reduce((finalArray, current ,inde) => {
        function uniqueValue(value,mas){                          ///// Seardhing for unique values method
            if(mas.length === 0){
                return true;
            }
            else if(mas.length > 0){
                for(let i=0;i< mas.length;i++) {
                    if (mas[i] === value) {
                        return false;
                    }
                }
            }
            return true;
        }

        function uniqueField(mas,value,prop){                          ///// Seardhing for unique values method
            let bool =true;
            if(mas.length === 0){
                return true;
            }
            else if(mas.length > 0){
                for(let i=0;i< mas.length && bool ===true ;i++) {
                    if (mas[i].displayName === value) {

                        bool =false;
                    }
                }
            }
            return bool;
        }
        const currentDealerCars = cars.reduce((carsArray,actual)=>{//// Returns all dealers makes if they exist

            if(current.dealershipId === actual.dealershipId && uniqueValue(actual.make,carsArray)===true){
                carsArray.push(actual.make);
            }
            return carsArray;

        },[]);

        const currentDealerCarsAndModels = currentDealerCars.reduce((dealerCarsArray,running,index)=>{/// [  ["Mazda",['6','Mazda 6']] , ["Audi",['A8','Audi A8 '],['A7','Audi A7 ']]  ]

            const currentDealerModels =cars.reduce((modelsArray,reccuring,ind)=>{
                if(current.dealershipId === reccuring.dealershipId && currentDealerCars[index] === reccuring.make &&  uniqueField(modelsArray,reccuring.displayName) === true){
                    const elem={
                        model : reccuring.model,
                        displayName : reccuring.displayName
                    };
                    modelsArray.push(elem);
                }
                return modelsArray;
            },[]);

            const element={
                make : currentDealerCars[index] ,
                models : currentDealerModels
            };
            dealerCarsArray.push(element);
            return dealerCarsArray;
        },[]);

        const obj = {
            dealershipId: current.dealershipId,
            name: current.name,
            state: current.state,
            cars: currentDealerCarsAndModels,
        }
        finalArray.push(obj);

        function showDealerInfo(){///////////////Нормализированый вывод информации про Диллера
            console.log(" New Dealer");
            console.log("DealershipId :"+current.dealershipId);
            console.log(" Name:"+current.name);
            console.log("State :"+current.state);
            console.log("Cars : " );
            for(let i=0;i<currentDealerCarsAndModels.length-1;i++)
                console.log(currentDealerCarsAndModels[i]);
            console.log("///////////////////////////////////////////////////////////////////////////////////");
        }
        // showDealerInfo();

        return finalArray;
    },[]);
    return dealersArray;
}

////////////////////////  Second SubTask ///////////////////////////
const subtask2 = ()=>{
    const dealersArray = dealerships.reduce((finalArray,current) => {


        const currentDealerCustomerId = cars.reduce((customersArray,actual)=>{
            if(current.dealershipId === actual.dealershipId){
                let flag = false;
                for(let i=0;i<orders.length && flag === false ;i++){
                    if(actual.id === orders[i].inventoryId){
						flag = true;
						customersArray.push(orders[i].customerId);
                    }
                }
            }
            return customersArray;
        },[]);
        //console.log(currentDealerCustomerId);

        const obj={
            dealershipId : current.dealershipId,
            name : current.name,
            state : current.state,
            sellingArea : {
                state : current.state,
                customersID : currentDealerCustomerId
            }
        };
         finalArray.push(obj);
		return finalArray;
    },[]);
    return dealersArray;
}

////////////////////////  Third SubTask ///////////////////////////
function arraySort(firstParam,secondParam,thirdParam){
	let params =arguments;
	return function(a,b){
		for(let i=0;i<params.length;i++){
			if(a[params[i]] < b[params[i]]){
				return -1;
			}
			if(a[params[i]] > b[params[i]]){
				return 1;
			}
			if(a[params[i]] === b[params[i]] && i === params.length){
				return 0;
			}
		}
	}
}

const subtask3 = ()=>{
    const dealersArray = dealerships.reduce((dealerArray,current) => {
        const currentDealerCars = cars.reduce((dealerCars,actual)=>{
            if(current.dealershipId === actual.dealershipId){
				dealerCars.push(actual);
            }
            return dealerCars;
        },[]);
		let currentDealerCarsIds;
		if(currentDealerCars === []){
			currentDealerCarsIds = [];
		}
		else{
			currentDealerCars.sort(arraySort("make","model","displayName"));
			currentDealerCarsIds = currentDealerCars.reduce((mas,running)=>{
				mas.push(running.id);
				return mas;
			},[]);
		}

        const obj={
            dealershipId: current.dealershipId,
            name: current.name,
            state: current.state,
            carIds: currentDealerCarsIds
        };
        dealerArray.push(obj);
        return dealerArray;
    },[]);
    return dealersArray;
}
////////////////////////  Forth SubTask ///////////////////////////

const subtask4 = (list) => {
	const sortList = list.sort(arraySort("state","carIds.length"));
    const dealersArray = list.reduce((array,current)=>{

		array.push(current);
		return array;
    },[]);
    return dealersArray;
}

////////////////////////  Fifth SubTask ///////////////////////////

const subtask5 = (minId, maxId, isReversed) => {
	const dealersArray = dealerships.reduce((dealerArray,current) => {
		function doTask(){
			const currentDealerCars = cars.reduce((dealerCars, actual) => {
				if (current.dealershipId === actual.dealershipId) {
					dealerCars.push(actual);
				}
				return dealerCars;
			}, []);
			let currentDealerCarsIds;
			if (currentDealerCars === []) {
				currentDealerCarsIds = [];
			}
			else {
				currentDealerCars.sort(arraySort("make", "model", "displayName"));
				currentDealerCarsIds = currentDealerCars.reduce((mas, running) => {
					mas.push(running.id);
					return mas;
				}, []);
			}

			const obj = {
				dealershipId: current.dealershipId,
				name: current.name,
				state: current.state,
				carIds: currentDealerCarsIds
			};
			dealerArray.push(obj);
		}

		if( isReversed === true && current.dealershipId > minId && current.dealershipId < maxId) {
			doTask();
		}
		else if(isReversed === false && !(current.dealershipId > minId && current.dealershipId < maxId)) {
			doTask();
		}

		return dealerArray;
	},[]);

	return dealersArray;
}

////////////////////////  Sixth SubTask ///////////////////////////

const subtask6 = (list, minCarsCount) => {
    const dealersArray = list.reduce((array,current)=>{
        if(current.carIds.length > minCarsCount){
			array.push(current);
        }
        return array;

    },[]);
    return dealersArray;
}

console.time('subtask #1')
 const result1 = subtask1()
 console.timeEnd('subtask #1')
// //console.log('subtask #1 result: ', JSON.stringify(result1[24], null, 2), JSON.stringify(result1[result1.length - 24], null, 2))
//
 console.time('subtask #2')
 const result2 = subtask2()
 console.timeEnd('subtask #2')
// //console.log('subtask #2 result: ', JSON.stringify(result2[0], null, 2), JSON.stringify(result2[result2.length - 1], null, 2))

console.time('subtask #3')
const result3 = subtask3();
console.timeEnd('subtask #3')
//console.log('subtask #3 result: ', JSON.stringify(result3[0], null, 2), JSON.stringify(result3[result3.length - 1], null, 2))

console.time('subtask #4')
const result4 = subtask4(result3);
console.timeEnd('subtask #4')
//console.log('subtask #4 result: ', JSON.stringify(result4[0], null, 2), JSON.stringify(result4[result4.length - 1], null, 2))

 console.time('subtask #5')
 const result5 = subtask5(100000,100200,true);
 console.timeEnd('subtask #5')
//console.log('subtask #5 result: ', JSON.stringify(result5[0], null, 2), JSON.stringify(result5[result5.length - 1], null, 2))

console.time('subtask #6')
const result6 = subtask6(result3,100);
console.timeEnd('subtask #6');
//console.log('subtask #6 result: ', JSON.stringify(result6[0], null, 2), JSON.stringify(result6[result6.length - 1], null, 2))


module.exports = {
    subtask1,
    subtask2,
    subtask3,
    subtask4,
    subtask5,
    subtask6
}

/**
 *  SUBTASK #1
 *
 * This is a Grouping logic. In this example it means that * - unique field and ** - an array of unique values.
 *
 * Should return an array with the next structure:
 * [
 *      {
 *          dealershipId: number, // *
 *          name: string,
 *          state: string,
 *          cars: [
 *              {
 *                  make: string, // *
 *                  models: [
 *                      {
 *                          model: string, // *
 *                          displayNames: [string, ...] // **
 *                      }, ...
 *                  ]
 *              }, ...
 *          ]
 *      }, ...
 * ]
 * @returns {Array}
 */


/**
 *  SUBTASK #2
 *
 * Should return an array with the next structure:
 * [
 *      {
 *          dealershipId: number, // *
 *          name: string,
 *          state: string,
 *          sellingArea: [
 *              {
 *                  state: string, // *
 *                  customerIds: [string, ...] // **
 *              }, ...
 *          ]
 *      }, ...
 * ]
 *
 * @returns {Array}
 */

/**
 *  SUBTASK #3
 *
 * Should return an array with the next structure:
 * [
 *      {
 *          dealershipId: number, // *
 *          name: string,
 *          state: string,
 *          carIds: [string, ...] <--- cars should be sorted by fields in the next priority : [make -> model -> displayName] (all ASC)
 *      }, ...
 * ]
 *
 * @returns {Array}
 */


/**
 * SUBTASK #4
 *
 * @param {Array} list an array from subtask #3
 * @returns {Array} sorted array from subtask #3 by the next prio of fields : [state -> count of carIds] (ASC -> DESC)
 */


/**
 * SUBTASK #5
 *
 * @param {number} minId [default = 100000]
 * @param {number} maxId [default = 100200]
 * @param {boolean} isReversed if set to true then reverse task logic (IN -> NOT IN)
 * @returns {Array} the same result as in subtask #3 but this logic should work only with those dealership whose dealershipId IN (NOT IN) [minId, maxId]
 */


/**
 * Should return all dealerships (new list) who has enough cars (dealership.carIds > minCarsCount).
 *
 * @param {Array} list
 * @param {number} minCarsCount [default = 100]
 * @returns {Array} filtered dealersips
 */

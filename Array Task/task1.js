'use strict'
const cars = require('./data/cars') // IMMUTABLE. DON'T CHANGE cars
const customers = require('./data/customers') // IMMUTABLE. DON'T CHANGE customers
const dealerships = require('./data/dealerships') // IMMUTABLE. DON'T CHANGE dealerships
const orders = require('./data/orders') // IMMUTABLE. DON'T CHANGE orders
let task3Array;
////////////////////////  First SubTask ///////////////////////////
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

function Sort() {   //Sort Methos
	return function (obj1,obj2) {
		return obj1 > obj2 ? 1
			: obj1 < obj2 ? -1 : 0;
	}
}

function dynamicSortMultiple() {  /////Sort by multiple properties method
	function dynamicSort(property) {
		return function (obj1,obj2) {
			return obj1[property] > obj2[property] ? 1
				: obj1[property] < obj2[property] ? -1 : 0;
		}
	}
	let props = arguments;
	return function (obj1, obj2) {
		let i = 0, result = 0, numberOfProperties = props.length;

		while(result === 0 && i < numberOfProperties) {
			result = dynamicSort(props[i])(obj1, obj2);
			i++;
		}
		return result;
	}
}

const subtask1 = ()=>{
	let dealersThatHaveCarsIds = [];
	for(let i=0;i<cars.length;i++){
		if(uniqueValue(cars[i].dealershipId,dealersThatHaveCarsIds) === true)
			dealersThatHaveCarsIds.push(cars[i].dealershipId);
	}
	dealersThatHaveCarsIds.sort(Sort());
		function findId(currentID,value,left,right,){
			if(currentID > dealersThatHaveCarsIds[0] && currentID < dealersThatHaveCarsIds[dealersThatHaveCarsIds.length-1]){
				if(dealersThatHaveCarsIds[value] === currentID){
					return true;
				}
				else{
					if(currentID > dealersThatHaveCarsIds[value-1] && currentID < dealersThatHaveCarsIds[value+1]){
						return false;
					}
					else{
						if(dealersThatHaveCarsIds[value] > currentID){
							 return findId(currentID,Math.ceil((left + value-1)/2),left,value-1);
						}
						else{
							return findId(currentID,Math.ceil((value+1 + right)/2),value+1,right);
						}
					}
				}
			}
			else{
				if(currentID === dealersThatHaveCarsIds[0] || currentID === dealersThatHaveCarsIds[dealersThatHaveCarsIds.length-1]){
					return true;
				}
				return false;
			}
		}

    const dealersArray = dealerships.reduce((finalArray, current) => {
    	let currentCarsArray = [];
		if(findId(current.dealershipId,Math.ceil(dealersThatHaveCarsIds.length/2),0,dealersThatHaveCarsIds.length-1)){

			currentCarsArray = cars.reduce((arr,thisCar,ind)=>{
				if(current.dealershipId === thisCar.dealershipId) {
					const make = arr.find(i => thisCar.make === i.make);
					if (make) {
						const model = make.models.find(i=>thisCar.model === i.model);
						if(model){
							const displayNames = model.displayNames.find(i=>this.displayName === i.displayName);
							if(displayNames){
							}
							else{
								model.displayNames.push(thisCar.displayName);
							}
						}
						else{
							make.models.push({
								model: thisCar.model,
								displayNames: [thisCar.displayName]
							});
						}
					}
					else {
							arr.push({
							make: thisCar.make,
							models: [{
								model: thisCar.model,
								displayNames: [thisCar.displayName]
							}]});
					}
				}
				return arr;
			},[]);

		}
        const obj = {
            dealershipId: current.dealershipId,
            name: current.name,
            state: current.state,
            cars: currentCarsArray
        }
        finalArray.push(obj);
        return finalArray;
    },[]);
    return dealersArray;
}
////////////////////////  Second SubTask ///////////////////////////
const subtask2 = ()=>{
	let dealersThatHaveCarsIds = [];
	for(let i=0;i<cars.length;i++){
		if(uniqueValue(cars[i].dealershipId,dealersThatHaveCarsIds) === true)
			dealersThatHaveCarsIds.push(cars[i].dealershipId);
	}
	dealersThatHaveCarsIds.sort(Sort());
	function findId(currentID,value,left,right,){
		if(currentID > dealersThatHaveCarsIds[0] && currentID < dealersThatHaveCarsIds[dealersThatHaveCarsIds.length-1]){
			if(dealersThatHaveCarsIds[value] === currentID){
				return true;
			}
			else{
				if(currentID > dealersThatHaveCarsIds[value-1] && currentID < dealersThatHaveCarsIds[value+1]){
					return false;
				}
				else{
					if(dealersThatHaveCarsIds[value] > currentID){
						return findId(currentID,Math.ceil((left + value-1)/2),left,value-1);
					}
					else{
						return findId(currentID,Math.ceil((value+1 + right)/2),value+1,right);
					}
				}
			}
		}
		else{
			if(currentID === dealersThatHaveCarsIds[0] || currentID === dealersThatHaveCarsIds[dealersThatHaveCarsIds.length-1]){
				return true;
			}
			return false;
		}
	}
    const dealersArray = dealerships.reduce((finalArray,current) => {
        const sellingAreaArray = current.sellingArea.reduce((arr,area)=>{
			if(findId(current.dealershipId,Math.ceil(dealersThatHaveCarsIds.length/2),0,dealersThatHaveCarsIds.length-1) === true){
				const customerIdsArray = cars.reduce((idsArray,thisCar)=>{
					if(current.dealershipId === thisCar.dealershipId){
						let flag = false;
						for(let i=0;i<orders.length;i++){
							if(orders[i].inventoryId === thisCar.id){
								idsArray.push(orders[i].customerId);
								break;
							}
						}
						idsArray.push(1);
					}
					return idsArray;
				},[]);
				arr.push({
					state : area,
					customerIds : customerIdsArray
				});
			}
        	return arr;
		},[]);

        const obj={
            dealershipId : current.dealershipId,
            name : current.name,
            state : current.state,
            sellingArea : [sellingAreaArray]
        };
         finalArray.push(obj);
		return finalArray;
    },[]);
    return dealersArray;
}
////////////////////////  Third SubTask ///////////////////////////
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
			currentDealerCars.sort(dynamicSortMultiple("make","model","displayName"));
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
	const sortList = list.sort(dynamicSortMultiple("state","carIds.length"));
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
				currentDealerCars.sort(dynamicSortMultiple("make", "model", "displayName"));
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
console.log('subtask #1 result: ', JSON.stringify(result1[24], null, 2), JSON.stringify(result1[result1.length - 24], null, 2))

 console.time('subtask #2')
 const result2 = subtask2()
 console.timeEnd('subtask #2')
console.log('subtask #2 result: ', JSON.stringify(result2[0], null, 2), JSON.stringify(result2[result2.length - 1], null, 2))

console.time('subtask #3')
const result3 = subtask3();
console.timeEnd('subtask #3')
console.log('subtask #3 result: ', JSON.stringify(result3[0], null, 2), JSON.stringify(result3[result3.length - 1], null, 2))
//
console.time('subtask #4')
const result4 = subtask4(result3);
console.timeEnd('subtask #4')
console.log('subtask #4 result: ', JSON.stringify(result4[0], null, 2), JSON.stringify(result4[result4.length - 1], null, 2))

 console.time('subtask #5')
 const result5 = subtask5(100000,100200,true);
 console.timeEnd('subtask #5')
console.log('subtask #5 result: ', JSON.stringify(result5[0], null, 2), JSON.stringify(result5[result5.length - 1], null, 2))

console.time('subtask #6')
const result6 = subtask6(result3,100);
console.timeEnd('subtask #6');
 console.log('subtask #6 result: ', JSON.stringify(result6[0], null, 2), JSON.stringify(result6[result6.length - 1], null, 2))

module.exports = {
    subtask1,
    subtask2,
    subtask3,
    subtask4,
    subtask5,
    subtask6
};
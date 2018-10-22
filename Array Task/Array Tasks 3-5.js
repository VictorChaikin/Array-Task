// //TASK 3
'use strict';

const iterableObject = {
	firstField: 1,
	secondField: 2
};

iterableObject[Symbol.iterator] = function(){
	let current = this.firstField;
	let last = this.forthField;

	return {
		next(){
			if(current <= last){
				return {
					done:false,
					value : current++
				};
			}
				else{
					return {
					done : true
					};
				}

		}
	};

};
// здесь сделать объект итерируемым
iterableObject.thirdField =3;
iterableObject.forthField =4;

for (const o of iterableObject) {
	console.log(o);
}



//TASK 4

// свой reduce
// function reduce (array, callback, initialValue) {
//
// }

// свой map
// function map (array, callback) {
//
// }
//
// // прочитать про Big O нотацию. знать как высчитывается сложность алгоритмов
//
// // сортировка пузырьком. возвращаем новый массив - старый не трогаем
let array = [];
for(let i=0;i<100000;i++){
	array[i]=Math.floor(Math.random()*1000000000000);
}

function bubleSort(array) {
    let newArray = array.slice();
	for(let i=0; i<newArray.length-1; i++){
		for(let j=0;j<newArray.length-i;j++){
			if(newArray[j]>newArray[j+1]){
				let change = newArray[j];
                newArray[j]=newArray[j+1];
                newArray[j+1] = change;
			}
		}
	}
	return newArray;
}
console.time("#Bubble Sort");
let arr = bubleSort(array);
console.timeEnd("#Bubble Sort");
//console.log(arr.join());




function insertionSort(array){
    let newArray = array.slice();
    for(let i=1;i < newArray.length; i++){
        let flag = false;
        let iterator = i;
        do{
            if(newArray[iterator] < newArray[iterator-1]){
                let change =newArray[iterator];
                newArray[iterator] = newArray[iterator-1];
                newArray[iterator-1] = change;
                iterator--;
                flag = true;
            }
            else{
                flag = false;
            }

        }while(flag === true);
    }
    return newArray;
}
console.time("#Insertion Sort")
const arr2 = insertionSort(array);
console.timeEnd("#Insertion Sort");
//console.log(arr2.join());


//OPTIONAL сортировка выбором. возвращаем новый массив - старый не трогаем
function selectionSort (array){
    let newArray = array.slice();
    let index;
    for(let i=0; i<newArray.length;i++){
        let min = Infinity;

        for(let j=i;j<newArray.length;j++){
            if(newArray[j] < min ){
                //let change = min;
                min = newArray[j];
                index=j;
                //newArray[j] = change;
            }
        }
        if(newArray[i] > min){
            let change = newArray[i];
            newArray[i] = min;
            newArray[index] = change;
        }

    }
    return newArray;
}
console.time("#Selection Sort");
let arr1 = selectionSort(array);
console.timeEnd("#Selection Sort");
//console.log(arr1.join());


 //OPTIONAL сортировка слиянием. возвращаем новый массив - старый не трогаем
let mergeSortArray = array.slice();
function mergeSort (array,first=0,last=array.length-1) {

	let middle = Math.floor((first+last )/2);
	if(last - first >= 1){
		mergeSort(array,first,middle);
		mergeSort(array,middle+1,last);

		let leftArray = [];
		let rightArray = [];

		for(let i = first; i<middle+1;i++){
			leftArray.push(array[i]);
		}
		for(let i = middle+1; i<last+1;i++){
			rightArray.push(array[i]);
		}
		let F1=0,F2 =0;
		let endOfArray = false;
		let endOfLeftArray = false;
		for(let i=first;i<last+1;i++){
			if(endOfArray === false){
				if(leftArray[F1]<rightArray[F2]){
					array[i]=leftArray[F1];
					F1++;
					if(F1>leftArray.length-1){
						endOfArray = true;
						endOfLeftArray=true;
					}
				}
				else{
					array[i]=rightArray[F2];
					F2++;
					if(F2>rightArray.length-1){
						endOfArray=true;
					}
				}
			}
			else{
				if(endOfLeftArray === true){
					array[i] = rightArray[F2];
					F2++;
				}
				else{
					array[i] = leftArray[F1];
					F1++;
				}
			}
		}

	}
}
console.time("#Merge Sort");
mergeSort(mergeSortArray);
console.timeEnd("#Merge Sort")

// // OPTIONAL быстрая сортировка. возвращаем новый массив - старый не трогаем
let quickSortArray = array.slice();
function quickSort (array,first = 0,last = array.length-1) {
	let pivotPos = Math.ceil((first + last)/2);
	let pivot = array[pivotPos];
	let check = false;
	// for(let i=first;i<last+1;i++){
	// 	console.log(array[i]);
	// }
	// console.log("Pivot = "+pivot);
	for(let i=first;i<last && check === false;i++){
		if(array[i] > array[i+1])
			check=true;
	}

	let F = first,L = last;
    if(check === true){
		do {
			if (array[first] >= pivot) {
				// console.log(" Punkt 1");
				if (array[first] > array[last]) {
					if (array[last] <= pivot) {
						let change = array[first];
						array[first] = array[last];
						array[last] = change;
						first++;
						last--;
					}
					else {

						last--;
					}
				}
				else {
                    if(array[first] === array[last] && last === pivotPos){
                        first++;
                        // console.log("Yes");
                    }
                    else
					last--;
				}
			}
			else {
				first++;
			}
		}while(last > first);

		quickSort(array,F,last);
		quickSort(array,first,L);
	}
}
console.time("#Quick Sort");
quickSort(quickSortArray);
console.timeEnd("#Quick Sort");
//console.log(quickSortArray.join());
//
// console.log("Array");
// console.log(array.join());


// TASK 5
//
// const cars = [
// 	{make: 'Audi', status: 'ACTIVE', valueIndicator: 5612, price: 150000},
// 	{make: 'Audi', status: 'ACTIVE', valueIndicator: 6543, price: 172099},
// 	{make: 'Mercedes', status: 'ACTIVE', valueIndicator: 13314, price: 320999},
// 	{make: 'Mercedes', status: 'SOLD', valueIndicator: 20000, price: 199999},
// 	{make: 'BMW', status: 'ACTIVE', valueIndicator: 7502, price: 210999}
// ]
//
// // weights : valueIndicator * 10 = price
// // valueIndicator -> max
// // price -> min
// // methods cannot work with SOLD cars.
//
// function getTheBest () {
//
// }
//
// function getMostEqualTo (valueIndicator, price) {
//
// }

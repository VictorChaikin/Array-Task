'use strict'

const LinkedList = require('./LinkedList')

// LinkedList's task

// Method's signature is immutable and cannot be changed.
// Defaults should be implemented.

// TASK #2

/**
 * SUBTASK #1
 * 
 * Converts any array to a LinckedList type.
 * 
 * @param {Array} array any array
 * @returns {LinkedList} converted array
 */
function convertToLinkedList (array) {
    return new LinkedList()
}

/**
 * SUBTASK #2
 * 
 * Should return all dealerships (new list) who has enough cars (dealership.carIds > minCarsCount).
 * 
 * @param {LinckedList} linkedDealerships
 * @param {number} minCarsCount [default = 100]
 * @returns {LinkedList} filtered dealerships
 */
const filterDealerships = (linkedDealerships, minCarsCount) => {
    return new LinkedList()
}

/**
 * SUBTASK #3
 * 
 * Should return an array of counts of dealership.carIds mapped from linkedDealerships.
 * 
 * @param {Array} linkedDealerships
 * @returns {Array} mapped result from dealerships by dealership.carIds.length
 */
const mapLinkedDealerships = (linkedDealerships) => {
    return []
}

/**
 * SUBTASK 4 (ADDITIONAL)
 * Understanding of the difference between Array and LinkedList.
 */

console.time('subtask #1')
const linkedDealerships = convertToLinkedList(dealerships)
console.timeEnd('subtask #1')
console.log('subtask #1 result: ', JSON.stringify(linkedDealerships[0], null, 2), JSON.stringify(linkedDealerships[linkedDealerships.length - 1], null, 2))

console.time('subtask #2')
const filteredDealerships = filterDealerships(linkedDealerships)
console.timeEnd('subtask #2')
console.log('subtask #2 result: ', JSON.stringify(filteredDealerships[0], null, 2), JSON.stringify(filteredDealerships[filteredDealerships.length - 1], null, 2))

console.time('subtask #3')
const listOfCarsCount = mapLinkedDealerships(linkedDealerships)
console.timeEnd('subtask #3')
console.log('subtask #3 result: ', JSON.stringify(listOfCarsCount))

/**
 * PLACE FOR A SUBTASK #4
 */

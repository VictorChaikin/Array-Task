'use strict'

//TODO: create a "Node" class here

/**
 * Implementation of a data structure "Linked List".
 * Use at least simple validation in each method.
 */
class LinkedList {

    /**
     * 
     * @param {boolean} isChainable if true then an instance of this class should have a possibility of chaining like :
     *                                      const instance = new LinkedList(true)
     *                                      const foundNodeAfterChaining = instance.add(1).add(2).addToHead(3).get(2)
     */
    constructor (isChainable) {
        this._isChainable = isChainable || false
    }

    /**
     * Add to the end of the list.
     * 
     * @param {any} value 
     * @returns {LinkedList|Node} if success then returns added Node if _isChainable = false
     */
    add (value) {

    }

    /**
     * Add to the beginning of the list.
     * 
     * @param {any} value 
     * @returns {LinkedList|Node} if success then returns added Node if _isChainable = false
     */
    addToHead (value) {

    }

    /**
     * Add to the list at <index> position. Should generate an error if out of bounds.
     * 
     * @param {number} index 
     * @param {any} value 
     * @returns {LinkedList|Node} if success then returns added Node if _isChainable = false
     */
    addByIndex (index, value) {

    }

    /**
     * Get first found Node instance by its value
     * 
     * @param {any} value 
     * @returns {Node} _isChainable doesnt affect this. always returns Node
     */
    get (value) {

    }

    /**
     * Get value of Node if found.
     * 
     * @param {number} index 
     * @returns {any} _isChainable doesnt affect this. always returns value of Node. if not found then returns undefined.
     */
    getValueByIndex (index) {

    }

    /**
     * Set a new value to the Node at <index> position. Should generate an error if out of bounds.
     * 
     * @param {number} index 
     * @param {any} value 
     * @returns {LinkedList|Node} if success then returns changed Node if _isChainable = false
     */
    set (index, value) {

    }

    /**
     * Remove first found by value Node from LinkedList.
     * 
     * @param {any} value 
     * @returns {LinkedList|number} if removed then 1. if not then -1 
     */
    remove (value) {

    }
    /**
     * Remove all found by value Nodes from LinkedList.
     * 
     * @param {any} value 
     * @returns {LinkedList|number} if removed then count of removed items. if not then -1 
     */
    removeAll (value) {

    }

    /**
     * Remove found by index Node from LinkedList. Should generate an error if out of bounds.
     * 
     * @param {number} index 
     * @returns {LinkedList|number} if removed then 1. if not then -1 
     */
    removeByIndex (index) {

    }

    /**
     * Get size of a LinkedList.
     * 
     * @returns {number} count of Nodes in LinkedList
     */
    getSize () {

    }

    /**
     * Method for mapping LinkedList
     * 
     * @param {Function} cb callback
     * @param {boolean} shouldReturnArray
     * @returns {LinkedList|Array} new converted Array or LinkedList (depends on shouldReturnArray boolean parameter)
     */
    map (cb, shouldReturnArray) {

    }
}

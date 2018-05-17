import 'whatwg-fetch';

const Queue = require("./Queue");

const handleErrors = (resp) => {
    if (!resp.ok) {
        throw Error(resp.statusText);
    }
    return resp;
};

export const getJson = (url) => {
    return fetch('/fe-example-structure.json')
        .then(handleErrors)
        .then((resp) => resp.json())
        .catch((error) => {
            console.log(error);
        });
};

export const genEmpStructure = (raw) => {
    return new Tree(raw);
};

class Node {
    constructor(data, level, parent) {
        this.name = Object.getOwnPropertyNames(data)[0];
        this.position = data[this.name].position;
        this.parent = parent;
        this.level = level;
        this.children = data[this.name].employees;
    }
}

class Tree {
    constructor(data) {
        this._root = new Node(data, 1, null);
        this.tree = this.buildTree();
    }

    buildTree = function() {
        let queue = new Queue();
        let tree = [];

        queue.enqueue(this._root);

        let currentTree = queue.dequeue();

        while(currentTree){
            if (currentTree.children.length > 0) {
                for (let i = 0, length = currentTree.children.length; i < length; i++) {
                    queue.enqueue(new Node (currentTree.children[i], currentTree.level + 1, currentTree.name));
                }
            }

            tree.push(currentTree);
            currentTree = queue.dequeue();
        }

        return tree;
    };
}
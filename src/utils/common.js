import 'whatwg-fetch';

const handleErrors = (resp) => {
    if (!resp.ok) {
        throw Error(resp.statusText);
    }
    return resp;
};

export const getJson = (url) => {
    return fetch(url)
        .then(handleErrors)
        .then((resp) => resp.json())
        .catch((error) => {
            alert("Cannot read JSON. Check filename or URL.");
        });
};

export const genEmpStructure = (raw) => {
    return new Tree(raw);
};

class Node {
    constructor(data, level, parent) {
        if (Object.getOwnPropertyNames(data).length > 1) {
            alert("You cannot have two CEOs. One of them will be ignored");
        }

        this.name = Object.getOwnPropertyNames(data)[0];
        this.position = data[this.name].position;
        this.parent = parent;
        this.level = level;
        this.children = data[this.name].employees.map((item) => {
            return new Node(item, level + 1, this.name);
        });
    }
}

class Tree {
    constructor(data) {
        this.tree = new Node(data, 1, null);
    }

    traverseDepth = (tree, callback) => {
        (function recurse(currentNode) {
            if (currentNode.children.length > 0) {
                for (let i = 0, length = currentNode.children.length; i < length; i++) {
                    recurse(currentNode.children[i]);
                }
            }
            callback(currentNode);
        })(tree);
    };

    getTree() {
        const sortedTree = [];

        this.traverseDepth(this.tree, (currentNode) => {
            sortedTree.unshift(currentNode);
        });

        return sortedTree;
    }

    modifyTree(source, target) {
        let sourceNode = null;
        let origParent = null;

        this.traverseDepth(this.tree, (currentNode) => {
            if (currentNode.name === source) {
                sourceNode = currentNode;
            }
        });

        if (sourceNode.parent === target) {
            alert("You cannot assign employee to already assigned boss!");
        }

        if (sourceNode && sourceNode.parent !== target && source !== target) {
            origParent = sourceNode.parent;

            this.traverseDepth(this.tree, (currentNode) => {
                if (currentNode.name === target) {
                    sourceNode.parent = target;
                    sourceNode.level = currentNode.level + 1;

                    currentNode.children.push(sourceNode);
                } else if (currentNode.name === origParent) {
                    currentNode.children.forEach((item, i , arr) => {
                        if (item.name === source) {
                            arr.splice(i, 1);
                        }
                    })
                }
            });
        }

        return this.getTree();
    }
}
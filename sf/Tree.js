function BinarySearchTree() {
  var Node = function (key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
  var root = null;
  this.insert = function (key) {
    var newNode = new Node(key);
    if (root === null) {
      root = newNode;
    } else {
      return insertNode(root, newNode);
    }
  }
  this.inOrderTraverse = function (callback) {
    return inOrderTraverseNode(root, callback);
  }
  this.preOrderTraverseNode = function (callback) {
    return PreOrderTraverseNode(root, callback);
  }
  this.lastOrderTraverse = function (callback) {
   return LastOrderTraverseNode(root, callback)
  }
  this.min = function () {
    return minNode(root);
  }
  this.max = function () {
    return maxNode(root);
  }
  this.search=function(key){
    return SearchNode(root,key);
  }
  this.remove=function(key){
    root=removeNode(root,key);
  }
}

function insertNode(node, newNode) {
  if (newNode.key < node.key) {
    if (node.left === null) {
      node.left = newNode;
    } else {
      insertNode(node.left, newNode);
    }
  } else {
    if (node.right === null) {
      node.right = newNode;
    } else {
      insertNode(node.right, newNode);
    }
  }
}

function inOrderTraverseNode(node, callback) {
  if (node !== null) {
    inOrderTraverseNode(node.left, callback);
    callback(node.key);
    inOrderTraverseNode(node.right, callback);
  }
}

function PreOrderTraverseNode(node, callback) {
  if (node !== null) {
    callback(this.key);
    PreOrderTraverseNode(node.left, callback);
    PreOrderTraverseNode(node.right, callback);
  }
}

function LastOrderTraverseNode(node, callback) {
  if (node !== null) {
    LastOrderTraverseNode(node.left, callback);
    LastOrderTraverseNode(node.right, callback);
    callback(this.key);
  }
}

function minNode(node) {
  if (node) {
    while (node && node.left !== null) {
      node = node.left;
    }
    return node.key;
  }
  return null;
}

function maxNode(node) {
  if (node) {
    while (node && node.right) {
      node = node.right;
    }
    return node.key;
  }
  return null;
}

function SearchNode(node,key){
  if(node===null)return false;
  if(key<node.key){
    return SearchNode(node.left,key);
  }else if(key>node.key){
    return SearchNode(node.right,key);
  }else{
    return true;
  }
}
function removeNode(node,key){
  if(node === null){
    return null;
  }
  if(key<node.key){
    node.left=removeNode(node.left,key);
    return node;
  }else if(key>node.key){
    node.right=removeNode(node.right,key);
    return node;
  }else{
    if(node.left===null&&node.right===null){
      node =null;
      return node;
    }else if(node.left===null&&node.right){
      node=node.right;
      return node;
    }else if(node.right===null&&node.left){
      node=node.left;
      return node;
    }else{
      let aux =minNode(node.right);
      node.key=aux.key;
      node.right=removeNode(node.right,aux.key);
      return node;
    }
  }
}
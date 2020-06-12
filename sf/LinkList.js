function LinkedList() {
    let Node = function(element){ 
    this.element = element;
    this.next = null;
    };
    let length = 0; 
    let head = null; 
    this.append = function(element){
        let node = new Node(element),current = head;
        if(head === null){
            head =node;
        }else{
            current = head;
            while(current.next){
                current = current.next;
            }
            current.next = node;
        }
        length++;
    };
    this.insert = function(position, element){};
    this.removeAt = function(position){};
    this.remove = function(element){};
    this.indexOf = function(element){};
    this.isEmpty = function() {};
    this.size = function() {};
    this.getHead = function(){};
    this.toString = function(){};
    this.print = function(){
    
    };
    }
    let linkedList = new LinkedList();
    linkedList.append(1);
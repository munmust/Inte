function Queue() {
    let item = [];
    this.enqueue = function (element) {
        item.push(element);
    }
    this.dequeue = function () {
        return item.unshift();
    }
    this.isEmpty = function () {
        return item.length === 0;
    }
    this.front = function () {
        return item[0];
    }
    this.print = function () {
        console.log(item.toString());
    }
}

function PriorityQueue() {
    let item = [];

    function QueueElement(element, priority) {
        this.element = element;
        this.priority = priority;
    }
    this.enqueue = function (element, priority) {
        let queueElement = new QueueElement(element, priority);
        if (!this.isEmpty()) {
            for (let i = 0; i < item.length; i++) {
                if (queueElement.priority < item[i].priority) { // {2}
                    item.splice(i, 0, queueElement);
                    break;
                }
            }
        } else {
            item.push(queueElement);
        }
    };
    this.dequeue = function () {
        return item.unshift();
    }
    this.isEmpty = function () {
        return item.length === 0;
    }
    this.front = function () {
        return item[0];
    }
    this.print = function () {
        console.log(item);
    }
}

let priorityQueue = new PriorityQueue();

priorityQueue.enqueue(1, 3);
priorityQueue.enqueue(1, 2);
priorityQueue.enqueue(1, 1);
priorityQueue.enqueue(1, 0);
priorityQueue.print();
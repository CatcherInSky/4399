class Food{
    constructor(options, elements = null){
        options = options || {};
        this.elements = elements;
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.width = options.width || 20;
        this.height = options.height || 20;
        this.color = options.color || 'green';
        this.position = 'absolute';
    }
    render(map){
        function remove(elements) {
            if(elements!=null){
                elements.parentNode.removeChild(elements);
                elements = null
            }
        }
        remove(this.elements);
        this.x = Math.floor(Math.random()*(map.offsetWidth/this.width))*this.width;
        this.y = Math.floor(Math.random()*(map.offsetHeight/this.height))*this.height;
        let div = document.createElement('div')
        map.appendChild(div);
        this.elements = div;
        div.style.position = this.position;
        div.style.left = this.x + 'px';
        div.style.top = this.y + 'px';
        div.style.width = this.width + 'px';
        div.style.height = this.height + 'px';
        div.style.backgroundColor = this.color;
    }
}
class Snake{
    constructor(options,elements = []){
        options = options || {};
        this.elements = elements;
        this.position = 'absolute';
        this.width = options.width || 20;
        this.height = options.height || 20;
        this.direction = options.direction ||'right';
        this.body = [
            {x:3,y:2,color:'red'},
            {x:2,y:2,color:'red'},
            {x:1,y:2,color:'red'},
        ]
    }
    render(map) {
        function remove(elements) {
            for (var i = elements.length - 1; i >= 0; i--) {
                elements[i].parentNode.removeChild(elements[i]);
                elements.splice(i, 1);
            }
        }
        remove(this.elements);
        for(let i=0;i<this.body.length;i++){
            let div = document.createElement('div')
            map.appendChild(div);
            this.elements.push(div);
            div.style.position = this.position;
            div.style.left =this.body[i].x*this.width + 'px';
            div.style.top = this.body[i].y*this.height + 'px';
            div.style.width = this.width + 'px';
            div.style.height = this.height + 'px';
            div.style.backgroundColor = this.body[i].color;
        }
    }
    move(food,map) {
        for(let i = this.body.length-1;i>0;i--){
            this.body[i].x = this.body[i-1].x;
            this.body[i].y = this.body[i-1].y;
        }
        let head = this.body[0]
        switch(this.direction){
            case 'right':
                head.x +=1;
                break;
            case 'left':
                head.x -=1;
                break;
            case 'top':
                head.y -=1;
                break;
            case 'bottom':
                head.y +=1;
                break;
        }
        var headX = head.x * this.width;
        var headY = head.y * this.height;
        if (headX === food.x && headY === food.y) {
            var last = this.body[this.body.length - 1];
            this.body.push({
                x: last.x,
                y: last.y,
                color: last.color
            });
            food.render(map);
        }
    }
}
class Game{
    constructor(map){
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
    }
    start(){
        this.food.render(this.map);
        this.snake.render(this.map)
        runSnake(this.snake,this.food,this.map);
        bindKey(this);
        function runSnake(snake,food,map){
            let timerID = setInterval(function(){
                snake.move(food,map);
                var maxX = map.offsetWidth / snake.width;
                var maxY = map.offsetHeight / snake.height;
                var headX = snake.body[0].x;
                var headY = snake.body[0].y;
                if (headX < 0 || headX >= maxX || headY < 0|| headY >= maxY) {
                    clear()
                    alert('Game Over');
                }
                snake.render(map);
            }.bind(this),150)
            function clear() {
                clearInterval(timerID)
            }
        }
        function bindKey(that) {
            document.addEventListener('keydown', function (e) {
                switch (e.keyCode) {
                    case 37:
                        that.snake.direction = 'left';
                        break;
                    case 38:
                        that.snake.direction = 'top';
                        break;
                    case 39:
                        that.snake.direction = 'right';
                        break;
                    case 40:
                        that.snake.direction = 'bottom';
                        break;
                }
            }.bind(that), false);
        }
    }
}

(function () {
    var map = document.getElementById('map');
    var game = new Game(map);
    game.start();
})()
(function(){
    let elements = null;
    function Food(options){
        options = options || {};
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.width = options.width || 20;
        this.height = options.height || 20;
        this.color = options.color || 'green';
        this.position = 'absolute';
    }
    Food.prototype.render = function(map){
        remove();
        this.x = Math.floor(Math.random()*(map.offsetWidth/this.width))*this.width;
        this.y = Math.floor(Math.random()*(map.offsetHeight/this.height))*this.height;
        let div = document.createElement('div')
        map.appendChild(div);
        elements = div
        div.style.position = this.position;
        div.style.left = this.x + 'px';
        div.style.top = this.y + 'px';
        div.style.width = this.width + 'px';
        div.style.height = this.height + 'px';
        div.style.backgroundColor = this.color;
    }
    function remove() {
        if(elements!=null){
            elements.parentNode.removeChild(elements);
            elements = null
        }
    }
    window.Food = Food;
})();
(function(){
    var elements = []; 
    function Snake(options){
        options = options || {};
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
    Snake.prototype.render = function(map) {
        remove();
        for(let i=0;i<this.body.length;i++){
            let div = document.createElement('div')
            map.appendChild(div);
            elements.push(div);
            div.style.position = this.position;
            div.style.left =this.body[i].x*this.width + 'px';
            div.style.top = this.body[i].y*this.height + 'px';
            div.style.width = this.width + 'px';
            div.style.height = this.height + 'px';
            div.style.backgroundColor = this.body[i].color;
        }
    }
    Snake.prototype.move = function(food,map) {
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
    function remove() {
        for (var i = elements.length - 1; i >= 0; i--) {
            elements[i].parentNode.removeChild(elements[i]);
            elements.splice(i, 1);
        }
    }

   
    window.Snake = Snake;
})();



(function(){
    let that
    function Game(map) {
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        that = this;
    }
    Game.prototype.start = function(){
        this.food.render(this.map);
        this.snake.render(this.map)
        runSnake();
        bindKey();
    }
    function runSnake(){
        let timerID = setInterval(function(){
            this.snake.move(this.food,this.map);
            var maxX = this.map.offsetWidth / this.snake.width;
            var maxY = this.map.offsetHeight / this.snake.height;
            var headX = this.snake.body[0].x;
            var headY = this.snake.body[0].y;
            if (headX < 0 || headX >= maxX || headY < 0|| headY >= maxY) {
                clear()
                alert('Game Over');
            }
            this.snake.render(this.map);
        }.bind(that),150)
        function clear() {
            clearInterval(timerID)
        }
    }
    
    function bindKey() {
        document.addEventListener('keydown', function (e) {
            switch (e.keyCode) {
                case 37:
                    this.snake.direction = 'left';
                    break;
                case 38:
                    this.snake.direction = 'top';
                    break;
                case 39:
                    this.snake.direction = 'right';
                    break;
                case 40:
                    this.snake.direction = 'bottom';
                    break;
            }
        }.bind(that), false);
    }
    window.Game = Game;
})();


(function () {
    var map = document.getElementById('map');
    var game = new Game(map);
    game.start();
})()

//https://www.cnblogs.com/yangyutian/p/10934458.html
//https://blog.csdn.net/zero________________/article/details/80184540
(function(){

function Pool(objects){
    this.queue = [];
    this.objects = objects;
};

Pool.prototype.add = function(object){
    this.objects.push(object);
    
    return this.call();
};

Pool.prototype.call = function(){
    if(this.objects.length && this.queue.length){
        var fn = this.queue.shift(),
            obj = this.objects.shift();
            
        fn(obj, this);
    }
    
    return this;
};

Pool.prototype.act = function(fn){
    this.queue.push(fn);
    
    return this.call();
};

this.Pool = Pool;

}());
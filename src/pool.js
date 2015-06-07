(function(){

function Pool(objects){
    var objs = [], i;

    for(i = 0, i < objects.length; i++){
        var idx = objs.indexOf(objects[i]);

        if(idx === -1){
            objs.push(objects[i]);
        }
    }

    this.queue = [];
    this.objects = objs;
};

Pool.prototype.add = function(object){
    var idx = this.objects.indexOf(object);
    
    if(idx === -1){
        this.objects.push(object);
    }

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
var Pools = new Class({
    $objects: [],
    $queue: [], 
    
    initialize: function(objects){
        this.$objects = [].combine(Array.from(objects));
    },
    
    add: function(object){
        if(!this.$objects.contains(object)){
            this.$objects.push(object);
        }

        return this.call();
    },
    
    call: function(){
        if(this.$objects.length && this.$queue.length){
            var fn = this.$queue.shift(),
                obj = this.$objects.shift();
        
            fn(obj, this);
        }
        
        return this;
    },
    
    act: function(fn){
        this.$queue.push(fn);
        this.call();
        
        return this;
    }
});
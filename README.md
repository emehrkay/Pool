Pool
====

Simple JavaScript Object Pool offered as both a MooTools class and a simple function constructor. Usage is pretty much the same for both implementations.

**Object Pool**

http://en.wikipedia.org/wiki/Object_pool_pattern

An object pool is a set of initialised objects that are kept ready to use, rather than allocated and destroyed on demand. A client of the pool will request an object from the pool and perform operations on the returned object. When the client has finished with an object, it returns it to the pool, rather than destroying it.

**Usage**

Create the objects that you want to reuse, store them in an array and pass them to the Pool constructor.
    
    var objs = [new Request(), new Request()];
    var request_pool = new Pool(objs);

Request an action to be taken against the next available object in the pool via the act method. Pool.act() takes a function whose signature is one of the pooled objects and the pool itself.

In the action you simply use the object and put it back into the pool by calling the Pool.add() method.

    request_pool.act(function(request, pool){
        //use the object when it is available
        request.setOptions({
            'url': '/some/long/request',
            'method': 'post'
            ...
        });
        
        request.removeEvents()
            .addEvent('complete', function(){
                // put the object back when you're done with it
                pool.add(request);
            });
    });
    
**Example**

Four Fx.Morph instances are created to animate 400 elements.

http://jsfiddle.net/XkTPJ/
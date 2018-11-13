require(['./add','./square'],function(addModule,squareMoudle){
    console.log(addModule.add(1,1));
    console.log(squareMoudle.square(3));
})
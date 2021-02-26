class food{
    constructor(){
        this.foodStock = 20
        this.lastFed = 0

        this.image = loadImage("images/Milk.png")

    }
    getFoodStock(){
        //var foodRef  = database.ref('Food');
        //foodRef.on("value",function(data){
           //Food = data.val();
        //})
        return this.foodStock
    }
    updateFoodStock(a){
        console.log(a)
        database.ref('/').update({
          Food : a
        });
    }
    deductFood(){
        if(this.foodStock>0){
            this.foodStock -= 1
        }
    }
    getFedTime(lastFed){
        this.lastFed = lastFed
    }
    display(){
        var x = 80
        var y = 100

        imageMode(CENTER)
        image(this.image, 720, 220, 70, 70)

        if(this.foodStock!== 0){
            for(var i = 0; i<this.foodStock;i++){
                if(i%10===0){
                    x = 20
                    y = y+50
                }
                image(this.image, x,y,50,50)
                x=x+30
            }
        }
    }
}
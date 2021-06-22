

var app = new Vue({
    el:"#app",
    data:{ msg:"hellowooooo"
        ,list:[
        {
            id:1,
            name:'iphone 10',
            price:6888,
            count:1
        },{
            id:2,
            name:'iphone 11',
            price:7999,
            count:1
        },{
            id:1,
            name:'iphone 12',
            price:8111,
            count:1
        }
    ]

    },
    computed:{
        totalPrice:function(){
            var total = 0;
            for (let i = 0; i < this.list.length; i++) {
                var item = this.list[i];
                total += item.price * item.count;
                
                
            }
            return total.toString().replace(/\B(?=(\d{3})+$)/g,',');
        }
    },
    methods:{
        handleReduce:function(index){
            if(this.list[index].count === 1) return;
            this.list[index].count--;
        },
        handleIncrease:function(index){
            this.list[index].count++;
        },
        handleRemove:function(index){
            this.list.splice(index,1);
        }

    }
})
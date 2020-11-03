const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const shortid=require("shortid");

const app=express();
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://my-cattie:test123@my-pro.htlqj.mongodb.net/my-pro?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
});

//creating product model so we can add new product inside the list
const Product=mongoose.model("products",new mongoose.Schema({
    _id:{
        type:String, 
        default:shortid.generate},
        title:String,
        description:String,
        image:String,
        price:Number,
        availableSizes:[String]
}))
app.get("/api/products", async(req,res)=>{
    const products=await Product.find({});
    res.send(products);
});
app.get("/api/products/:id", async(req,res)=>{
    const products=await Product.findById(req.params.id);
    res.send(products);
});
app.post("/api/products", async(req,res)=>{
    const newProduct=new Product(req.body);
    const savedproduct=await newProduct.save();
    res.send(savedproduct);
});
app.delete("/api/products/:id", async(req,res)=>{
    const deleteProducts=await Product.findByIdAndDelete(req.params.id);
    res.send(deleteProducts);
})
app.patch("/api/products/:id", async(req,res)=>{
    const updatedProducts=await Product.findByIdAndUpdate(req.params.id);
    updatedProducts.price=req.body.price
    const newPrice=await updatedProducts.save()
    res.send(newPrice);
})
//for creating order
const Order=mongoose.model("order",new mongoose.Schema({
    _id:{
        type:String,
        default:shortid.generate
    },
    email:String,
    name:String,
    address:String,
    total:Number,
    cartItems:[{
        _id:String,
        title:String,
        price:Number,
        count:Number
    }]
    
},
    {
        timeStamps:true
    }
));
app.post("/api/orders", async(req,res)=>{
    if(
        !req.body.name ||
        !req.body.email ||
        !req.body.address ||
        !req.body.total ||
        !req.body.cartItems 
        ){
            return res.send({message:"Data is required"})
        }
        const order=await Order(req.body).save();
        res.send(order);
})

const port=process.env.PORT || 3000;
app.listen(port,()=>console.log(`server running in port number ${port}`))
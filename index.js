const express=require('express');
const mongoose=require('mongoose');

const app = express();
app.set('view engine', 'ejs');

mongoose.connect('mongodb+srv://thiennvph22351:Thienvb1999@cluster0.8wgkgru.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log("Ket noi thanh cong");
}).catch((err)=>{
    console.log("Loi", err);
});

const QLSinhVien = mongoose.connection.useDb('QLSinhVien');
const SinhVienSchema=new mongoose.Schema({
    masv:String,
    tensv:String
});
const SinhVien=QLSinhVien.model('sinhvien', SinhVienSchema);

app.get('/sinhvien',async (req,res)=>{
    try {
        const sinhvien=await SinhVien.find();
        
            ///res.json(sinhvien);
            res.render('sinhviens', {sinhvien: sinhvien});
            console.log(sinhvien);
        
    } catch (error) {
        console.error("Loi doc du lieu: ");
        res.status(500).json({error: "Doc loi du lieu"});
    }
});

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log('server dang chay o cong 5000');
});
module.exports=app;
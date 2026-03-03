var express = require('express');
var app = express();
var mongoose = require('mongoose');

// 1. Nạp các Router (Điều hướng)
var indexRouter = require('./router/index');
var chudeRouter = require('./router/chude');
var taikhoanRouter = require('./router/taikhoan');
var baivietRouter = require('./router/baiviet');

// 2. Kết nối Database MongoDB Atlas
// Thay mật khẩu 123 vào chuỗi kết nối
// Thay thế toàn bộ chuỗi uri cũ bằng chuỗi này:
var uri = 'mongodb://13hoanguy_db_user:123@ac-63dmeyd-shard-00-00.b8ir9xx.mongodb.net:27017/trangtin?ssl=true&authSource=admin';
mongoose.connect(uri)
  .then(() => console.log('✅ Chúc mừng! Đã kết nối thành công bằng chuỗi trực tiếp!'))
  .catch(err => {
    console.error('❌ Vẫn lỗi? Hãy kiểm tra IP Whitelist trên Atlas một lần nữa:', err);
  });

// 3. Cấu hình View Engine (Giao diện)
app.set('views', './views');
app.set('view engine', 'ejs');

// 4. Cấu hình đọc dữ liệu từ Form và JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 5. Sử dụng các Router
app.use('/', indexRouter);
app.use('/chude', chudeRouter);
app.use('/taikhoan', taikhoanRouter);
app.use('/baiviet', baivietRouter);

// 6. Chạy server tại cổng 3000
app.listen(3000, () => {
    console.log('Server is running at http://127.0.0.1:3000');
});
# Cấu trúc thư mục

## Backend

config  
| - dbconnect.js // kết nối database  
controller // chứa các file chịu trách nhiệm xử lý các yêu cầu đến và trả lời phản hồi cho khách hàng.  
| - user.js // xử lý yêu cầu liên quan đến người dùng. VD: cập nhật thông tin người dùng, ...  
| - auth.js // xử lý yêu cầu liên quan tới bảo mật tài khoản. VD: đăng ký, đăng nhập, quên mật khẩu, ...  
| - todo.js // xử lý các yêu cầu liên quan tới công việc cơ bản CRUD  
enum  
| - statusCode.js // chứa các mã http code  
middleware // chứa các file xử lý giữa vòng đời req-res  
| - errorHandle.js // xử lý bắt lỗi  
| - verifyToken.js // Xác thực người dùng qua token (jwt)  
model // chứa các model: user, todo  
route // định tuyến các đường dẫn api  
utils // chứa các hàm hỗ trợ như: sendmail để gửi mail....  

## Frontend

....

# Cài đặt package cần thiết

## Backend

Các package cần thiết cho ứng dụng:

- bcrypt: Package này cung cấp chức năng băm mật khẩu an toàn sử dụng thuật toán bcrypt
- body-parser: Package này giúp xử lý dữ liệu đầu vào từ các yêu cầu HTTP trong Express.js. Nó thường được sử dụng để trích xuất dữ liệu từ các trường biểu mẫu, JSON hoặc dữ liệu URL mã hóa và chuyển đổi chúng thành đối tượng JavaScript có thể sử dụng được trong ứng dụng.
- cors: Package này cung cấp một middleware để xử lý vấn đề Cross-Origin Resource Sharing (CORS) trong Express.js.
- dotenv: Package này cung cấp khả năng đọc các biến môi trường từ file .env trong ứng dụng Node.js.
- express: Express.js là một framework phát triển ứng dụng web Node.js mạnh mẽ và linh hoạt.
- express-async-handler: Package này cung cấp một trình xử lý bất đồng bộ (async handler) cho Express.js. Nó giúp xử lý các hàm xử lý yêu cầu Express.js sử dụng từ khóa async/await mà không cần phải bắt lỗi bất đồng bộ một cách rõ ràng.
- jsonwebtoken: Package này cung cấp chức năng tạo và xác minh JSON Web Tokens (JWT) trong Node.js. JWT là một phương thức để xác thực và truyền thông tin an toàn giữa các bên bằng cách mã hóa dữ liệu vào trong một chuỗi JSON và ký hiệu bằng chữ ký số.
- mongoose: Package này là một Object Data Modeling (ODM) cho MongoDB trong Node.js. Nó cung cấp các công cụ và tính năng để tương tác với cơ sở dữ liệu MongoDB một cách dễ dàng và linh hoạt, bao gồm định nghĩa các mô hình dữ liệu, thực hiện truy vấn và thao tác dữ liệu.
- nodemailer: Package này cung cấp chức năng gửi email trong Node.js.
- randomstring: Package này cung cấp các chức năng để tạo chuỗi ngẫu nhiên trong Node.js.

### Lệnh cài đặt: 
> npm install bcrypt express body-parser cors dotenv express express-async-handler jsonwebtoken mongoose nodemailer randomstring

## Frontend

...


# Cài đặt chương trình

# 🔑 Hướng Dẫn Cấu Hình API Key Gemini

## Tại Sao Cần API Key?

Ứng dụng Gieo Quẻ Tết sử dụng **Google Generative AI (Gemini)** để:
- Sinh ra quẻ ngẫu nhiên
- Viết thơ lục bát Tết
- Trích dẫn lời khuyên của Bác Hồ
- Tạo prompt cho hình ảnh

Để gọi Gemini API, bạn cần một **API Key**.

## Cách Lấy API Key (Miễn Phí)

### Bước 1: Truy Cập Google AI Studio
Vào: **https://aistudio.google.com/app/apikey**

![Step 1](https://via.placeholder.com/600x400?text=Google+AI+Studio+Homepage)

### Bước 2: Đăng Nhập
- Nếu chưa có Google Account, hãy tạo một
- Đăng nhập bằng tài khoản Google của bạn

### Bước 3: Tạo API Key
1. Nhìn thấy nút **"Create API Key"** (xanh)
2. Click vào nó
3. Chọn **"Create API key in new project"**

![Step 2](https://via.placeholder.com/600x400?text=Create+API+Key+Button)

### Bước 4: Copy API Key
- Một popup sẽ hiện ra với API Key dài (khoảng 40-50 ký tự)
- Click **"Copy"** hoặc select + Ctrl+C

```
sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Bước 5: Lưu Vào Project
Mở file `.env.local` trong project:

```bash
NEXT_PUBLIC_GEMINI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Thay `sk-xxxxx...` bằng API key bạn vừa copy.

## ⚠️ Bảo Mật

### Quan Trọng!
- **KHÔNG** commit file `.env.local` lên GitHub
- **KHÔNG** share API key với ai
- File `.gitignore` đã cấu hình để bảo vệ
- Nếu API key bị lộ, vào Google AI Studio xóa và tạo key mới

### Kiểm Tra
```bash
# Xem .env.local có trong .gitignore không
cat .gitignore | grep ".env"
```

Kết quả phải có:
```
.env
.env.local
```

## 🔄 Thay Đổi API Key

Nếu bạn muốn thay đổi API key:

1. Mở `.env.local`
2. Sửa dòng:
   ```
   NEXT_PUBLIC_GEMINI_API_KEY=new_api_key_here
   ```
3. Lưu file (Ctrl+S)
4. Restart dev server:
   - Nhấn Ctrl+C trong terminal
   - Chạy `npm run dev` lại

## 🚀 Deploy lên Vercel

Khi deploy lên Vercel:

1. Vào project settings
2. Chọn "Environment Variables"
3. Thêm mới:
   - **Name**: `NEXT_PUBLIC_GEMINI_API_KEY`
   - **Value**: `sk-xxxxxxxxxxxxx`
   - **Scope**: `Production` (và Development nếu muốn test)
4. Click "Save"
5. Redeploy

⚠️ **KHÔNG** paste API key trực tiếp vào code!

## 🆘 Troubleshooting

### Lỗi: "NEXT_PUBLIC_GEMINI_API_KEY is not set"
✓ Giải pháp:
- Kiểm tra `.env.local` đã tạo chưa
- API key có đúng format không
- Restart dev server: Ctrl+C + `npm run dev`
- Xóa cache: `rm -r .next` rồi `npm run dev` lại

### Lỗi: "Error 403: Forbidden"
✓ Giải pháp:
- API key hết hạn hoặc bị vô hiệu hóa
- Vào Google AI Studio xóa key cũ, tạo key mới
- Cập nhật `.env.local`

### Lỗi: "API Key not found in request"
✓ Giải pháp:
- Xác nhận lại `NEXT_PUBLIC_` prefix
- File `.env.local` phải ở thư mục gốc project
- Không có khoảng trắng: `KEY=value` (không phải `KEY = value`)

## 📝 Mẫu File .env.local

```ini
# Google Generative AI API Key
# Lấy tại: https://aistudio.google.com/app/apikey
NEXT_PUBLIC_GEMINI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## 💡 Mẹo

- Bạn có thể tạo nhiều API key cho các project khác nhau
- API key miễn phí có giới hạn request/ngày, nhưng đủ cho phát triển
- Đọc [Google Generative AI Documentation](https://ai.google.dev/) để biết thêm

## ✅ Kiểm Tra Hoạt Động

Sau khi setup xong, kiểm tra bằng cách:

1. Chạy dev server: `npm run dev`
2. Mở http://localhost:3000
3. Click "Rung Hũ Xăm"
4. Nếu thấy quẻ trong Modal → ✅ API Key hoạt động!

Nếu thấy lỗi → Kiểm tra lại các bước trên.

---

🎉 Setup xong! Ứng dụng của bạn sẵn sàng để gieo quẻ!
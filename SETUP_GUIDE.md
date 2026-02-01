# 📖 Hướng Dẫn Cài Đặt Chi Tiết

## Bước 1: Chuẩn Bị

### Kiểm Tra Node.js
```bash
node --version  # Phải là v18 trở lên
npm --version
```

Nếu chưa cài, tải tại: https://nodejs.org/

## Bước 2: Cấu Hình API Key

### 2.1 Lấy API Key từ Google AI Studio
1. Truy cập: https://aistudio.google.com/app/apikey
2. Đăng nhập bằng tài khoản Google
3. Click "Create API Key"
4. Copy API key được cấp

### 2.2 Thêm vào Project
1. Mở file `.env.local` trong thư mục gốc dự án
2. Thay đổi:
   ```
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
   ```
   thành:
   ```
   NEXT_PUBLIC_GEMINI_API_KEY=sk-xxxxxxxxxxxxx
   ```
   (với xxxxxxxxxxxxx là API key của bạn)

3. Lưu file (Ctrl+S)

## Bước 3: Cài Đặt Dependencies

```bash
cd e:\fortune-teller-app
npm install
```

Chờ cho đến khi thấy `added XXX packages`

## Bước 4: Chạy Development Server

```bash
npm run dev
```

Kết quả sẽ hiển thị:
```
> fortune-teller-app@0.1.0 dev
> next dev

  ▲ Next.js 16.1.6
  - Local:        http://localhost:3000
```

## Bước 5: Mở Ứng Dụng

1. Mở trình duyệt (Chrome, Firefox, Safari, Edge)
2. Truy cập: http://localhost:3000
3. Bạn sẽ thấy giao diện với nút "Rung Hũ Xăm"

## 🎮 Sử Dụng Ứng Dụng

### Gieo Quẻ
1. Nhấn nút **"Rung Hũ Xăm"**
2. Chờ vài giây (gọi API Gemini)
3. Sẽ hiện Modal với:
   - **Tên Quẻ**: Ví dụ "Quẻ Thượng Cát"
   - **Thơ Lục Bát**: 4 câu thơ may mắn
   - **Lời Khuyên Bác Hồ**: Câu trích dẫn + giải thích
   - **Từ Khóa**: 2-3 từ khóa định nghĩa
   - **3 Bước Thực Hiện**: Hành động cụ thể
   - **Prompt Tạo Ảnh**: Chi tiết cho Nano Banana

## 🛠️ Troubleshooting

### Lỗi: "NEXT_PUBLIC_GEMINI_API_KEY is not set"
- Kiểm tra file `.env.local` đã tạo chưa
- API key có đúng định dạng không
- Restart development server: Ctrl+C rồi `npm run dev` lại

### Lỗi: "Cannot find module '@google/generative-ai'"
```bash
npm install @google/generative-ai
```

### Ứng dụng mở chậm
- Đây là lần đầu tiên gọi API, bình thường hơn
- Kiểm tra kết nối Internet
- Xem Console (F12 > Console tab) để xem lỗi chi tiết

### Modal không hiển thị
- Kiểm tra Console để xem error
- Đảm bảo API đã trả về response đúng format JSON

## 📦 Build Production

Để tạo bản build sản xuất:
```bash
npm run build
npm run start
```

Sau đó truy cập: http://localhost:3000

## 🚀 Deploy lên Vercel

1. Đẩy code lên GitHub
2. Vào: https://vercel.com
3. Click "New Project"
4. Chọn repository
5. Thêm environment variable:
   - Name: `NEXT_PUBLIC_GEMINI_API_KEY`
   - Value: `sk-xxxxxxxxxxxxx`
6. Deploy!

## 📝 Cấu Trúc Tệp Tin Quan Trọng

```
fortune-teller-app/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Trang chính
│   │   ├── layout.tsx            # HTML layout
│   │   └── api/fortune/
│   │       └── route.ts          # API endpoint
│   └── components/
│       ├── FortuneTeller.tsx      # Component chính
│       └── FortuneModal.tsx       # Component modal
├── public/                        # Folder ảnh
├── .env.local                     # API Key (TẠO TUYỆT ĐỐI)
├── .env.example                   # Mẫu biến môi trường
├── tailwind.config.ts             # Tailwind cấu hình
├── tsconfig.json                  # TypeScript cấu hình
├── package.json                   # Dependencies
└── README.md                       # Thông tin dự án
```

## 🎯 Các Lệnh Hữu Ích

```bash
# Chạy dev server
npm run dev

# Build production
npm run build

# Start production server
npm run start

# Chạy linter
npm run lint

# Xóa cache build
rm -r .next
```

## 💡 Mẹo

- Sử dụng DevTools (F12) để debug
- Xem Network tab để kiểm tra API response
- Hot reload hoạt động: chỉnh code và lưu, trang tự load lại

## 🆘 Cần Giúp?

1. Kiểm tra Console (F12 > Console)
2. Đọc error message kỹ
3. Xem README.md để hiểu chung
4. Đảm bảo Node.js và npm là phiên bản mới nhất

---

✅ Setup hoàn tất! Chúc bạn sử dụng ứng dụng vui vẻ!

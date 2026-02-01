# ⚡ Quick Start Guide

Bắt đầu nhanh trong 5 phút!

## 1️⃣ Cài Đặt API Key (2 phút)

Truy cập: https://aistudio.google.com/app/apikey

- Click "Create API Key"
- Copy API key
- Mở file `.env.local` trong project
- Paste: `NEXT_PUBLIC_GEMINI_API_KEY=sk-xxxxxxxxxxxxx`

## 2️⃣ Cài Đặt Project (2 phút)

```bash
# Clone hoặc vào folder project
cd e:\fortune-teller-app

# Cài dependencies (nếu chưa cài)
npm install

# Chạy dev server
npm run dev
```

## 3️⃣ Mở Ứng Dụng (1 phút)

- Trình duyệt: http://localhost:3000
- Bạn sẽ thấy giao diện với hũ xăm 🏺

## 🎮 Sử Dụng

1. Nhấn **"Rung Hũ Xăm"**
2. Chờ vài giây...
3. Xem quẻ trong Modal bao lì xì 🎊

---

## 📚 Tài Liệu Chi Tiết

Nếu bạn cần hiểu sâu hơn:

| File | Mục Đích |
|------|---------|
| **README.md** | Tổng quan dự án |
| **SETUP_GUIDE.md** | Setup chi tiết, troubleshooting |
| **API_KEY_SETUP.md** | Hướng dẫn lấy API Key |
| **ARCHITECTURE.md** | Kiến trúc, cấu trúc code |
| **FEATURES.md** | Giải thích tất cả tính năng |
| **QUICKSTART.md** | File này 👈 |

---

## 🆘 Gặp Lỗi?

### Lỗi: "NEXT_PUBLIC_GEMINI_API_KEY is not set"
→ Kiểm tra `.env.local` có API key chưa

### Lỗi: Không thấy quẻ
→ Nhấn F12 > Console > xem thông báo lỗi

### Lỗi khác?
→ Xem **SETUP_GUIDE.md** phần Troubleshooting

---

## 💡 Mẹo

- Hot reload hoạt động: edit code → lưu → trang tự load
- DevTools: F12 để xem lỗi, Network request
- Restart server: Ctrl+C rồi `npm run dev`

---

## 🚀 Tiếp Theo?

- Đọc ARCHITECTURE.md để hiểu code
- Sửa System Prompt trong `src/app/api/fortune/route.ts`
- Thêm hình ảnh thật vào `/public`
- Tích hợp Nano Banana API cho tạo ảnh

---

✅ **Sẵn sàng! Hãy bắt đầu gieo quẻ!** 🎊

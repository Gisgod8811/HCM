# 🎯 START HERE - Bắt Đầu Tại Đây!

Chào mừng bạn đến với **Ứng Dụng Gieo Quẻ Tết**!

## ⚡ Bắt Đầu Trong 3 Phút

### Bước 1: Lấy API Key (1 phút)
```bash
# Truy cập link này
https://aistudio.google.com/app/apikey

# Click "Create API Key" → Copy API Key
# Nó sẽ trông như: sk-xxxxxxxxxxxxxxxxxxxxx
```

### Bước 2: Cấu Hình
```bash
# Mở file .env.local trong project
# Thay đổi dòng này:
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here

# Thành (paste API key bạn vừa copy):
NEXT_PUBLIC_GEMINI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxx

# Lưu file (Ctrl+S)
```

### Bước 3: Chạy Ứng Dụng
```bash
# Mở Terminal/PowerShell, chạy:
npm run dev

# Mở trình duyệt: http://localhost:3000
# ✨ Ứng dụng sẽ hiển thị!
```

## 🎮 Dùng Thử Ngay

1. Nhấn nút **"Rung Hũ Xăm"** 🏺
2. Chờ animation + loading...
3. Xem quẻ may mắn trong Modal bao lì xì 🎊

## 📚 Đọc Tiếp

Nếu bạn muốn hiểu sâu:

| File | Nội Dung | Thời Gian |
|------|---------|----------|
| **[QUICKSTART.md](QUICKSTART.md)** | Setup nhanh | 5 phút |
| **[README.md](README.md)** | Tổng quan dự án | 10 phút |
| **[SETUP_GUIDE.md](SETUP_GUIDE.md)** | Setup chi tiết + troubleshoot | 15 phút |
| **[ARCHITECTURE.md](ARCHITECTURE.md)** | Cấu trúc code & design | 20 phút |
| **[FEATURES.md](FEATURES.md)** | Giải thích tất cả tính năng | 20 phút |
| **[API_KEY_SETUP.md](API_KEY_SETUP.md)** | Hướng dẫn lấy API key chi tiết | 10 phút |

## 🆘 Gặp Lỗi?

### Lỗi 1: "NEXT_PUBLIC_GEMINI_API_KEY is not set"
✅ Giải pháp:
- Kiểm tra file `.env.local` đã tạo chưa
- Nhập đúng API key
- Restart dev server: Ctrl+C rồi `npm run dev`

### Lỗi 2: "Cannot find module"
✅ Giải pháp:
```bash
npm install
```

### Lỗi 3: Port 3000 đã được dùng
✅ Giải pháp:
```bash
npm run dev -- -p 3001
# Hoặc đóng ứng dụng khác dùng port 3000
```

### Lỗi khác?
→ Xem **[SETUP_GUIDE.md](SETUP_GUIDE.md)** phần **Troubleshooting**

## 💡 Mẹo Nhanh

```bash
# Chạy dev server
npm run dev

# Build production
npm run build

# Start production server
npm run start

# Kiểm tra linting
npm run lint

# Xem file quan trọng
# - src/app/page.tsx (trang chủ)
# - src/app/api/fortune/route.ts (API)
# - src/components/FortuneTeller.tsx (main component)
```

## 📁 File Cấu Trúc

```
fortune-teller-app/
├── src/app/
│   ├── page.tsx              ← Trang chủ (/)
│   └── api/fortune/route.ts  ← API endpoint
├── src/components/
│   ├── FortuneTeller.tsx      ← Main component
│   └── FortuneModal.tsx       ← Modal bao lì xì
├── .env.local                 ← API Key (TẠO & ĐIỀN)
├── tailwind.config.ts         ← Tailwind config
└── README.md + docs/          ← Tài liệu
```

## 🔑 API Key quan trọng!

⚠️ **KHÔNG ĐƯỢC**:
- Commit `.env.local` lên GitHub
- Share API key với ai
- Để API key trong code

✅ **CÓ THỂ**:
- Lưu trong `.env.local`
- Thay đổi và tạo key mới nếu bị lộ
- Deploy trên Vercel với environment variable

## 🚀 Tiếp Theo

Sau khi chạy thành công:

1. **Thử nghiệm**: Click "Rung Hũ Xăm" vài lần
2. **Tìm hiểu Code**: Đọc `ARCHITECTURE.md`
3. **Tùy chỉnh**: Sửa System Prompt trong `route.ts`
4. **Thêm Tính Năng**: Tích hợp Nano Banana API cho tạo ảnh
5. **Deploy**: Đưa lên Vercel hoặc server của bạn

## 📞 Cần Giúp?

1. **Kiểm tra** [QUICKSTART.md](QUICKSTART.md)
2. **Đọc** [SETUP_GUIDE.md](SETUP_GUIDE.md)
3. **Xem Console** (F12 → Console tab)
4. **Xem Terminal** (dòng lỗi nào?)

## ✨ Công Nghệ Sử Dụng

- ⚛️ **React 18** - UI components
- 🎨 **Tailwind CSS** - Styling
- 📦 **Next.js 14** - Framework
- 🤖 **Google Gemini** - AI
- 🔷 **TypeScript** - Type safety

## 🎊 Chúc Mừng!

Bạn đã sẵn sàng khám phá ứng dụng Gieo Quẻ Tết! 

Hãy bắt đầu bằng **3 bước ở trên**, rồi đọc [QUICKSTART.md](QUICKSTART.md) nếu cần!

---

**Địa Điểm**: `e:\fortune-teller-app`

**Status**: ✅ Sẵn sàng sử dụng!

**Bắt Đầu Ngay**: `npm run dev`

🎯 **Hãy bắt đầu!**

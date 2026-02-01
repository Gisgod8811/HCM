# 🎊 Ứng Dụng Gieo Quẻ Tết

Một ứng dụng Next.js 14 kết hợp Gemini AI để gieo quẻ may mắn với lời khuyên của Bác Hồ.

## 🚀 Cài Đặt

### Yêu Cầu
- Node.js 18+ 
- npm hoặc yarn

### Các Bước Setup

1. **Cài đặt dependencies**
   ```bash
   npm install
   ```

2. **Cấu hình API Key**
   - Tạo file `.env.local` trong thư mục gốc dự án
   - Thêm API Key từ Google AI Studio:
   ```
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
   ```
   - Lấy API key tại: https://aistudio.google.com/app/apikey

3. **Chạy development server**
   ```bash
   npm run dev
   ```
   - Mở [http://localhost:3000](http://localhost:3000) trong trình duyệt

## 🎯 Tính Năng

- **Gieo Quẻ Tết**: Rung hũ xăm để nhận quẻ may mắn
- **Lời Khuyên Bác Hồ**: Mỗi quẻ đi kèm với trích dẫn và lời khuyên từ Chủ tịch Hồ Chí Minh
- **Thơ Lục Bát**: 4 câu thơ chúc Tết kèm theo quẻ
- **Hình Ảnh May Mắn**: Prompt tạo ảnh qua Nano Banana (cần kết nối thêm)
- **Thiết Kế Bao Lì Xì**: Giao diện Modal được thiết kế giống bao lì xì truyền thống

## 🔧 Cấu Trúc Dự Án

```
fortune-teller-app/
├── src/
│   ├── app/
│   │   ├── page.tsx           # Trang chính
│   │   ├── layout.tsx         # Layout
│   │   └── api/
│   │       └── fortune/
│   │           └── route.ts   # API endpoint /api/fortune
│   └── components/
│       ├── FortuneTeller.tsx   # Component chính
│       └── FortuneModal.tsx    # Component modal
├── public/                     # Thư mục ảnh tĩnh
├── tailwind.config.ts          # Tailwind config
└── .env.local                  # Biến môi trường (tạo tay)
```

## 🌐 API Endpoint

### POST /api/fortune
Gửi yêu cầu gieo quẻ và nhận JSON response chứa:
- `fortune`: Tên quẻ và thơ lục bát
- `hcm_advice`: Lời khuyên của Bác Hồ (câu trích dẫn, giải thích, từ khóa, 3 bước)
- `nano_banana_prompt`: Prompt để tạo ảnh

**Request:**
```json
{
  "message": "Hãy gieo quẻ cho tôi một quẻ tết may mắn."
}
```

**Response:**
```json
{
  "fortune": {
    "title": "Quẻ Thượng Cát",
    "poem": "Thơ lục bát..."
  },
  "hcm_advice": {
    "quote": "Câu nói của Bác",
    "explanation": "Giải thích...",
    "keywords": ["Từ khóa 1", "Từ khóa 2"],
    "steps": ["Bước 1", "Bước 2", "Bước 3"]
  },
  "nano_banana_prompt": "Prompt tạo ảnh..."
}
```

## 🎨 UI Features

- **Responsive Design**: Hoạt động tốt trên mobile, tablet, desktop
- **Shake Animation**: Hiệu ứng lắc hũ xăm khi nhấn nút
- **Red Envelope Design**: Modal được thiết kế giống bao lì xì Tết truyền thống
- **Tailwind CSS**: Styling hiện đại với Tailwind

## 📦 Technologies

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS
- **Google Generative AI**: Gemini API
- **React Hooks**: State management

## 🚀 Deployment

### Vercel (Khuyến Nghị)
```bash
npm install -g vercel
vercel
```

### Build & Start
```bash
npm run build
npm run start
```

## 📝 Lưu Ý

- Ensure API Key được thêm vào biến môi trường
- Model sử dụng: `gemini-1.5-pro-preview`
- Nano Banana image generation cần setup riêng (hiện chỉ là prompt)

## 📄 License

MIT

## 👨‍💻 Tác Giả

Tạo bằng ❤️ cho cộng đồng Việt Nam

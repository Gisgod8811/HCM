# 🏗️ Kiến Trúc Dự Án

## Tổng Quan

Ứng dụng Gieo Quẻ Tết là một Next.js 14 App Router project kết hợp:
- **Frontend**: React với Tailwind CSS
- **Backend**: Next.js API Routes
- **AI**: Google Generative AI (Gemini)
- **State Management**: React Hooks (useState)

## Flow Chính

```
User Interface (Frontend)
         ↓
[Nhấn "Rung Hũ Xăm"]
         ↓
Shake Animation Triggers
         ↓
Gửi POST request tới /api/fortune
         ↓
Backend: API Route (/api/fortune)
         ↓
Gọi Google Generative AI (Gemini 1.5 Pro)
         ↓
Gemini xử lý System Prompt + User Message
         ↓
Trả về JSON response
         ↓
Parse JSON và lưu vào state
         ↓
Hiển thị Modal (Red Envelope Design)
         ↓
Người dùng xem quẻ, lời khuyên, prompt ảnh
```

## Cấu Trúc Folder

```
fortune-teller-app/
│
├── src/                           # Source code
│   ├── app/                       # Next.js App Router
│   │   ├── layout.tsx             # Root layout (HTML, CSS global)
│   │   ├── page.tsx               # Trang chủ (/)
│   │   │
│   │   └── api/                   # API Routes
│   │       └── fortune/
│   │           └── route.ts       # POST /api/fortune
│   │
│   └── components/                # Reusable React Components
│       ├── FortuneTeller.tsx       # Main component (UI logic)
│       └── FortuneModal.tsx        # Modal component (Red envelope design)
│
├── public/                        # Static files (images, SVGs)
│   └── placeholder.svg            # Placeholder image
│
├── .env.local                     # Environment variables (NOT in git)
├── .env.example                   # Template for .env.local
│
├── tailwind.config.ts             # Tailwind CSS configuration
├── tailwindcss.config.js          # PostCSS config
│
├── tsconfig.json                  # TypeScript configuration
├── next.config.ts                 # Next.js configuration
│ 
├── package.json                   # Dependencies & Scripts
├── package-lock.json              # Lock file
│
├── .gitignore                     # Git ignore rules
├── README.md                      # Project overview
├── SETUP_GUIDE.md                 # Step-by-step setup
└── ARCHITECTURE.md                # This file
```

## Chi Tiết từng Component

### 1. src/app/page.tsx (Trang Chính)
```typescript
import { FortuneTeller } from "@/components/FortuneTeller";

export default function Home() {
  return <FortuneTeller />;
}
```
- Trang đơn giản, chỉ render component `FortuneTeller`
- Route: `/` (Home)

### 2. src/components/FortuneTeller.tsx (Main Component)
**Trách vụ:**
- Quản lý state (isOpen, isLoading, fortuneData, error)
- Trigger shake animation
- Gọi API `/api/fortune`
- Hiển thị giao diện chính (nút, loading state)
- Điều khiển modal

**State:**
- `isOpen`: Modal có hiển thị không
- `isLoading`: Đang load API không
- `fortuneData`: Dữ liệu quẻ từ API
- `error`: Thông báo lỗi
- `jackRef`: Reference tới element hũ xăm

**Event Handlers:**
- `handleShake()`: Khi người dùng nhấn nút

### 3. src/components/FortuneModal.tsx (Modal Component)
**Trách vụ:**
- Hiển thị Modal với thiết kế bao lì xì
- Nhận `isOpen`, `onClose`, `children` props
- Styling: Red envelope (bao lì xì) với golden details

**Styling Details:**
- Red gradient background (#EF4444 → #B91C1C)
- Golden border (#FCD34D)
- Vietnamese character "福" (Phúc - May mắn)
- Modal overlay (semi-transparent black)

### 4. src/app/api/fortune/route.ts (Backend API)
**Endpoint:** `POST /api/fortune`

**Flow:**
1. Nhận JSON request: `{ message: string }`
2. Khởi tạo Google Generative AI client
3. Gọi `gemini-1.5-pro-preview` với:
   - **System Instruction**: Prompt tiếng Việt định nghĩa vai trò AI
   - **User Message**: Yêu cầu từ người dùng
4. Parse response (JSON)
5. Trả về JSON:
   ```typescript
   {
     fortune: { title, poem },
     hcm_advice: { quote, explanation, keywords, steps },
     nano_banana_prompt: string
   }
   ```

**Error Handling:**
- Kiểm tra API key
- Try-catch cho API call
- JSON parse error handling
- Regex fallback để extract JSON từ response

## State Management

```
FortuneTeller (Main Component)
│
├── isOpen: boolean                    # Modal visibility
├── isLoading: boolean                 # API loading state
├── fortuneData: FortuneData | null    # API response data
├── error: string | null               # Error message
└── jackRef: HTMLElement | null        # DOM reference
```

### Type Definition:
```typescript
interface FortuneData {
  fortune: {
    title: string;      // Tên quẻ (e.g., "Quẻ Thượng Cát")
    poem: string;       // 4 câu thơ lục bát
  };
  hcm_advice: {
    quote: string;      // Câu nói của Bác
    explanation: string; // Giải thích Why
    keywords: string[]; // 2-3 từ khóa
    steps: string[];    // 3 bước hành động
  };
  nano_banana_prompt: string; // Prompt tạo ảnh
}
```

## Animation & Styling

### Shake Animation
```css
@keyframes shake {
  0%, 100% { transform: rotate(0deg) translateY(0px); }
  25% { transform: rotate(-5deg) translateY(-10px); }
  50% { transform: rotate(5deg) translateY(-15px); }
  75% { transform: rotate(-5deg) translateY(-10px); }
}

.animate-shake {
  animation: shake 0.8s ease-in-out;
}
```
- Trigger khi nhấn nút
- 0.8s duration
- Phong cách rung hũ xăm truyền thống

### Tailwind CSS Classes
- `bg-gradient-to-b`: Gradient background
- `border-4 border-yellow-400`: Golden border
- `shadow-2xl`: Drop shadow
- `rounded-2xl`: Rounded corners

## API Integration

### Google Generative AI Setup
```typescript
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro-preview",
  systemInstruction: systemPrompt,
});
```

### System Prompt Structure
1. **Role**: AI chuyên gia văn hóa dân gian & tư tưởng Hồ Chí Minh
2. **Task**: Nhận vấn đề, trả JSON
3. **Content**: Quẻ, thơ, lời khuyên
4. **Output**: JSON format đặc tả rõ

## Frontend-Backend Communication

```
Frontend (FortuneTeller)
         ↓ POST /api/fortune
    ↓ JSON request
    {
      "message": "Hãy gieo quẻ cho tôi..."
    }
         ↓
    Backend (route.ts)
         ↓ gọi Gemini API
    Response từ Gemini
         ↓ Parse & return
    {
      "fortune": { ... },
      "hcm_advice": { ... },
      "nano_banana_prompt": "..."
    }
         ↓ JSON response
    Frontend
         ↓ Parse JSON
    State: fortuneData
         ↓ Render Modal
```

## Responsive Design

- **Mobile** (< 640px): Full width, adjusted padding
- **Tablet** (640px - 1024px): Scaled modal
- **Desktop** (> 1024px): Centered, max-width: 28rem (448px)

## SEO & Meta Tags

Mặc định từ Next.js 14 App Router:
- `<html lang="vi">`: Tiếng Việt
- Default meta tags
- Open Graph support (khi cần thêm)

## Performance Optimizations

1. **Next.js Built-in:**
   - Code splitting
   - Image optimization (next/image)
   - Automatic font optimization

2. **Tailwind CSS:**
   - JIT (Just-In-Time) compilation
   - Only unused styles stripped

3. **API Routes:**
   - Server-side processing
   - API key kept secure (server-only)

## Security Considerations

1. **API Key**: Stored in `.env.local` (NOT in git)
2. **Environment Variables**: Only `NEXT_PUBLIC_*` accessible client-side
3. **API Route**: Server-side only logic
4. **Input Validation**: Check `message` exists

## Future Enhancements

1. **Image Generation**: Integrate Nano Banana API
2. **Database**: Save user fortunes history
3. **Social Sharing**: Share fortune on social media
4. **Animations**: More complex animations
5. **Dark Mode**: Add dark theme toggle
6. **Internationalization**: Support multiple languages

## Technology Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React 18 | UI components |
| Styling | Tailwind CSS | Utility-first CSS |
| Framework | Next.js 14 | React meta-framework |
| Backend | Next.js API Routes | Serverless API |
| AI/ML | Google Generative AI | Gemini 1.5 Pro |
| Language | TypeScript | Type safety |
| Build | Turbopack | Fast bundler |

---

✅ Kiến trúc được thiết kế để dễ bảo trì, mở rộng, và hiểu rõ!

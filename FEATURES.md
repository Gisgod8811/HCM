# ✨ Các Tính Năng Chi Tiết

## 1. Gieo Quẻ Ngẫu Nhiên (Fortune Telling)

### Mô Tả
Khi nhấn nút "Rung Hũ Xăm", ứng dụng gọi AI để tạo một quẻ ngẫu nhiên.

### Cách Hoạt Động
1. Gửi request đến API `/api/fortune`
2. API gọi Gemini AI với System Prompt tiếng Việt
3. Gemini sinh ra dữ liệu quẻ ngẫu nhiên
4. Hiển thị trong Modal bao lì xì

### Quẻ Có Thể
- Quẻ Thượng Cát (Rất Tốt)
- Quẻ Trung Cát (Tốt)
- Quẻ Trung Bình (Bình Thường)
- Quẻ Hạ Cát (Cần Cẩn)
- Quẻ Hạ Huỷ (Khó Khăn)

Ví dụ thực tế:
```json
{
  "fortune": {
    "title": "Quẻ Thượng Cát - Vận Xui Đến Vận May",
    "poem": "Nắng mới ló dạo sáng sớm\nXua tan bóng tối đêm tối\nSức trẻ đầy tràn tim người\nNăng nong bước lên sao xa"
  }
}
```

## 2. Thơ Lục Bát Chúc Tết

### Mô Tả
Mỗi quẻ đi kèm với 4 câu thơ lục bát (6-8-6-8 âm) được viết riêng.

### Đặc Điểm
- **Định Dạng**: Lục bát truyền thống (6-8-6-8)
- **Chủ Đề**: Chúc Tết, Dự báo vận hạn vui vẻ
- **Ngôn Ngữ**: Tiếng Việt chuẩn mực, có vần
- **Nội Dung**: Liên quan trực tiếp đến quẻ

### Ví Dụ
```
Nắng mới ló dạo sáng sớm
Xua tan bóng tối đêm tối
Sức trẻ đầy tràn tim người
Năng nong bước lên sao xa
```

## 3. Lời Khuyên Từ Bác Hồ

### Mô Tả
Tích hợp Tư Tưởng Hồ Chí Minh - Mỗi quẻ có kèm 1 câu nói của Bác Hồ phù hợp.

### Cấu Trúc
```json
{
  "hcm_advice": {
    "quote": "Độc lập, tự do, hạnh phúc",
    "explanation": "Giải thích Why - tại sao câu nói này thích hợp",
    "keywords": ["Từ khóa 1", "Từ khóa 2"],
    "steps": ["Bước 1", "Bước 2", "Bước 3"]
  }
}
```

### Các Phần

#### 1️⃣ Trích Dẫn (Quote)
Một câu nói thật của Chủ tịch Hồ Chí Minh

Ví dụ:
- "Không có gì quý hơn độc lập, tự do"
- "Dân tộc chúng ta có một glorious history"
- "Kính thầy, yêu bạn, tin tưởng anh em"

#### 2️⃣ Giải Thích (Why/Explanation)
Giải thích ý nghĩa câu nói dưới góc nhìn:
- 🎯 **Thực Tiễn**: Áp dụng vào cuộc sống ngày nay
- 🎯 **Hiện Đại**: Relevance với thế hệ hiện tại
- 🎯 **Cá Nhân**: Liên hệ với quẻ của người dùng

Ví dụ:
```
"Câu nói này nhắc nhở chúng ta rằng, để thành công 
trong năm mới, phải dựa vào sức mình trước, không 
chờ đợi hay ỷ lại vào ai khác..."
```

#### 3️⃣ Từ Khóa (Keywords)
2-3 từ khóa định nghĩa essence của lời khuyên

Ví dụ:
- ["Tự Lực", "Vượt Khó"]
- ["Tương Thân Tương Ái", "Đoàn Kết"]
- ["Học Hành", "Kiên Trì"]

#### 4️⃣ 3 Bước Hành Động (Steps)
3 action items cụ thể để người dùng thực hiện

Ví dụ:
```
1. Xác định rõ mục tiêu của bạn trong năm nay
2. Lập kế hoạch chi tiết từ từng tuần, từng ngày
3. Thực hiện kiên trì, không sợ khó, không bỏ cuộc
```

## 4. Hiệu Ứng Lắc Hũ Xăm (Shake Animation)

### Mô Tả
Khi nhấn nút, hũ xăm (🏺) sẽ lắc lẻo như gieo quẻ thật.

### Kỹ Thuật
- **CSS Animation**: `@keyframes shake`
- **Duration**: 0.8s
- **Easing**: ease-in-out
- **Transform**: rotate + translateY

### Hiệu Ứng Chi Tiết
```
Bước 1: Quay -5°, lên 10px
Bước 2: Quay +5°, lên 15px (cao nhất)
Bước 3: Quay -5°, lên 10px
Bước 4: Về vị trí ban đầu
```

### Kích Hoạt
- Khi nhấn button "Rung Hũ Xăm"
- Lặp lại nếu nhấn lại lúc quẻ đang hiển thị

## 5. Modal Bao Lì Xì (Red Envelope Design)

### Mô Tả
Kết quả quẻ được hiển thị trong Modal thiết kế giống bao lì xì truyền thống.

### Thiết Kế
- **Màu Chính**: Đỏ (Red-600 to Red-700)
- **Viền**: Vàng (Yellow-400) - dây tóc
- **Logo**: Chữ "福" (Phúc - May mắn) màu vàng
- **Nội Dung**: Trắng, đọc dễ

### Cấu Trúc Modal
```
┌─────────────────────────────────┐
│ ╔═════════════════════════════╗ │  Envelope flap
│ ║                             ║ │
│ ║  ┌───────────────────┐      ║ │
│ ║  │                   │      ║ │  Golden seal
│ ║  │      福 (Phúc)    │      ║ │  with character
│ ║  │                   │      ║ │
│ ║  └───────────────────┘      ║ │
│ ║                             ║ │
│ ║  ┌─────────────────────┐    ║ │
│ ║  │   Content Area:     │    ║ │
│ ║  │                     │    ║ │
│ ║  │ • Tên quẻ          │    ║ │
│ ║  │ • Thơ lục bát      │    ║ │
│ ║  │ • Lời khuyên Bác   │    ║ │
│ ║  │ • Từ khóa          │    ║ │
│ ║  │ • 3 Bước thực hiện │    ║ │
│ ║  │ • Hình ảnh         │    ║ │
│ ║  │                     │    ║ │
│ ║  └─────────────────────┘    ║ │
│ ║                             ║ │
│ ║  [Đóng lại Button]          ║ │
│ ║                             ║ │
│ ╚═════════════════════════════╝ │
│                                 │
└─────────────────────────────────┘
```

### Responsive
- Mobile: 100% width - max-width
- Tablet: Scaled version
- Desktop: Fixed max-width 448px

## 6. Hình Ảnh May Mắn (Nano Banana Prompt)

### Mô Tả
Mỗi quẻ có kèm prompt để tạo ảnh minh họa qua Nano Banana.

### Prompt Structure
```
[Style Description] + [Content] + [Mood] + [Detail]
```

Ví Dụ:
```
"A ancient Vietnamese scholar focusing intently on 
reading ancient texts beside an oil lamp at night, 
modern Dong Ho style painting aesthetic, bright and 
auspicious colors, traditional paper art style, 
Vietnamese cultural elements"
```

### Yêu Cầu
- Tiếng Anh (để model hiểu tốt)
- Minh họa trực tiếp ý nghĩa quẻ
- Chi tiết về phong cách (Đông Hồ, traditional, modern, etc.)
- Cảm xúc (bright, auspicious, joyful, etc.)

## 7. Responsive Design

### Breakpoints
- **Mobile** (< 640px): Full viewport width
- **Tablet** (640px - 1024px): 90% width with padding
- **Desktop** (≥ 1024px): max-width 448px, centered

### Adaptive Styling
- Font sizes scale with viewport
- Padding adjusts for screen size
- Modal dimensions responsive
- Touch-friendly buttons

## 8. Loading State

### UX
1. Button text changes: "Rung Hũ Xăm" → "Đang gieo quẻ..."
2. Button disabled (cannot click again)
3. Shake animation plays
4. Waiting for API response...
5. Modal appears with results

### Timeout
- API call timeout: 60 seconds
- If longer, shows error message

## 9. Error Handling

### Possible Errors
1. **No API Key**: "NEXT_PUBLIC_GEMINI_API_KEY is not set"
2. **Network Error**: "Failed to generate fortune"
3. **API Error**: Status message from Gemini
4. **Parse Error**: "Invalid JSON response from API"

### User Experience
- Error message displayed in red box
- Helpful hint to check API key
- User can retry by clicking button again
- No modal shown on error

## 10. Browser Support

### Supported Browsers
- Chrome/Chromium (v90+)
- Firefox (v88+)
- Safari (v14+)
- Edge (v90+)

### Requirements
- JavaScript enabled
- CSS3 support
- Modern CSS Grid/Flexbox

---

📝 Tất cả tính năng được thiết kế để mang lại trải nghiệm 
Tết truyền thống kết hợp công nghệ hiện đại!

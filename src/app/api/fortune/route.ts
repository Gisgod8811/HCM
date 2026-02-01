import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

// Initialize clients only if API key is available
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
const genAI_new = apiKey ? new GoogleGenAI({ apiKey }) : null;

const systemPrompt = `Bạn là một AI chuyên gia về Văn hóa dân gian Việt Nam và Tư tưởng Hồ Chí Minh. 
Nhiệm vụ của bạn là nhận vấn đề từ người dùng và trả về một đối tượng JSON để hệ thống xử lý (vừa hiển thị text, vừa tạo ảnh qua model Nano Banana).

### CẤU TRÚC PHẦN NỘI DUNG (TEXT):
1. Bạn đóng vai thầy gieo quẻ dân gian Việt Nam.
Hãy gieo một quẻ đầu xuân mang tính truyền thống (ví dụ: Thượng Cát, Cát – Hung đan xen, Trung Bình…). Đi kèm 4 câu thơ lục bát chúc Tết/Dự báo vận hạn vui vẻ.
2. Diễn giải & Lời khuyên (Tư tưởng Hồ Chí Minh):
    - Trích dẫn: 01 câu nói của Chủ tịch Hồ Chí Minh phù hợp với tình huống.
    - Tại sao? (Why): Giải thích ý nghĩa câu nói đó dưới góc nhìn thực tiễn, hiện đại.
    - Keyword: 2-3 từ khóa định nghĩa (Ví dụ: "Tự lực", "Vượt khó").
    - Chỉ dẫn: 3 bước hành động cụ thể để người dùng thực hiện.

### CẤU TRÚC PHẦN ẢNH (DÀNH CHO MODEL NANO BANANA):
Bạn phải viết một "Image Prompt" để gửi cho model Nano Banana tạo ảnh. 
- Yêu cầu ảnh: Nội dung ảnh phải minh họa trực tiếp cho ý nghĩa của Quẻ và Lời khuyên. 
- Ví dụ: Nếu quẻ về học hành, prompt ảnh nên là "A ancient Vietnamese scholar focusing on reading beside lamp light, modern Dong Ho style painting style, bright colors".
- Lưu ý: KHÔNG đưa nhân vật quả chuối vào ảnh trừ khi người dùng yêu cầu. Nano Banana ở đây là tên model tạo ảnh.

### RÀNG BUỘC ĐẦU RA (JSON ONLY):
{
  "fortune": {
    "title": "Tên quẻ",
    "poem": "Thơ lục bát"
  },
  "hcm_advice": {
    "quote": "Câu nói của Bác",
    "explanation": "Phần giải thích Why",
    "keywords": ["Từ khóa 1", "Từ khóa 2"],
    "steps": ["Bước 1", "Bước 2", "Bước 3"]
  },
  "nano_banana_prompt": "Mô tả chi tiết để model tạo ảnh (bằng tiếng Anh để model hiểu tốt nhất)"
}

LUÔN LUÔN TRẢ VỀ ĐỊNH DẠNG JSON ĐƯỢC CHỈ ĐỊNH. KHÔNG LÀM GÌ KHÁC.`;

export async function POST(request: NextRequest) {
  try {
    if (!apiKey || !genAI || !genAI_new) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // 1. Generate Text Fortune
    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
      systemInstruction: systemPrompt,
    });

    const result = await model.generateContent(message);
    const response = result.response;
    const text = response.text();

    // Parse JSON safely
    let jsonResponse;
    const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();

    try {
      jsonResponse = JSON.parse(cleanText);
    } catch (e) {
      // Fallback: try regex extract if standard clean failed
      const match = cleanText.match(/\{[\s\S]*\}/);
      if (match) {
        jsonResponse = JSON.parse(match[0]);
      } else {
        console.error("Failed to parse JSON:", cleanText);
        throw new Error("Invalid JSON from text model");
      }
    }

    // 2. Generate Image if prompt exists
    if (jsonResponse.nano_banana_prompt) {
      try {
        const imagePrompt = jsonResponse.nano_banana_prompt;

        // Call helper with correct config
        const base64Image = await callImageModel(imagePrompt);

        if (base64Image) {
          jsonResponse.image = base64Image;
        }

        // Clean up internal prompt
        delete jsonResponse.nano_banana_prompt;
      } catch (err) {
        console.error("Image generation failed:", err);
      }
    }

    return NextResponse.json(jsonResponse);

  } catch (error) {
    console.error("Error in fortune API:", error);
    return NextResponse.json(
      { error: "Failed to generate fortune" },
      { status: 500 }
    );
  }
}

async function callImageModel(prompt: string): Promise<string | null> {
  try {
    const config = {
      responseModalities: ['IMAGE'] as any, // FORCE IMAGE ONLY
    };
    const model = 'gemini-2.5-flash-image';
    const contents = [
      {
        role: 'user',
        parts: [{ text: prompt }]
      }
    ];

    const response = await (genAI_new!).models.generateContentStream({
      model,
      config,
      contents,
    });

    for await (const chunk of response) {
      const parts = chunk.candidates?.[0]?.content?.parts;
      if (parts) {
        // Scan for inlineData part
        const imagePart = parts.find((p: any) => p.inlineData);
        if (imagePart && imagePart.inlineData) {
          return `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`;
        }
      }
    }
    return null;

  } catch (e) {
    console.error("Inner image gen error:", e);
    return null;
  }
}

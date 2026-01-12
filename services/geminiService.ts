
import { GoogleGenAI, Type } from "@google/genai";
import { Wisdom, Contemplation } from "../types";
import { WISDOM_REPOSITORY } from "../data/wisdomRepository";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const WISDOM_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    text: { type: Type.STRING, description: "The authentic Arabic quote/wisdom text." },
    author: { type: Type.STRING, description: "Name of the author or 'قائل مجهول'." },
    source: { type: Type.STRING, description: "The book, poem, or historical context of the quote." },
    moodColor: { type: Type.STRING, description: "A hex color code that reflects the mood of this wisdom." },
    category: { type: Type.STRING, description: "The thematic field (e.g., Philosophy, Literature, Sufism)." }
  },
  required: ["text", "author", "source", "moodColor", "category"],
};

const CONTEMPLATION_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    surfaceMeaning: { type: Type.STRING, description: "Simple explanation of the words." },
    deepMeaning: { type: Type.STRING, description: "The philosophical depth and hidden wisdom." },
    practicalApplication: { type: Type.STRING, description: "How to apply this wisdom in modern life." }
  },
  required: ["surfaceMeaning", "deepMeaning", "practicalApplication"],
};

/**
 * دالة للبحث السريع في المستودع المحلي بناءً على الكلمات المفتاحية
 */
const findLocalWisdom = (input: string): Wisdom | null => {
  const normalizedInput = input.toLowerCase();
  // كلمات مفتاحية بسيطة للربط السريع
  const matches = WISDOM_REPOSITORY.filter(w => 
    normalizedInput.includes(w.category?.toLowerCase() || '') ||
    w.text.includes(normalizedInput) ||
    w.author.includes(normalizedInput)
  );
  
  if (matches.length > 0) {
    // اختيار حكمة عشوائية من المتطابقات لضمان التنوع
    return matches[Math.floor(Math.random() * matches.length)];
  }
  return null;
};

export const summonWisdom = async (userInput: string): Promise<Wisdom> => {
  // المسار السريع: محاولة إيجاد حكمة محلية أولاً (استجابة فورية)
  const localMatch = findLocalWisdom(userInput);
  if (localMatch) {
    // تأخير بسيط لمحاكاة "التفكير" البصري دون إبطاء حقيقي
    await new Promise(resolve => setTimeout(resolve, 800));
    return localMatch;
  }

  // المسار العادي: استخدام الذكاء الاصطناعي (بدون أدوات بحث خارجية لزيادة السرعة)
  // تم إزالة googleSearch لأنه المسبب الرئيسي للبطء
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `
      Act as the 'Grand Arabic Oracle'. Use your internal knowledge of Arabic literature. 
      The user is feeling: "${userInput}".
      Retrieve one AUTHENTIC and DOCUMENTED Arabic wisdom.
      Return strictly JSON.
    `,
    config: {
      responseMimeType: "application/json",
      responseSchema: WISDOM_SCHEMA,
    },
  });

  try {
    const textOutput = response.text || '{}';
    return JSON.parse(textOutput) as Wisdom;
  } catch (error) {
    // في حال فشل الـ AI، نعود للمستودع المحلي كخيار آمن وسريع
    return WISDOM_REPOSITORY[Math.floor(Math.random() * WISDOM_REPOSITORY.length)];
  }
};

export const contemplateWisdom = async (wisdom: Wisdom): Promise<Contemplation> => {
  // تقليل حجم البرومبت لزيادة سرعة التوليد
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Examine: "${wisdom.text}" by ${wisdom.author}. Provide JSON: surfaceMeaning, deepMeaning, practicalApplication (in Arabic).`,
    config: {
      responseMimeType: "application/json",
      responseSchema: CONTEMPLATION_SCHEMA,
    },
  });

  try {
    return JSON.parse(response.text || '{}') as Contemplation;
  } catch (error) {
    throw new Error("تعذر سبر أغوار هذه الحكمة الآن.");
  }
};

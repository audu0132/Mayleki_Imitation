import express from "express";
import Product from "../models/Product.js";
import { GoogleGenAI } from "@google/genai";

const router = express.Router();

// Default fallback catalog if database is empty or not connected
const FALLBACK_PRODUCTS = [
  {
    _id: "fb_1",
    title: "Royal Kundan Bridal Set",
    slug: "royal-kundan-bridal-set",
    category: "bridal-sets",
    sellingPrice: 4500,
    rentalPrice: 800,
    isRentalAvailable: true,
    occasion: "Wedding",
    color: "Gold",
    material: "Kundan with Meenakari",
    description: "Exquisite Royal Kundan set featuring necklace, earrings, maang tikka, and bangles with intricate meenakari craftsmanship.",
    images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600"],
    rating: 4.9
  },
  {
    _id: "fb_2",
    title: "Traditional Kolhapuri Saaj",
    slug: "traditional-kolhapuri-saaj",
    category: "kolhapuri-saaj",
    sellingPrice: 2800,
    rentalPrice: 500,
    isRentalAvailable: true,
    occasion: "Festival",
    color: "Gold",
    material: "1GM Gold Plated",
    description: "Authentic Maharashtrian Kolhapuri Saaj crafted with 21 golden leaf beads depicting traditional emblems.",
    images: ["https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600"],
    rating: 4.8
  },
  {
    _id: "fb_3",
    title: "Antique Temple Nakshi Necklace",
    slug: "antique-temple-nakshi-necklace",
    category: "temple-jewellery",
    sellingPrice: 3800,
    rentalPrice: 650,
    isRentalAvailable: true,
    occasion: "Wedding",
    color: "Antique Gold",
    material: "Brass with 24K Antique Plating",
    description: "Divine Goddess Lakshmi motif temple necklace with ruby pink stones and pearl drops.",
    images: ["https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?w=600"],
    rating: 4.95
  },
  {
    _id: "fb_4",
    title: "American Diamond Emerald Choker",
    slug: "american-diamond-emerald-choker",
    category: "american-diamond",
    sellingPrice: 3200,
    rentalPrice: 600,
    isRentalAvailable: true,
    occasion: "Reception",
    color: "Emerald Green",
    material: "Rhodium Plated CZ Stones",
    description: "Sparkling zircon stone choker paired with emerald drops for cocktail & reception outfits.",
    images: ["https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=600"],
    rating: 4.85
  },
  {
    _id: "fb_5",
    title: "Maharashtrian Pearl & Ruby Nath",
    slug: "maharashtrian-pearl-ruby-nath",
    category: "nath",
    sellingPrice: 750,
    rentalPrice: 150,
    isRentalAvailable: true,
    occasion: "Wedding",
    color: "Pearl & Pink",
    material: "Basra Pearls & CZ",
    description: "Traditional Maharashtrian Brahmani Nath crafted with cultured seed pearls and ruby stones.",
    images: ["https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=600"],
    rating: 4.9
  },
  {
    _id: "fb_6",
    title: "Oxidised Tribal Statement Jhumkas",
    slug: "oxidised-tribal-statement-jhumkas",
    category: "oxidised",
    sellingPrice: 950,
    rentalPrice: 200,
    isRentalAvailable: true,
    occasion: "Garba / Sangeet",
    color: "Silver",
    material: "German Silver",
    description: "Handcrafted boho tribal oxidised silver jhumkas with ghungroo embellishments.",
    images: ["https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600"],
    rating: 4.7
  }
];

// Helper: Smart rule-based fallback generator
function generateRuleBasedAdvice({ prompt, occasion, outfitType, outfitColor, budget, lookingFor }, catalog) {
  const occasionText = occasion || "your special event";
  const outfitText = outfitType ? `${outfitColor || ""} ${outfitType}`.trim() : "your outfit";
  const colorText = outfitColor ? outfitColor.toLowerCase() : "";

  let matched = catalog.filter((p) => {
    if (lookingFor === "rent" && !p.isRentalAvailable) return false;
    if (budget && Number(budget) > 0) {
      const priceToCompare = lookingFor === "rent" ? (p.rentalPrice || p.sellingPrice) : p.sellingPrice;
      if (priceToCompare > Number(budget)) return false;
    }
    return true;
  });

  // Color harmony matching score
  if (colorText) {
    matched.sort((a, b) => {
      const scoreA = (a.color && a.color.toLowerCase().includes(colorText)) || (a.description && a.description.toLowerCase().includes(colorText)) ? 2 : 0;
      const scoreB = (b.color && b.color.toLowerCase().includes(colorText)) || (b.description && b.description.toLowerCase().includes(colorText)) ? 2 : 0;
      return scoreB - scoreA;
    });
  }

  if (matched.length === 0) matched = catalog.slice(0, 3);
  else matched = matched.slice(0, 4);

  const stylingAdvice = `For a ${occasionText} featuring ${outfitText}, contrast and metallic harmony are key! ` +
    (colorText.includes("red") || colorText.includes("maroon")
      ? "Pairing Kundan gold or Antique Temple Jewellery creates a majestic royal heritage look."
      : colorText.includes("green") || colorText.includes("teal")
      ? "American Diamond with Emerald accents or Gold Polki will create a striking contrast."
      : colorText.includes("pastel") || colorText.includes("pink")
      ? "Delicate Kundan with Pearl detailing or CZ Rhodium pieces will enhance the soft elegant tones."
      : "Traditional 1GM Gold or Kundan pieces match seamlessly with rich ethnic attire.");

  const stylingTips = [
    `Neckline pairing: Match high necklines with long haars/satlada, and sweetheart/v-necks with chokers.`,
    `Metal coordination: Maintain consistent metal finishes (e.g. all Antique Gold or all CZ Rhodium).`,
    `Rental flexibility: Consider renting heavy bridal sets for big occasions to save up to 80%!`
  ];

  return {
    success: true,
    advice: stylingAdvice,
    recommendedProducts: matched,
    stylingTips,
    source: "Mayleki Styling Engine"
  };
}

// @POST /api/ai/stylist
router.post("/stylist", async (req, res) => {
  try {
    const { prompt, occasion, outfitType, outfitColor, budget, lookingFor } = req.body;

    // Fetch database products if available
    let catalog = [];
    try {
      catalog = await Product.find({ isActive: true }).lean();
    } catch (e) {
      console.warn("Using fallback catalog for AI recommendations");
    }

    if (!catalog || catalog.length === 0) {
      catalog = FALLBACK_PRODUCTS;
    }

    // Check Gemini API Key
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === "your_gemini_api_key_here") {
      const fallbackResult = generateRuleBasedAdvice(req.body, catalog);
      return res.json(fallbackResult);
    }

    // Initialize Gemini API
    const ai = new GoogleGenAI({ apiKey });
    
    // Prepare catalog context for AI
    const simplifiedCatalog = catalog.map(p => ({
      id: p._id || p.slug,
      title: p.title,
      slug: p.slug,
      category: p.category,
      sellingPrice: p.sellingPrice,
      rentalPrice: p.rentalPrice,
      isRentalAvailable: p.isRentalAvailable,
      occasion: p.occasion,
      color: p.color,
      material: p.material,
      image: p.images && p.images.length ? p.images[0] : ""
    }));

    const systemInstruction = `You are Mayleki AI — a world-class Indian Royal Jewellery Stylist & Fashion Consultant.
Your task is to recommend matching jewellery sets from Mayleki's catalog based on user queries, occasion, outfit style, color, and budget.

Current Catalog Products:
${JSON.stringify(simplifiedCatalog, null, 2)}

Format your response strictly as JSON with this exact schema:
{
  "advice": "Warm, expert styling advice paragraph explaining color contrast, jewelry type (choker, long haar, jhumka), and aesthetic recommendations.",
  "recommendedProductIds": ["id1", "id2"], // 1 to 4 matching product IDs from catalog
  "stylingTips": [
    "Tip 1 regarding dupatta/neckline styling",
    "Tip 2 regarding hairstyle/earring pairing",
    "Tip 3 regarding rental/buy advice"
  ]
}`;

    const userMessage = prompt || `Occasion: ${occasion || "Any"}, Outfit: ${outfitColor || ""} ${outfitType || ""}, Budget: ₹${budget || "Any"}, Looking to: ${lookingFor || "all"}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        { role: "system", parts: [{ text: systemInstruction }] },
        { role: "user", parts: [{ text: userMessage }] }
      ],
      config: {
        responseMimeType: "application/json"
      }
    });

    const responseText = response.text;
    const parsed = JSON.parse(responseText);

    const recommendedProducts = catalog.filter(p => 
      parsed.recommendedProductIds?.includes(String(p._id)) || 
      parsed.recommendedProductIds?.includes(p.slug) ||
      parsed.recommendedProductIds?.includes(p.id)
    );

    const finalProducts = recommendedProducts.length > 0 ? recommendedProducts : catalog.slice(0, 3);

    return res.json({
      success: true,
      advice: parsed.advice,
      recommendedProducts: finalProducts,
      stylingTips: parsed.stylingTips || [
        "Select chokers for scoop/V-neck outfits.",
        "Renting allows high-end bridal pieces at a fraction of cost."
      ],
      source: "Gemini AI Stylist"
    });

  } catch (err) {
    console.error("AI Stylist Error:", err.message);
    // Fallback if AI call fails
    const fallbackResult = generateRuleBasedAdvice(req.body, FALLBACK_PRODUCTS);
    return res.json(fallbackResult);
  }
});

export default router;

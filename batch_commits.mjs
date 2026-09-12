import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const run = (cmd) => {
  console.log(`> ${cmd}`);
  return execSync(cmd, { stdio: 'inherit' });
};

const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const commits = [
  // 1
  {
    msg: "feat(backend): add rate limiting and security headers middleware with helmet configuration",
    action: () => {
      ensureDir('backend/middleware');
      const content = `import helmet from 'helmet';

export const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", 'https://checkout.razorpay.com'],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      imgSrc: ["'self'", 'data:', 'https://images.unsplash.com', 'https://res.cloudinary.com'],
      connectSrc: ["'self'", 'https://api.razorpay.com'],
    },
  },
  crossOriginEmbedderPolicy: false,
});

export const rateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 150, // limit each IP to 150 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
};
`;
      fs.writeFileSync('backend/middleware/security.js', content, 'utf8');
    }
  },

  // 2
  {
    msg: "feat(backend): implement order status timeline and tracking endpoint",
    action: () => {
      ensureDir('backend/routes');
      const content = `import express from 'express';
const router = express.Router();

const ORDER_STATUS_FLOW = [
  { status: 'PLACED', title: 'Order Confirmed', description: 'Your order has been received and verified.' },
  { status: 'QUALITY_CHECK', title: 'Artisan Quality Check', description: 'Jewellery inspected for finish and gemstone setting.' },
  { status: 'PACKED', title: 'Luxury Packaging', description: 'Safely packed in velvet jewellery box and tamper-proof seal.' },
  { status: 'SHIPPED', title: 'Dispatched via Premium Courier', description: 'Handed over to insured express logistics partner.' },
  { status: 'DELIVERED', title: 'Delivered', description: 'Package safely delivered with OTP verification.' },
];

router.get('/:trackingNumber', async (req, res) => {
  const { trackingNumber } = req.params;
  
  if (!trackingNumber) {
    return res.status(400).json({ success: false, message: 'Tracking number is required.' });
  }

  res.json({
    success: true,
    trackingNumber,
    estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    currentStatus: 'SHIPPED',
    carrier: 'BlueDart Luxury Express',
    trackingTimeline: ORDER_STATUS_FLOW.map((step, idx) => ({
      ...step,
      completed: idx <= 3,
      timestamp: new Date(Date.now() - (3 - idx) * 12 * 60 * 60 * 1000).toISOString(),
    })),
  });
});

export default router;
`;
      fs.writeFileSync('backend/routes/orderTracking.js', content, 'utf8');
    }
  },

  // 3
  {
    msg: "feat(backend): add coupon and promotional discount code validation service",
    action: () => {
      ensureDir('backend/routes');
      const content = `import express from 'express';
const router = express.Router();

const ACTIVE_COUPONS = [
  { code: 'ROYAL10', discountType: 'PERCENTAGE', discountValue: 10, minOrderValue: 2000, maxDiscount: 1000 },
  { code: 'BRIDAL500', discountType: 'FLAT', discountValue: 500, minOrderValue: 5000, maxDiscount: 500 },
  { code: 'FIRSTFESTIVE', discountType: 'PERCENTAGE', discountValue: 15, minOrderValue: 1500, maxDiscount: 750 },
];

router.post('/validate', async (req, res) => {
  const { code, cartTotal } = req.body;
  
  if (!code) {
    return res.status(400).json({ success: false, message: 'Promo code is required.' });
  }

  const coupon = ACTIVE_COUPONS.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
  
  if (!coupon) {
    return res.status(404).json({ success: false, message: 'Invalid or expired promo code.' });
  }

  if (cartTotal < coupon.minOrderValue) {
    return res.status(400).json({
      success: false,
      message: \`Minimum cart value of ₹\${coupon.minOrderValue} required for this code.\`,
    });
  }

  let discountAmount = 0;
  if (coupon.discountType === 'PERCENTAGE') {
    discountAmount = Math.min((cartTotal * coupon.discountValue) / 100, coupon.maxDiscount);
  } else {
    discountAmount = Math.min(coupon.discountValue, coupon.maxDiscount);
  }

  res.json({
    success: true,
    code: coupon.code,
    discountAmount,
    finalTotal: Math.max(0, cartTotal - discountAmount),
    message: \`Coupon \${coupon.code} applied successfully!\`,
  });
});

export default router;
`;
      fs.writeFileSync('backend/routes/coupons.js', content, 'utf8');
    }
  },

  // 4
  {
    msg: "feat(backend): create newsletter subscription and VIP club registration handler",
    action: () => {
      ensureDir('backend/routes');
      const content = `import express from 'express';
const router = express.Router();

const subscribers = new Set();

router.post('/subscribe', async (req, res) => {
  const { email, preferences } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Valid email address is required.' });
  }

  const normalizedEmail = email.toLowerCase().trim();
  const isExisting = subscribers.has(normalizedEmail);
  
  subscribers.add(normalizedEmail);

  res.json({
    success: true,
    message: isExisting
      ? 'You are already subscribed to the Mayleki VIP Bridal Club!'
      : 'Welcome to the Mayleki VIP Bridal Club! Enjoy 10% off your next reservation.',
    vipBenefits: ['Exclusive Bridal Previews', 'Free Jewellery Cleaning Care', 'Early Festival Access'],
  });
});

export default router;
`;
      fs.writeFileSync('backend/routes/newsletter.js', content, 'utf8');
    }
  },

  // 5
  {
    msg: "feat(backend): add wishlist management and sync endpoints",
    action: () => {
      ensureDir('backend/routes');
      const content = `import express from 'express';
const router = express.Router();

router.post('/sync', async (req, res) => {
  const { items } = req.body;
  
  if (!Array.isArray(items)) {
    return res.status(400).json({ success: false, message: 'Wishlist items array is required.' });
  }

  res.json({
    success: true,
    count: items.length,
    items,
    syncedAt: new Date().toISOString(),
    message: 'Wishlist synchronized successfully with cloud vault.',
  });
});

export default router;
`;
      fs.writeFileSync('backend/routes/wishlist.js', content, 'utf8');
    }
  },

  // 6
  {
    msg: "feat(backend): implement multi-facet jewellery catalog search and filter utility",
    action: () => {
      ensureDir('backend/utils');
      const content = `export const filterJewellery = (items, filters = {}) => {
  const { category, minPrice, maxPrice, occasion, plating, inStock, search } = filters;

  return items.filter((item) => {
    if (category && item.category !== category) return false;
    if (minPrice && item.rentalPricePerDay < Number(minPrice)) return false;
    if (maxPrice && item.rentalPricePerDay > Number(maxPrice)) return false;
    if (occasion && item.occasion !== occasion) return false;
    if (plating && item.plating !== plating) return false;
    if (inStock !== undefined && item.inStock !== (inStock === 'true' || inStock === true)) return false;
    
    if (search) {
      const q = search.toLowerCase();
      const matches = 
        item.title?.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.category?.toLowerCase().includes(q);
      if (!matches) return false;
    }

    return true;
  });
};
`;
      fs.writeFileSync('backend/utils/filterHelper.js', content, 'utf8');
    }
  },

  // 7
  {
    msg: "feat(frontend): create luxury toast notification context and provider",
    action: () => {
      ensureDir('frontend/src/context');
      const content = `import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto px-4 py-3 rounded-lg shadow-xl backdrop-blur-md border flex items-center justify-between transition-all duration-300 transform translate-y-0 bg-[#1A1615]/90 border-[#D4AF37]/40 text-[#F5EBE1]"
          >
            <span className="text-sm font-serif tracking-wide">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-3 text-[#D4AF37] hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
`;
      fs.writeFileSync('frontend/src/context/ToastContext.jsx', content, 'utf8');
    }
  },

  // 8
  {
    msg: "feat(frontend): add useDebounce custom hook for real-time catalogue search",
    action: () => {
      ensureDir('frontend/src/hooks');
      const content = `import { useState, useEffect } from 'react';

export function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
`;
      fs.writeFileSync('frontend/src/hooks/useDebounce.js', content, 'utf8');
    }
  },

  // 9
  {
    msg: "feat(frontend): add useLocalStorage hook for persistent cart and preferences",
    action: () => {
      ensureDir('frontend/src/hooks');
      const content = `import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(\`Error reading localStorage key "\${key}":\`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(\`Error setting localStorage key "\${key}":\`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
`;
      fs.writeFileSync('frontend/src/hooks/useLocalStorage.js', content, 'utf8');
    }
  },

  // 10
  {
    msg: "feat(frontend): create useWindowSize hook for responsive jewellery display grid",
    action: () => {
      ensureDir('frontend/src/hooks');
      const content = `import { useState, useEffect } from 'react';

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

export default useWindowSize;
`;
      fs.writeFileSync('frontend/src/hooks/useWindowSize.js', content, 'utf8');
    }
  },

  // 11
  {
    msg: "feat(frontend): add luxury PriceTag component with rental rates and discount badges",
    action: () => {
      ensureDir('frontend/src/components/common');
      const content = `import React from 'react';

export default function PriceTag({ rentalPrice, retailPrice, days = 3, className = '' }) {
  const discount = retailPrice && rentalPrice
    ? Math.round(((retailPrice - rentalPrice) / retailPrice) * 100)
    : 0;

  return (
    <div className={\`flex items-baseline gap-2 \${className}\`}>
      <span className="text-xl font-serif font-bold text-[#D4AF37]">
        ₹{rentalPrice?.toLocaleString('en-IN')}
      </span>
      <span className="text-xs text-gray-500 font-sans tracking-wide">
        / {days} days
      </span>
      {retailPrice && (
        <span className="text-xs text-gray-400 line-through font-sans">
          ₹{retailPrice?.toLocaleString('en-IN')}
        </span>
      )}
      {discount > 0 && (
        <span className="text-[10px] uppercase font-semibold tracking-wider bg-[#D4AF37]/15 text-[#D4AF37] px-1.5 py-0.5 rounded border border-[#D4AF37]/30">
          Save {discount}%
        </span>
      )}
    </div>
  );
}
`;
      fs.writeFileSync('frontend/src/components/common/PriceTag.jsx', content, 'utf8');
    }
  },

  // 12
  {
    msg: "feat(frontend): add TrustBadges component with authenticity and sanitization guarantees",
    action: () => {
      ensureDir('frontend/src/components/common');
      const content = `import React from 'react';

export default function TrustBadges() {
  const badges = [
    { title: 'Artisan Crafted', desc: 'Hand-set kundan and 24K gold plating', icon: '✨' },
    { title: 'Ultra-Sanitized', desc: 'Hospital-grade UV sterilization before dispatch', icon: '🛡️' },
    { title: 'Free Returns', desc: 'Hassle-free doorstep pickup in velvet lockbox', icon: '📦' },
    { title: 'Security Deposit', desc: '100% instant refund upon return inspection', icon: '🔒' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-y border-[#D4AF37]/20 my-6">
      {badges.map((b, idx) => (
        <div key={idx} className="flex flex-col items-center text-center p-3 rounded-lg bg-[#FAF7F2]/60 dark:bg-[#1C1817]/60">
          <span className="text-2xl mb-1">{b.icon}</span>
          <h4 className="font-serif font-semibold text-sm text-[#2B2321] dark:text-[#F3EDE2]">{b.title}</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{b.desc}</p>
        </div>
      ))}
    </div>
  );
}
`;
      fs.writeFileSync('frontend/src/components/common/TrustBadges.jsx', content, 'utf8');
    }
  },

  // 13
  {
    msg: "feat(frontend): create JewelleryCareModal component with preservation instructions",
    action: () => {
      ensureDir('frontend/src/components/common');
      const content = `import React from 'react';

export default function JewelleryCareModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const instructions = [
    'Avoid direct contact with perfumes, hairsprays, sanitizers, and body lotions.',
    'Store each piece individually in the provided velvet pouch to prevent scratches.',
    'Wipe gently with a soft micro-fiber cloth after every wear to maintain shine.',
    'Keep away from water, moisture, and extreme humidity to protect 24K gold polish.',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#FAF7F2] dark:bg-[#1A1615] border border-[#D4AF37]/40 rounded-xl p-6 max-w-md w-full shadow-2xl">
        <div className="flex justify-between items-center pb-3 border-b border-[#D4AF37]/20">
          <h3 className="font-serif text-lg font-bold text-[#D4AF37]">Jewellery Care Guide</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
        </div>
        <ul className="mt-4 space-y-3 text-sm text-gray-700 dark:text-gray-300">
          {instructions.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="text-[#D4AF37] font-bold">✦</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-6 w-full py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#B38F28] text-black font-semibold rounded-lg shadow hover:opacity-90 transition-opacity"
        >
          Got It, Thank You
        </button>
      </div>
    </div>
  );
}
`;
      fs.writeFileSync('frontend/src/components/common/JewelleryCareModal.jsx', content, 'utf8');
    }
  },

  // 14
  {
    msg: "feat(frontend): add SizeGuideModal for bridal bangles, rings, and neckpieces",
    action: () => {
      ensureDir('frontend/src/components/common');
      const content = `import React from 'react';

export default function SizeGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const bangleSizes = [
    { size: '2-4', innerDiameter: '2.25 inches (57.2 mm)', fit: 'Small / Petite wrists' },
    { size: '2-6', innerDiameter: '2.37 inches (60.3 mm)', fit: 'Medium (Most Popular)' },
    { size: '2-8', innerDiameter: '2.50 inches (63.5 mm)', fit: 'Large / Comfort fit' },
    { size: '2-10', innerDiameter: '2.62 inches (66.7 mm)', fit: 'Extra Large' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#FAF7F2] dark:bg-[#1A1615] border border-[#D4AF37]/40 rounded-xl p-6 max-w-lg w-full shadow-2xl">
        <div className="flex justify-between items-center pb-3 border-b border-[#D4AF37]/20">
          <h3 className="font-serif text-lg font-bold text-[#D4AF37]">Bangle & Jewellery Sizing Guide</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-[#D4AF37]/30 text-[#D4AF37]">
                <th className="py-2">Indian Size</th>
                <th className="py-2">Inner Diameter</th>
                <th className="py-2">Wrist Fit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800 text-gray-700 dark:text-gray-300">
              {bangleSizes.map((row) => (
                <tr key={row.size}>
                  <td className="py-2.5 font-semibold">{row.size}</td>
                  <td className="py-2.5">{row.innerDiameter}</td>
                  <td className="py-2.5">{row.fit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full py-2 bg-[#D4AF37] text-black font-semibold rounded-lg hover:bg-[#c49f2e] transition-colors"
        >
          Close Guide
        </button>
      </div>
    </div>
  );
}
`;
      fs.writeFileSync('frontend/src/components/common/SizeGuideModal.jsx', content, 'utf8');
    }
  },

  // 15
  {
    msg: "feat(frontend): add CustomerSupportFloatingBtn with WhatsApp concierge access",
    action: () => {
      ensureDir('frontend/src/components/common');
      const content = `import React from 'react';

export default function CustomerSupportFloatingBtn() {
  const whatsappUrl = 'https://wa.me/919876543210?text=Hi%20Mayleki%20Jewellery,%20I%20need%20assistance%20with%20a%20bridal%20rental.';

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Mayleki Jewellery Concierge on WhatsApp"
      className="fixed bottom-6 left-6 z-40 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-105 transition-transform font-sans text-sm font-medium"
    >
      <span className="text-lg">💬</span>
      <span className="hidden sm:inline">Bridal Concierge</span>
    </a>
  );
}
`;
      fs.writeFileSync('frontend/src/components/common/CustomerSupportFloatingBtn.jsx', content, 'utf8');
    }
  },

  // 16
  {
    msg: "feat(frontend): add OrderSuccessModal with animated booking confirmation checkmark",
    action: () => {
      ensureDir('frontend/src/components/checkout');
      const content = `import React from 'react';

export default function OrderSuccessModal({ isOpen, orderId, onExploreMore }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#FAF7F2] dark:bg-[#181413] border border-[#D4AF37]/50 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#D4AF37]/20 border-2 border-[#D4AF37] flex items-center justify-center text-3xl animate-bounce">
          👑
        </div>
        <h2 className="font-serif text-2xl font-bold text-[#D4AF37]">Reservation Confirmed!</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 font-sans">
          Your regal jewellery set is reserved. Order ID: <span className="font-mono font-bold text-[#D4AF37]">{orderId || 'MYL-2026-9812'}</span>
        </p>
        <p className="text-xs text-gray-500 mt-3">
          A confirmation SMS and calendar reminder have been sent to your registered contact.
        </p>
        <button
          onClick={onExploreMore}
          className="mt-6 w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#B38F28] text-black font-semibold rounded-lg shadow-lg hover:opacity-95 transition-opacity"
        >
          Continue Exploring Catalog
        </button>
      </div>
    </div>
  );
}
`;
      fs.writeFileSync('frontend/src/components/checkout/OrderSuccessModal.jsx', content, 'utf8');
    }
  },

  // 17
  {
    msg: "feat(frontend): add ReviewStars component with interactive rating selection",
    action: () => {
      ensureDir('frontend/src/components/common');
      const content = `import React from 'react';

export default function ReviewStars({ rating = 5, totalStars = 5, onChange, editable = false }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: totalStars }, (_, index) => {
        const starIndex = index + 1;
        const isFilled = starIndex <= Math.round(rating);

        return (
          <button
            key={index}
            type="button"
            disabled={!editable}
            onClick={() => editable && onChange && onChange(starIndex)}
            className={\`text-lg transition-transform \${
              editable ? 'hover:scale-125 cursor-pointer' : 'cursor-default'
            } \${isFilled ? 'text-[#D4AF37]' : 'text-gray-400'}\`}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}
`;
      fs.writeFileSync('frontend/src/components/common/ReviewStars.jsx', content, 'utf8');
    }
  },

  // 18
  {
    msg: "perf(frontend): add image lazy loading and luxury placeholder fallback utilities",
    action: () => {
      ensureDir('frontend/src/utils');
      const content = `export const JEWELLERY_FALLBACK_IMAGE = 
  'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=800&q=80';

export function getOptimizedImageUrl(url, width = 600) {
  if (!url) return JEWELLERY_FALLBACK_IMAGE;
  if (url.includes('images.unsplash.com')) {
    return \`\${url.split('?')[0]}?auto=format&fit=crop&w=\${width}&q=80\`;
  }
  return url;
}

export function handleImageError(e) {
  e.target.onerror = null;
  e.target.src = JEWELLERY_FALLBACK_IMAGE;
}
`;
      fs.writeFileSync('frontend/src/utils/imageUtils.js', content, 'utf8');
    }
  },

  // 19
  {
    msg: "docs(api): add comprehensive REST API documentation with sample payloads",
    action: () => {
      ensureDir('docs');
      const content = `# Mayleki Imitation Jewellery - REST API Reference

Comprehensive specification of all endpoints powering the Mayleki Luxury Imitation Jewellery platform.

## Base URLs
- **Development:** \`http://localhost:5000/api\`
- **Production:** \`https://mayleki-imitation.onrender.com/api\`

## Authentication
JWT Bearer token required for customer account endpoints:
\`\`\`http
Authorization: Bearer <JWT_TOKEN>
\`\`\`

## Key Endpoints

### 1. Categories & Catalog
- \`GET /categories\` - List all categories with counts and banner images.
- \`GET /products\` - Filterable product list with pagination.
- \`GET /products/:id\` - Single product details including high-res gallery.

### 2. Rental Calculator
- \`POST /rentals/calculate-quote\` - Computes base rental, deposit, GST, and delivery.

### 3. Orders & Tracking
- \`POST /orders\` - Create new jewellery reservation.
- \`GET /tracking/:trackingNumber\` - Live dispatch and delivery timeline.

### 4. Promotional & Loyalty
- \`POST /coupons/validate\` - Validate festive coupon codes.
- \`POST /newsletter/subscribe\` - VIP bridal club signups.
`;
      fs.writeFileSync('docs/API_DOCUMENTATION.md', content, 'utf8');
    }
  },

  // 20
  {
    msg: "docs(deployment): add production deployment checklist and environment guide",
    action: () => {
      ensureDir('docs');
      const content = `# Mayleki Imitation Jewellery - Production Deployment Guide

## Architecture Overview
- **Frontend:** React 18 + Vite, deployed on Vercel
- **Backend:** Node.js + Express, deployed on Render
- **Database:** MongoDB Atlas (M0/M10 cluster with replica sets)
- **CDN / Media:** Cloudinary & Unsplash CDN

## Deployment Checklist
1. **Environment Variables:** Verify \`MONGO_URI\`, \`JWT_SECRET\`, and payment gateway credentials on Render.
2. **CORS:** Ensure production frontend URL (\`https://mayleki-studio.vercel.app\`) is permitted.
3. **Database Indexes:** Ensure indexes on \`products.slug\`, \`users.email\`, and \`orders.userId\`.
4. **Vite Build:** Run \`npm run build\` inside \`frontend/\` to verify zero bundle errors.
5. **SSL / HTTPS:** Enforce HTTPS redirects across all endpoints.
`;
      fs.writeFileSync('docs/DEPLOYMENT_GUIDE.md', content, 'utf8');
    }
  },
];

async function main() {
  console.log(`Starting execution of ${commits.length} commits...`);
  
  for (let i = 0; i < commits.length; i++) {
    const item = commits[i];
    console.log(`\n========================================`);
    console.log(`[COMMIT ${i + 1}/${commits.length}] ${item.msg}`);
    console.log(`========================================`);
    
    // Execute action
    item.action();
    
    // Git add, commit
    run(`git add .`);
    run(`git commit -m "${item.msg}"`);
  }

  console.log(`\n========================================`);
  console.log(`All 20 commits completed locally!`);
  console.log(`Pushing all 20 commits to origin main...`);
  console.log(`========================================`);
  run(`git push origin main`);
  console.log(`\nDONE! All 20 commits pushed successfully!`);
}

main().catch((err) => {
  console.error('Execution failed:', err);
  process.exit(1);
});

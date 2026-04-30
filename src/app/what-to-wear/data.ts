/**
 * What to Wear Quiz — questions, recommendation maps, and engine.
 *
 * Pure data + a single getRecommendations() function. No React, no DOM.
 * Imported by QuizClient.tsx.
 */

export type AnswerKey = 'sessionType' | 'style' | 'confidence' | 'vibe' | 'skinTone'
export type Answers = Record<AnswerKey, string>

export interface Question {
  key: AnswerKey
  title: string
  subtitle: string
  options: { value: string; label: string; desc: string }[]
}

export const questions: Question[] = [
  {
    key: 'sessionType',
    title: 'What kind of session are we doing?',
    subtitle: "Let's start with the basics.",
    options: [
      { value: 'headshots', label: 'Headshots / Corporate Portraits', desc: 'Professional, polished, confident' },
      { value: 'family', label: 'Family Session', desc: 'Connection, warmth, real moments' },
      { value: 'couples', label: 'Couples Session', desc: 'Romance, intimacy, the two of you' },
      { value: 'seniors', label: 'Senior Portraits', desc: 'Your year, your story, your senior moment' },
      { value: 'branding', label: 'Personal Branding / Creative Editorial', desc: 'Bold, magnetic, unmistakably you' },
      { value: 'unsure', label: 'Not sure yet', desc: "That's okay. We'll figure it out together." },
    ],
  },
  {
    key: 'style',
    title: 'How would you describe your everyday style?',
    subtitle: 'Pick the one that feels most like you.',
    options: [
      { value: 'casual', label: 'Casual & Relaxed', desc: 'Jeans, comfort, laid-back vibes' },
      { value: 'classic', label: 'Classic & Timeless', desc: 'Neutral colors, quality basics, elegant' },
      { value: 'trendy', label: 'Trendy & Modern', desc: 'Current fashion, fashion-forward, experimental' },
      { value: 'minimal', label: 'Minimal & Clean', desc: 'Simple, understated, intentional' },
      { value: 'eclectic', label: 'Eclectic & Bold', desc: 'Unique, artistic, lots of personality' },
    ],
  },
  {
    key: 'confidence',
    title: 'How do you want to feel in front of the camera?',
    subtitle: 'Honesty wins here.',
    options: [
      { value: 'myself', label: 'Comfortable and like myself', desc: 'Just me, on a good day' },
      { value: 'powerful', label: 'Confident and powerful', desc: 'Strong, capable, sure of myself' },
      { value: 'romantic', label: 'Beautiful and romantic', desc: 'Soft, dreamy, feminine' },
      { value: 'creative', label: 'Creative and artistic', desc: 'Interesting, unconventional, expressive' },
      { value: 'standout', label: 'I want to stand out and make a statement', desc: "Don't blend in. Be seen." },
      { value: 'nervous', label: "Honestly, I'm nervous and just want to feel good", desc: "I see you. We've got this." },
    ],
  },
  {
    key: 'vibe',
    title: "What's the vibe you want to bring?",
    subtitle: 'How do you want people to feel when they see your photos?',
    options: [
      { value: 'approachable', label: 'Approachable and friendly', desc: 'Warm, relatable, genuine' },
      { value: 'professional', label: 'Powerful and professional', desc: 'Authoritative, competent, strong' },
      { value: 'romantic', label: 'Romantic and soft', desc: 'Dreamy, feminine, romantic' },
      { value: 'artistic', label: 'Artistic and creative', desc: 'Unconventional, interesting, unique' },
      { value: 'playful', label: 'Fun and playful', desc: 'Light, energetic, joyful' },
      { value: 'grounded', label: 'Grounded and authentic', desc: 'Real, unpretentious, genuine' },
    ],
  },
  {
    key: 'skinTone',
    title: 'What works best with your skin tone?',
    subtitle: 'This helps me suggest colors that photograph beautifully on YOU.',
    options: [
      { value: 'fair', label: 'Fair / Light', desc: 'Burns easily, cool or warm undertones' },
      { value: 'medium', label: 'Medium', desc: 'Olive, golden, or neutral undertones' },
      { value: 'deep', label: 'Deep / Dark', desc: 'Rich, warm, or cool undertones' },
      { value: 'unsure', label: "I'm not sure", desc: "No worries. I'll give you universal options." },
    ],
  },
]

// ── Color palettes by skin tone (these are CLOTHING color suggestions, not brand) ─
interface ColorSuggestion {
  name: string
  hex: string
  why: string
}
interface ColorSet {
  primary: ColorSuggestion
  secondary: ColorSuggestion
  accent: ColorSuggestion
}

const colorMap: Record<string, ColorSet> = {
  fair: {
    primary: { name: 'Warm Cream', hex: '#F1E5D1', why: 'Softens your features and photographs like sunlight on skin. Avoids the wash-out you get from pure white.' },
    secondary: { name: 'Dusty Rose', hex: '#C9A09E', why: 'A romantic complement that adds warmth without overpowering your natural tones.' },
    accent: { name: 'Soft Gold', hex: '#C9A961', why: 'Gold jewelry feels natural against your skin and catches light beautifully on camera.' },
  },
  medium: {
    primary: { name: 'Camel', hex: '#B08D5A', why: 'Rich, warm, and works in harmony with your undertones. Photographs incredibly elegant.' },
    secondary: { name: 'Olive Green', hex: '#7A8466', why: 'Earthy and sophisticated. Adds depth without competing with your natural glow.' },
    accent: { name: 'Brushed Bronze', hex: '#A57452', why: 'Warmer than gold, more interesting than silver. Feels intentional and modern.' },
  },
  deep: {
    primary: { name: 'Rich Burgundy', hex: '#7A2E3A', why: 'Jewel tones photograph stunning on deeper skin. This adds drama and richness in the best way.' },
    secondary: { name: 'Cream', hex: '#F3EDE5', why: 'High contrast equals high impact. Cream against your skin is editorial and timeless.' },
    accent: { name: 'Polished Gold', hex: '#D4A95A', why: 'Gold against deeper skin tones is iconic. Lean into it with hoops, layered chains, or a statement piece.' },
  },
  unsure: {
    primary: { name: 'Warm Cream', hex: '#F3EDE5', why: 'Universally flattering. Soft on camera and works with almost every skin tone.' },
    secondary: { name: 'Dusty Terracotta', hex: '#B47B65', why: 'A warm earth tone that photographs richly on most complexions.' },
    accent: { name: 'Brushed Gold', hex: '#C9A961', why: 'A safe, beautiful choice that elevates without competing with your face.' },
  },
}

// ── Outfit recommendations by session × style ─────────────────────────────────
interface Outfit {
  top: string
  bottom: string
  accessories: string
  why: string
  /**
   * Optional ShopMy collection URL — when present, the outfit card renders a
   * "Shop this look" button. Leave undefined until the collection is curated.
   * Format: https://shopmy.us/collections/{id}
   */
  shopMyUrl?: string
}

type StyleKey = 'casual' | 'classic' | 'trendy' | 'minimal' | 'eclectic'
type SessionKey = 'headshots' | 'family' | 'couples' | 'branding'
// 'seniors' and 'unsure' fall back to one of the above via a session-key resolver.

const outfitsBySession: Record<SessionKey, Record<StyleKey, Outfit[]>> = {
  headshots: {
    casual: [
      { top: 'Soft cream knit sweater', bottom: 'Dark wash straight-leg jeans', accessories: 'Small gold hoops, neutral leather watch', why: 'Polished but never stiff. The knit moves with you and reads professional without feeling corporate.', shopMyUrl: 'https://shopmy.us/shop/collections/5043621' },
      { top: 'Crisp linen button-up in oat or sand', bottom: 'Tailored camel trousers', accessories: 'Delicate gold necklace, simple stud earrings', why: 'Linen photographs like a dream. Texture, movement, and natural light play beautifully.', shopMyUrl: 'https://shopmy.us/shop/collections/5043665' },
      { top: 'Fitted ivory tee under an open neutral blazer', bottom: 'Dark trousers or dark jeans', accessories: 'Layered fine gold chains', why: 'Layers add dimension on camera. The blazer means business; the tee keeps it human.' },
    ],
    classic: [
      { top: 'Cream silk blouse', bottom: 'Tailored navy trousers', accessories: 'Pearl studs or small gold hoops, classic watch', why: 'Timeless, polished, and lets your face be the focal point. Navy grounds you and reads serious without being severe.', shopMyUrl: 'https://shopmy.us/shop/collections/5042842' },
      { top: 'Camel turtleneck (lightweight)', bottom: 'Cream wide-leg trousers', accessories: 'Gold knot earrings, simple bracelet stack', why: 'Tonal dressing photographs incredibly editorial. You look elevated without trying.', shopMyUrl: 'https://shopmy.us/shop/collections/5043566' },
      { top: 'White button-up under a black blazer', bottom: 'Black tailored trousers or pencil skirt', accessories: 'Small pearl studs, delicate gold necklace', why: 'The classic for a reason. Sharp, confident, and never goes out of style.' },
    ],
    trendy: [
      { top: 'Oversized cream blazer over a fitted tank', bottom: 'Wide-leg trousers in chocolate or black', accessories: 'Chunky gold hoops, statement watch', why: 'Modern silhouette, confident energy. Photographs current without being trendy in a way that ages.', shopMyUrl: 'https://shopmy.us/shop/collections/5043706' },
      { top: 'Cropped knit in a warm neutral', bottom: 'High-waisted tailored trousers', accessories: 'Layered gold chains, sleek pointed flats', why: 'Fashion-forward but flattering. The proportions photograph beautifully.' },
      { top: 'Silk slip top in cream or champagne', bottom: 'Tailored leather-look trousers', accessories: 'Bold gold cuff, structured leather bag', why: 'Texture contrast equals visual interest. Soft silk against structured trousers reads expensive.' },
    ],
    minimal: [
      { top: 'Cream cashmere or fine knit crewneck', bottom: 'Tailored cream or stone trousers', accessories: 'One delicate gold piece, nothing else', why: 'Quiet luxury. The simplicity puts you front and center, exactly where you should be.', shopMyUrl: 'https://shopmy.us/shop/collections/5042936' },
      { top: 'Crisp white tee (fitted, high-quality)', bottom: 'Tailored black trousers', accessories: 'Simple gold studs, minimal watch', why: 'Stripped back on purpose. This says "confident in who I am" louder than any pattern could.', shopMyUrl: 'https://shopmy.us/shop/collections/5043120' },
      { top: 'Stone-colored linen button-up', bottom: 'Dark wash straight-leg jeans', accessories: 'Single gold pendant, simple ring', why: 'Effortless and intentional. Reads polished without trying too hard.', shopMyUrl: 'https://shopmy.us/shop/collections/5043665' },
    ],
    eclectic: [
      { top: 'Burgundy silk blouse with subtle drape', bottom: 'Camel wide-leg trousers', accessories: 'Vintage gold earrings, statement ring', why: 'Personality without chaos. The rich color photographs gorgeous and shows you have a point of view.', shopMyUrl: 'https://shopmy.us/shop/collections/5043232' },
      { top: 'Textured cream knit with interesting neckline', bottom: 'Olive or rust trousers', accessories: 'Mixed metal jewelry, unique watch or cuff', why: 'You bring the personality, the outfit just supports it. The texture adds depth on camera.' },
      { top: 'Vintage-inspired button-up in a warm tone', bottom: 'Tailored trousers in chocolate or black', accessories: 'Layered jewelry that feels collected, not curated', why: "You look like yourself, just elevated. That's the goal." },
    ],
  },
  family: {
    casual: [
      { top: 'Soft cream knit sweater', bottom: 'Dark wash jeans or cream pants', accessories: 'Simple gold studs, comfortable shoes', why: "You'll be moving, laughing, chasing kids. This works for all of it and still photographs beautifully.", shopMyUrl: 'https://shopmy.us/shop/collections/5043621' },
      { top: 'Linen button-up over a fitted tank', bottom: 'Light wash jeans rolled at the ankle', accessories: 'Small hoops, simple bracelet', why: 'Relaxed but pulled together. The linen catches light gorgeously in outdoor sessions.', shopMyUrl: 'https://shopmy.us/shop/collections/5043665' },
      { top: 'Cozy oatmeal cardigan over cream tee', bottom: 'Camel or stone pants', accessories: 'Stacked delicate rings, simple necklace', why: 'Warm and approachable. You look like the mom everyone wants to hug.' },
    ],
    classic: [
      { top: 'Cream cable-knit sweater', bottom: 'Dark wash straight-leg jeans', accessories: 'Pearl studs, classic watch', why: 'Timeless family photo energy. This will look just as good in 20 years as it does today.', shopMyUrl: 'https://shopmy.us/shop/collections/5043621' },
      { top: 'Soft camel turtleneck', bottom: 'Cream or stone wide-leg pants', accessories: 'Gold hoops, delicate necklace', why: 'Elevated but soft. Family photos should feel warm, not stiff. This hits both.', shopMyUrl: 'https://shopmy.us/shop/collections/5043566' },
      { top: 'White button-up tucked into trousers', bottom: 'Camel trousers or dark jeans', accessories: 'Small gold studs, simple bracelet', why: 'Classic for a reason. Photographs beautifully and never goes out of style.' },
    ],
    trendy: [
      { top: 'Oversized cream knit', bottom: 'Wide-leg jeans or trousers in a warm neutral', accessories: 'Gold hoops, layered necklaces', why: "Modern proportions photograph editorial. You'll look current without trying too hard." },
      { top: 'Fitted bodysuit in cream or rust under an open cardigan', bottom: 'High-waisted wide-leg jeans', accessories: 'Chunky gold earrings, ankle boots', why: 'Fashion-forward family vibes. The silhouette photographs flattering and modern.' },
      { top: 'Silk-blend blouse in dusty rose or champagne', bottom: 'Tailored trousers in a warm neutral', accessories: 'Statement earrings, simple bracelet', why: 'Soft and elevated. Photographs like a magazine spread.' },
    ],
    minimal: [
      { top: 'Cream cashmere crewneck', bottom: 'Cream or stone wide-leg trousers', accessories: 'One small gold piece', why: 'Tonal dressing for a family looks incredibly editorial. Lets the connection between you all be the focus.', shopMyUrl: 'https://shopmy.us/shop/collections/5042936' },
      { top: 'Simple white tee (high-quality, fitted)', bottom: 'Dark wash jeans', accessories: 'Delicate gold necklace, simple studs', why: "Stripped back on purpose. Family photos shine when there's nothing competing with the people in them.", shopMyUrl: 'https://shopmy.us/shop/collections/5043120' },
      { top: 'Oatmeal linen button-up', bottom: 'Cream pants', accessories: 'Single delicate piece', why: 'Effortless and warm. Photographs like soft natural light in clothing form.', shopMyUrl: 'https://shopmy.us/shop/collections/5043665' },
    ],
    eclectic: [
      { top: 'Burgundy or rust knit sweater', bottom: 'Camel or olive pants', accessories: 'Vintage-feeling jewelry, layered pieces', why: 'Personality and warmth. Family photos with character age beautifully.' },
      { top: 'Textured cream sweater with interesting detail', bottom: 'Dark wash jeans', accessories: 'Mixed metal jewelry, unique earrings', why: "You look like yourself. That's what your family needs to remember." },
      { top: 'Patterned blouse in muted earth tones (only if subtle)', bottom: 'Solid cream or camel pants', accessories: 'Statement earrings or ring', why: 'One pattern done right, surrounded by solids. Adds interest without chaos.' },
    ],
  },
  couples: {
    casual: [
      { top: 'Soft cream knit', bottom: 'Dark wash jeans', accessories: 'Delicate gold necklace, simple studs', why: 'Soft, approachable, romantic without trying too hard. Perfect for connection-focused photos.', shopMyUrl: 'https://shopmy.us/shop/collections/5043621' },
      { top: 'Linen button-up in oat or sand', bottom: 'Camel or cream pants', accessories: 'Small hoops, layered fine chains', why: 'Linen on couples photographs unbelievably romantic. The texture and movement read like a film still.', shopMyUrl: 'https://shopmy.us/shop/collections/5043665' },
      { top: 'Fitted cream tee under an open cardigan', bottom: 'Dark wash jeans', accessories: 'Simple gold pieces', why: 'Cozy and intimate. You look like you actually like each other (which is the whole point).' },
    ],
    classic: [
      { top: 'Cream silk blouse', bottom: 'Camel trousers or cream pants', accessories: 'Pearl studs, delicate necklace', why: 'Timeless and romantic. These photos will look beautiful framed in your home for decades.', shopMyUrl: 'https://shopmy.us/shop/collections/5043566' },
      { top: 'Soft white button-up', bottom: 'Cream wide-leg pants', accessories: 'Small gold hoops, classic watch', why: 'Tonal and elegant. Photographs like an editorial.' },
      { top: 'Cream cable-knit sweater', bottom: 'Dark wash jeans', accessories: 'Pearl studs, simple bracelet', why: 'Cozy, classic, and incredibly photogenic, especially in golden hour light.', shopMyUrl: 'https://shopmy.us/shop/collections/5043621' },
    ],
    trendy: [
      { top: 'Silk slip top in champagne or dusty rose', bottom: 'Tailored wide-leg trousers', accessories: 'Layered gold chains, statement earrings', why: 'Soft, modern, romantic. The silk catches light gorgeously.' },
      { top: 'Fitted bodysuit in cream with an oversized blazer', bottom: 'High-waisted trousers', accessories: 'Chunky gold hoops, sleek heel', why: 'Fashion-forward couple energy. Photographs like a magazine.', shopMyUrl: 'https://shopmy.us/shop/collections/5043706' },
      { top: 'Cropped knit in a warm neutral', bottom: 'Wide-leg jeans', accessories: 'Gold hoops, layered necklaces', why: 'Modern and intimate. The proportions photograph flattering and current.' },
    ],
    minimal: [
      { top: 'Cream cashmere crewneck', bottom: 'Cream pants', accessories: 'One delicate gold piece', why: 'Tonal couples photos are stunning. Lets the connection be the loudest thing in the frame.', shopMyUrl: 'https://shopmy.us/shop/collections/5042936' },
      { top: 'Simple white tee (fitted, beautiful quality)', bottom: 'Dark wash jeans', accessories: 'Single gold necklace', why: "Stripped back on purpose. Romance doesn't need a costume.", shopMyUrl: 'https://shopmy.us/shop/collections/5043120' },
      { top: 'Oatmeal linen button-up', bottom: 'Cream wide-leg pants', accessories: 'Delicate stud earrings', why: 'Effortless and romantic. Photographs like a film.', shopMyUrl: 'https://shopmy.us/shop/collections/5043665' },
    ],
    eclectic: [
      { top: 'Burgundy silk blouse', bottom: 'Camel wide-leg pants', accessories: 'Vintage gold earrings, statement ring', why: 'Romantic with personality. The rich color photographs beautifully against natural backdrops.', shopMyUrl: 'https://shopmy.us/shop/collections/5043232' },
      { top: 'Textured cream knit with interesting neckline', bottom: 'Rust or olive pants', accessories: 'Mixed metal layered jewelry', why: 'Couples with style, not costumes. You both look like yourselves.' },
      { top: 'Vintage-inspired blouse in a warm tone', bottom: 'Tailored trousers', accessories: 'Collected-feeling jewelry', why: 'Photographs timeless and interesting. Like you stepped out of a film.' },
    ],
  },
  branding: {
    casual: [
      { top: 'Cream knit sweater', bottom: 'Tailored camel trousers', accessories: 'Layered fine gold chains, structured tote', why: "Approachable but intentional. Reads like someone you'd want to work with." },
      { top: 'Linen button-up rolled to the elbow', bottom: 'Dark wash straight-leg jeans', accessories: 'Statement watch, simple gold ring', why: 'Confident and grounded. The linen photographs like natural light in clothing form.', shopMyUrl: 'https://shopmy.us/shop/collections/5043665' },
      { top: 'Fitted ivory tee under an oversized blazer', bottom: 'Tailored trousers', accessories: 'Chunky gold hoops, sleek shoe', why: 'Editorial energy with a casual base. Photographs current and confident.', shopMyUrl: 'https://shopmy.us/shop/collections/5043706' },
    ],
    classic: [
      { top: 'Cream silk blouse', bottom: 'Tailored navy or black trousers', accessories: 'Gold hoops, simple watch', why: 'Polished and powerful. Reads expert without being stiff.', shopMyUrl: 'https://shopmy.us/shop/collections/5042842' },
      { top: 'Camel turtleneck', bottom: 'Cream wide-leg pants', accessories: 'Gold knot earrings, layered bracelets', why: 'Tonal, elegant, photographs like an editorial. Confidence in clothing form.', shopMyUrl: 'https://shopmy.us/shop/collections/5043566' },
      { top: 'White button-up under a structured blazer', bottom: 'Tailored trousers', accessories: 'Pearl studs, classic watch', why: 'The power outfit. Sharp, intentional, never out of place.' },
    ],
    trendy: [
      { top: 'Oversized blazer over a fitted tank', bottom: 'Wide-leg trousers in chocolate or black', accessories: 'Chunky gold earrings, statement bag', why: 'Modern, magnetic, photographs editorial. This is brand-builder energy.', shopMyUrl: 'https://shopmy.us/shop/collections/5043706' },
      { top: 'Silk slip top in champagne or burgundy', bottom: 'Tailored leather-look trousers', accessories: 'Bold gold cuff, structured heel', why: 'Texture contrast reads expensive. Photographs like a magazine cover.' },
      { top: 'Cropped structured knit', bottom: 'High-waisted wide-leg trousers', accessories: 'Layered gold chains, statement watch', why: 'Fashion-forward but flattering. Reads creative director, not trend-chaser.' },
    ],
    minimal: [
      { top: 'Cream cashmere crewneck', bottom: 'Cream tailored trousers', accessories: 'One beautiful gold piece, nothing else', why: 'Quiet luxury. This is "I don\'t need to try hard" personified, and it photographs incredible.', shopMyUrl: 'https://shopmy.us/shop/collections/5042936' },
      { top: 'Crisp white tee (high-quality, fitted)', bottom: 'Black tailored trousers', accessories: 'Simple gold studs, minimal watch', why: "Stripped back on purpose. Confidence doesn't need decoration.", shopMyUrl: 'https://shopmy.us/shop/collections/5043120' },
      { top: 'Stone linen button-up', bottom: 'Cream wide-leg pants', accessories: 'Single gold pendant', why: 'Effortless and intentional. Reads expert without trying.', shopMyUrl: 'https://shopmy.us/shop/collections/5043665' },
    ],
    eclectic: [
      { top: 'Burgundy silk blouse', bottom: 'Camel wide-leg trousers', accessories: 'Vintage gold earrings, layered rings', why: 'Personality and authority. Photographs unforgettable.', shopMyUrl: 'https://shopmy.us/shop/collections/5043232' },
      { top: 'Textured cream knit with architectural detail', bottom: 'Olive or rust trousers', accessories: 'Mixed metal statement piece', why: 'You bring the brand. The outfit just supports it.' },
      { top: 'Vintage-inspired blouse in rich earth tone', bottom: 'Tailored trousers in chocolate or black', accessories: 'Collected jewelry, statement watch', why: "Photographs like someone with a clear point of view. That's the whole brand." },
    ],
  },
}

export interface Recommendations {
  colors: ColorSet
  outfits: Outfit[]
  avoid: string[]
  tips: string[]
}

export function getRecommendations(answers: Answers): Recommendations {
  const { sessionType, style, confidence, skinTone } = answers

  const colors = colorMap[skinTone] || colorMap.unsure
  // Map quiz answers to outfit-set keys. Seniors share the headshot wardrobe
  // (single subject, polished but personal). Unsure defaults to branding.
  const sessionKey: SessionKey =
    sessionType === 'unsure' ? 'branding' :
    sessionType === 'seniors' ? 'headshots' :
    (sessionType as SessionKey)
  const styleKey: StyleKey = (style as StyleKey) in outfitsBySession.headshots ? (style as StyleKey) : 'classic'
  const outfits =
    outfitsBySession[sessionKey]?.[styleKey] || outfitsBySession.headshots.classic

  // ── Avoid list ──
  let avoid: string[]
  if (style === 'eclectic' || confidence === 'standout') {
    avoid = [
      "Boring. Don't play it too safe. You're not the kind of person who blends in.",
      'Stiff or shiny fabrics. They fight your natural movement.',
      "Anything that doesn't feel like you. Costumes photograph as costumes.",
    ]
  } else if (style === 'minimal') {
    avoid = [
      'Patterns of any kind. They fight your aesthetic and get noisy on camera.',
      'Multiple competing accessories. Pick one piece and let it be the moment.',
      'Pure bright white. It washes out skin. Cream or off-white photographs much softer.',
    ]
  } else if (sessionType === 'family' || sessionType === 'couples') {
    avoid = [
      'Logos or graphics on tees. They date the photos and pull focus.',
      "Everyone in the same exact color. Coordinate, don't match. Pick a palette and let people choose within it.",
      'More than one person in a pattern. One subtle all-over print (think a soft floral dress on Mom) is beautiful. Everyone else stays in solids that pull from the same palette.',
      'Stiff or scratchy fabrics. Kids fidget, you fidget, the photos suffer.',
    ]
  } else {
    avoid = [
      'Bold or busy patterns. A subtle all-over print can work, but tiny prints, stripes, and graphics tend to get noisy on camera.',
      "Stiff or shiny fabrics. They don't move with you and reflect light unevenly.",
      'Anything that makes you tug, adjust, or feel self-conscious. Comfort always shows in photos.',
    ]
  }

  // ── Tips ──
  const tips: string[] = [
    'Solids photograph beautifully. If you want a pattern, keep it to one person in the group with a soft all-over print, surrounded by solids in the same palette.',
    'Layers add dimension on camera. A button-up over a tee, a blazer over a knit. Texture reads as depth.',
    'Fitted is better than loose. The camera should see your shape, not drown in fabric.',
    "Iron everything. Wrinkles photograph louder than you'd think.",
    "Test your outfit in natural light before the session. Stand near a window. If you love how it looks, you'll love how it photographs.",
  ]
  if (skinTone === 'fair') tips.push('Avoid pure bright white near your face. It can wash out lighter skin. Cream and warm tones are your friend.')
  if (skinTone === 'deep') tips.push('Lean into jewel tones. Emerald, sapphire, burgundy. They photograph rich and gorgeous against deeper skin.')
  if (confidence === 'nervous') tips.push('Wear something you already feel good in. New outfits equal nervous energy. Familiar equals confident.')

  return { colors, outfits, avoid, tips: tips.slice(0, 5) }
}

export const fabrics = [
  { name: 'Linen', desc: 'Breathes, moves naturally, catches light beautifully.' },
  { name: 'Cotton', desc: 'Comfortable, photographs soft, never fights you.' },
  { name: 'Soft knits', desc: 'Flattering, drape with you, add texture on camera.' },
  { name: 'Silk blends', desc: 'Elegant movement, photographs like a film still.' },
]

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
export interface ColorSuggestion {
  name: string
  hex: string
  why: string
}
export interface ColorSet {
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
export type PieceType = 'top' | 'bottom' | 'shoes' | 'accessory' | 'outerwear'

export interface OutfitPiece {
  type: PieceType
  name: string
  description: string
  shopMyProductUrl?: string
  priceDisplay?: string
}

export interface Outfit {
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
  /**
   * Structured per-piece breakdown for v2 mood board (family scope).
   * When present, used by MoodBoard to render flat-lay tiles + per-piece purchase.
   * When absent, getPieces() synthesizes from top/bottom/accessories strings.
   */
  pieces?: OutfitPiece[]
}

export function getPieces(outfit: Outfit): OutfitPiece[] {
  if (outfit.pieces && outfit.pieces.length > 0) return outfit.pieces
  return [
    { type: 'top', name: outfit.top, description: outfit.top, shopMyProductUrl: outfit.shopMyUrl },
    { type: 'bottom', name: outfit.bottom, description: outfit.bottom, shopMyProductUrl: outfit.shopMyUrl },
    { type: 'accessory', name: outfit.accessories, description: outfit.accessories, shopMyProductUrl: outfit.shopMyUrl },
  ]
}

type StyleKey = 'casual' | 'classic' | 'trendy' | 'minimal' | 'eclectic'
type SessionKey = 'headshots' | 'family' | 'couples' | 'branding'
// 'seniors' and 'unsure' fall back to one of the above via a session-key resolver.

// Audience splits the outfit pool by who's wearing the look. Default = women.
// Routed at recommendation time via person.gender + person.role (see resolveAudience).
export type Audience = 'women' | 'men' | 'kid'

export const outfitsBySession: Record<SessionKey, Record<StyleKey, Outfit[]>> = {
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

// ── Men's outfit pool ─────────────────────────────────────────────────────────
// Same shape as outfitsBySession (women). Routed via person.gender === 'man'.
// shopMyUrl left blank — fill in as Jennie builds men's ShopMy collections.

export const outfitsBySessionMen: Record<SessionKey, Record<StyleKey, Outfit[]>> = {
  headshots: {
    casual: [
      { top: 'Cream merino crewneck sweater', bottom: 'Dark wash straight-leg jeans', accessories: 'Classic leather watch, simple band ring', why: 'Approachable but pulled together. The knit photographs warm and the dark denim grounds you.' },
      { top: 'Stone linen button-up, sleeves rolled', bottom: 'Tailored camel chinos', accessories: 'Leather watch, leather belt to match shoes', why: 'Linen catches light beautifully. You read confident without trying too hard.' },
      { top: 'Fitted heather-gray tee under an open neutral blazer', bottom: 'Dark trousers or dark jeans', accessories: 'Minimal watch, no extras', why: 'Layered without effort. The blazer means business; the tee keeps it human.' },
    ],
    classic: [
      { top: 'White oxford button-up', bottom: 'Tailored navy trousers', accessories: 'Classic watch, brown leather belt + shoes', why: 'Timeless and intentional. Lets your face be the focal point.' },
      { top: 'Camel fine-knit crewneck over a white tee', bottom: 'Cream tailored trousers', accessories: 'Simple watch, nothing else', why: 'Tonal dressing photographs editorial. Elevated without trying.' },
      { top: 'White dress shirt under a charcoal blazer', bottom: 'Charcoal tailored trousers', accessories: 'Quality watch, polished leather shoes', why: 'The classic for a reason. Sharp, confident, never out of place.' },
    ],
    trendy: [
      { top: 'Oversized cream knit polo', bottom: 'Wide-leg trousers in chocolate or black', accessories: 'Statement watch, leather loafers', why: 'Modern silhouette, confident energy. Photographs current without dating.' },
      { top: 'Textured camel overshirt over a white tee', bottom: 'High-waisted tailored trousers', accessories: 'Layered chain or pendant, sleek boot', why: 'Fashion-forward but flattering. Reads creative, not costume.' },
      { top: 'Cream silk-blend shirt with subtle drape', bottom: 'Tailored leather-look trousers', accessories: 'Single quality watch, structured shoe', why: 'Texture contrast reads expensive. Photographs like a magazine.' },
    ],
    minimal: [
      { top: 'Cream merino crewneck', bottom: 'Cream or stone tailored trousers', accessories: 'One beautiful watch, nothing else', why: 'Quiet luxury. The simplicity puts you front and center.' },
      { top: 'Crisp white tee (high-quality, fitted)', bottom: 'Black tailored trousers', accessories: 'Minimal watch, simple ring', why: "Stripped back on purpose. Confidence doesn't need decoration." },
      { top: 'Stone linen button-up', bottom: 'Dark wash straight-leg jeans', accessories: 'Single leather strap watch', why: 'Effortless and intentional. Reads polished without trying.' },
    ],
    eclectic: [
      { top: 'Burgundy fine-knit crewneck', bottom: 'Camel wide-leg trousers', accessories: 'Vintage watch, single ring with character', why: 'Personality without chaos. The rich color shows you have a point of view.' },
      { top: 'Textured cream knit with interesting weave', bottom: 'Olive or rust trousers', accessories: 'Mixed metal cuff, unique watch', why: 'You bring the personality; the outfit just supports it.' },
      { top: 'Vintage-inspired chambray button-up', bottom: 'Tailored trousers in chocolate or black', accessories: 'Collected-feeling jewelry, leather strap watch', why: "You look like yourself, just elevated. That's the goal." },
    ],
  },
  family: {
    casual: [
      { top: 'Cream merino crewneck sweater', bottom: 'Dark wash jeans', accessories: 'Leather watch, simple band ring', why: "You'll be chasing kids and laughing. This works for all of it and still photographs warm." },
      { top: 'Linen button-up over a fitted white tee', bottom: 'Light wash jeans rolled at the ankle', accessories: 'Leather watch, simple belt', why: 'Relaxed but pulled together. Linen catches outdoor light gorgeously.' },
      { top: 'Cozy oatmeal cardigan over a white tee', bottom: 'Camel or stone chinos', accessories: 'Minimal watch', why: 'Warm and approachable. You look like the dad everyone wants to hug.' },
    ],
    classic: [
      { top: 'Cream fisherman knit sweater', bottom: 'Dark wash straight-leg jeans', accessories: 'Classic watch, simple leather belt', why: 'Timeless family photo energy. Will look as good in 20 years as it does today.' },
      { top: 'Soft camel fine-knit crewneck', bottom: 'Cream or stone chinos', accessories: 'Leather watch, polished leather shoes', why: 'Elevated but soft. Family photos should feel warm, not stiff.' },
      { top: 'White oxford tucked into trousers', bottom: 'Camel trousers or dark jeans', accessories: 'Classic watch, brown belt + shoes', why: 'Classic for a reason. Photographs beautifully and never dates.' },
    ],
    trendy: [
      { top: 'Oversized cream knit polo', bottom: 'Wide-leg jeans or trousers in a warm neutral', accessories: 'Statement watch, leather loafers', why: 'Modern proportions photograph editorial. Current without trying too hard.' },
      { top: 'Textured camel overshirt over a fitted tee', bottom: 'High-waisted dark jeans', accessories: 'Layered chain or pendant, ankle boot', why: 'Fashion-forward family vibes. Flattering modern silhouette.' },
      { top: 'Silk-blend button-up in oat or sand', bottom: 'Tailored trousers in a warm neutral', accessories: 'Quality watch, sleek loafer', why: 'Soft and elevated. Photographs like a magazine spread.' },
    ],
    minimal: [
      { top: 'Cream merino crewneck', bottom: 'Cream or stone tailored trousers', accessories: 'One quality watch', why: 'Tonal dressing for a family looks incredibly editorial. Lets connection be the focus.' },
      { top: 'Simple white tee (high-quality, fitted)', bottom: 'Dark wash jeans', accessories: 'Minimal watch, no extras', why: "Stripped back on purpose. Family photos shine when there's nothing competing." },
      { top: 'Oatmeal linen button-up', bottom: 'Cream chinos', accessories: 'Single leather strap watch', why: 'Effortless and warm. Photographs like soft natural light in clothing form.' },
    ],
    eclectic: [
      { top: 'Burgundy or rust fine-knit sweater', bottom: 'Camel or olive chinos', accessories: 'Vintage watch, single ring with character', why: 'Personality and warmth. Family photos with character age beautifully.' },
      { top: 'Textured cream sweater with interesting detail', bottom: 'Dark wash jeans', accessories: 'Mixed metal watch, leather strap', why: "You look like yourself. That's what your family needs to remember." },
      { top: 'Chambray button-up in a warm wash', bottom: 'Solid cream or camel chinos', accessories: 'Single quality watch, collected ring', why: 'Subtle pattern done right. Adds interest without chaos.' },
    ],
  },
  couples: {
    casual: [
      { top: 'Cream merino crewneck', bottom: 'Dark wash jeans', accessories: 'Leather watch, simple band ring', why: 'Soft, approachable, romantic without trying too hard. Perfect for connection-focused photos.' },
      { top: 'Linen button-up in oat or sand', bottom: 'Camel or cream chinos', accessories: 'Leather watch, simple belt', why: 'Linen on couples photographs unbelievably romantic. The texture reads like a film still.' },
      { top: 'Fitted cream tee under an open cardigan', bottom: 'Dark wash jeans', accessories: 'Minimal watch', why: 'Cozy and intimate. You look like you actually like each other.' },
    ],
    classic: [
      { top: 'White oxford button-up', bottom: 'Camel chinos or cream trousers', accessories: 'Classic watch, brown leather belt + shoes', why: 'Timeless and romantic. These photos will look beautiful framed for decades.' },
      { top: 'Soft camel turtleneck or fine-knit', bottom: 'Cream wide-leg trousers', accessories: 'Quality watch, polished leather shoes', why: 'Tonal and elegant. Photographs like an editorial.' },
      { top: 'Cream fisherman sweater', bottom: 'Dark wash jeans', accessories: 'Classic watch, simple ring', why: 'Cozy, classic, incredibly photogenic in golden hour light.' },
    ],
    trendy: [
      { top: 'Silk-blend shirt in champagne or oat', bottom: 'Tailored wide-leg trousers', accessories: 'Layered chains, statement watch', why: 'Soft, modern, romantic. The silk catches light gorgeously.' },
      { top: 'Fitted cream tee under an oversized blazer', bottom: 'High-waisted trousers', accessories: 'Quality watch, sleek loafer', why: 'Fashion-forward couple energy. Photographs like a magazine.' },
      { top: 'Camel overshirt over a fitted white tee', bottom: 'Wide-leg dark jeans', accessories: 'Layered pendant, leather ankle boot', why: 'Modern and intimate. Photographs flattering and current.' },
    ],
    minimal: [
      { top: 'Cream merino crewneck', bottom: 'Cream chinos', accessories: 'One quality watch', why: 'Tonal couples photos are stunning. Lets connection be the loudest thing.' },
      { top: 'Simple white tee (fitted, beautiful quality)', bottom: 'Dark wash jeans', accessories: 'Single watch, simple band ring', why: "Stripped back on purpose. Romance doesn't need a costume." },
      { top: 'Oatmeal linen button-up', bottom: 'Cream wide-leg chinos', accessories: 'Leather strap watch', why: 'Effortless and romantic. Photographs like a film.' },
    ],
    eclectic: [
      { top: 'Burgundy fine-knit crewneck', bottom: 'Camel wide-leg chinos', accessories: 'Vintage watch, single ring with character', why: 'Romantic with personality. Rich color photographs beautifully against natural backdrops.' },
      { top: 'Textured cream knit with interesting weave', bottom: 'Rust or olive trousers', accessories: 'Mixed metal cuff, unique watch', why: 'Couples with style, not costumes. You both look like yourselves.' },
      { top: 'Vintage-inspired chambray button-up', bottom: 'Tailored trousers in a warm tone', accessories: 'Collected-feeling watch and ring', why: 'Photographs timeless and interesting. Like you stepped out of a film.' },
    ],
  },
  branding: {
    casual: [
      { top: 'Cream merino crewneck', bottom: 'Tailored camel chinos', accessories: 'Quality watch, sleek loafer', why: "Approachable but intentional. Reads like someone you'd want to work with." },
      { top: 'Linen button-up rolled to the elbow', bottom: 'Dark wash straight-leg jeans', accessories: 'Statement watch, simple ring', why: 'Confident and grounded. The linen photographs like natural light in clothing form.' },
      { top: 'Fitted white tee under an oversized neutral blazer', bottom: 'Tailored trousers', accessories: 'Quality watch, sleek shoe', why: 'Editorial energy with a casual base. Photographs current and confident.' },
    ],
    classic: [
      { top: 'White oxford button-up', bottom: 'Tailored navy or charcoal trousers', accessories: 'Classic watch, brown leather belt + shoes', why: 'Polished and powerful. Reads expert without being stiff.' },
      { top: 'Camel fine-knit crewneck over white tee', bottom: 'Cream wide-leg trousers', accessories: 'Quality watch, layered leather pieces', why: 'Tonal, elegant. Confidence in clothing form.' },
      { top: 'White dress shirt under a structured blazer', bottom: 'Tailored trousers', accessories: 'Quality watch, polished shoes', why: 'The power outfit. Sharp, intentional, never out of place.' },
    ],
    trendy: [
      { top: 'Oversized neutral blazer over a fitted tee', bottom: 'Wide-leg trousers in chocolate or black', accessories: 'Statement watch, sleek shoe', why: 'Modern, magnetic, photographs editorial. This is brand-builder energy.' },
      { top: 'Silk-blend shirt in champagne or burgundy', bottom: 'Tailored leather-look trousers', accessories: 'Quality watch, structured shoe', why: 'Texture contrast reads expensive. Photographs like a magazine cover.' },
      { top: 'Textured camel overshirt', bottom: 'High-waisted wide-leg trousers', accessories: 'Layered chain, statement watch', why: 'Fashion-forward but flattering. Reads creative director, not trend-chaser.' },
    ],
    minimal: [
      { top: 'Cream merino crewneck', bottom: 'Cream tailored trousers', accessories: 'One beautiful watch, nothing else', why: 'Quiet luxury. "I don\'t need to try hard" personified.' },
      { top: 'Crisp white tee (high-quality, fitted)', bottom: 'Black tailored trousers', accessories: 'Minimal watch', why: "Stripped back on purpose. Confidence doesn't need decoration." },
      { top: 'Stone linen button-up', bottom: 'Cream wide-leg chinos', accessories: 'Single leather strap watch', why: 'Effortless and intentional. Reads expert without trying.' },
    ],
    eclectic: [
      { top: 'Burgundy fine-knit crewneck', bottom: 'Camel wide-leg trousers', accessories: 'Vintage watch, layered rings', why: 'Personality and authority. Photographs unforgettable.' },
      { top: 'Textured cream knit with architectural detail', bottom: 'Olive or rust trousers', accessories: 'Mixed metal statement watch', why: 'You bring the brand. The outfit just supports it.' },
      { top: 'Vintage-inspired chambray button-up', bottom: 'Tailored trousers in chocolate or black', accessories: 'Collected-feeling watch and ring', why: "Photographs like someone with a clear point of view. That's the whole brand." },
    ],
  },
}

// ── Kid outfit pool ───────────────────────────────────────────────────────────
// Kids run on a single casual track regardless of style (per quiz flow).
// Boy / girl variants. Routed via person.role === 'child' + gender.
// shopMyUrl left blank — fill in as Jennie builds kid ShopMy collections.

export const outfitsKid: Record<'boy' | 'girl', Outfit[]> = {
  boy: [
    { top: 'Cream knit sweater or henley', bottom: 'Dark wash kid jeans', accessories: 'Cream or tan canvas sneakers', why: "Cozy, photogenic, lets him be a kid. He can move and you don't have to fight him to keep him clean." },
    { top: 'Linen button-up in oat or sand', bottom: 'Camel or cream cotton pants', accessories: 'Tan leather sneakers or boat shoes', why: 'Linen on kids photographs like a magazine. Soft texture, easy movement.' },
    { top: 'Fitted cream tee under an open cardigan', bottom: 'Light wash kid jeans', accessories: 'Cream sneakers', why: 'Layered and warm. Reads intentional without looking forced on a kid.' },
  ],
  girl: [
    { top: 'Cream knit cardigan over a soft tee or dress', bottom: 'Cream tights or soft denim leggings', accessories: 'Neutral booties, simple hair tie or soft bow', why: 'Cozy and photogenic. She can twirl, sit, climb — and still photograph beautifully.' },
    { top: 'Long-sleeve cream or oat cotton dress', bottom: '— (dress)', accessories: 'Cream or tan booties, simple barrette', why: 'A simple soft dress lets her be the focal point. Movement reads romantic on camera.' },
    { top: 'Soft camel or rust knit sweater', bottom: 'Cream corduroy or cotton pants', accessories: 'Neutral sneakers or booties', why: 'Earthy and warm. Photographs like a vintage editorial.' },
  ],
}

export interface Recommendations {
  colors: ColorSet
  outfits: Outfit[]
  avoid: string[]
  tips: string[]
}

export interface RecommendationContext {
  audience?: Audience
  // For kid audience: which kid variant to pull. Defaults to 'girl' when omitted.
  kidVariant?: 'boy' | 'girl'
}

export function getRecommendations(
  answers: Answers,
  context: RecommendationContext = {},
): Recommendations {
  const { sessionType, style, confidence, skinTone } = answers
  const audience: Audience = context.audience || 'women'

  const colors = colorMap[skinTone] || colorMap.unsure
  // Map quiz answers to outfit-set keys. Seniors share the headshot wardrobe
  // (single subject, polished but personal). Unsure defaults to branding.
  const sessionKey: SessionKey =
    sessionType === 'unsure' ? 'branding' :
    sessionType === 'seniors' ? 'headshots' :
    (sessionType as SessionKey)
  const styleKey: StyleKey = (style as StyleKey) in outfitsBySession.headshots ? (style as StyleKey) : 'classic'

  let outfits: Outfit[]
  if (audience === 'kid') {
    outfits = outfitsKid[context.kidVariant || 'girl']
  } else if (audience === 'men') {
    outfits =
      outfitsBySessionMen[sessionKey]?.[styleKey] || outfitsBySessionMen.headshots.classic
  } else {
    outfits =
      outfitsBySession[sessionKey]?.[styleKey] || outfitsBySession.headshots.classic
  }

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

// ── Multi-person family flow ──────────────────────────────────────────────────

export type PersonRole = 'anchor' | 'partner' | 'child' | 'teen' | 'grandparent' | 'other'
export type Gender = 'woman' | 'man' | 'non-binary'

export const ROLE_LABELS: Record<PersonRole, string> = {
  anchor: 'You',
  partner: 'Partner',
  child: 'Child',
  teen: 'Teen',
  grandparent: 'Grandparent',
  other: 'Family member',
}

export const GENDER_LABELS: Record<Gender, string> = {
  woman: 'Woman',
  man: 'Man',
  'non-binary': 'Non-binary',
}

export interface Person {
  id: string
  role: PersonRole
  gender?: Gender
  displayName?: string
  answers: Answers
  isAnchor: boolean
}

export interface QuizState {
  anchor: Person | null
  group: Person[]
  isGroup: boolean
}

export const EMPTY_QUIZ_STATE: QuizState = {
  anchor: null,
  group: [],
  isGroup: false,
}

export type PaletteSlot = 'dominant' | 'complement' | 'neutral' | 'accentTonal'

export interface FamilyPalette {
  dominant: ColorSuggestion
  complement: ColorSuggestion
  neutral: ColorSuggestion
  accentTonal: ColorSuggestion
}

export interface PersonRecommendations {
  person: Person
  recommendations: Recommendations
  paletteSlot: PaletteSlot
  assignedPrimary: ColorSuggestion
}

export interface GroupRecommendations {
  familyPalette: FamilyPalette
  people: PersonRecommendations[]
  sharedAvoid: string[]
  sharedTips: string[]
}

// ── Color math ────────────────────────────────────────────────────────────────

function hexToHsl(hex: string): [number, number, number] {
  const clean = hex.replace('#', '')
  const r = parseInt(clean.slice(0, 2), 16) / 255
  const g = parseInt(clean.slice(2, 4), 16) / 255
  const b = parseInt(clean.slice(4, 6), 16) / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  let h = 0
  let s = 0
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6
    else if (max === g) h = ((b - r) / d + 2) / 6
    else h = ((r - g) / d + 4) / 6
  }
  return [h * 360, s * 100, l * 100]
}

function hslToHex(h: number, s: number, l: number): string {
  const sNorm = s / 100
  const lNorm = l / 100
  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = lNorm - c / 2
  let r = 0
  let g = 0
  let b = 0
  if (h < 60) [r, g, b] = [c, x, 0]
  else if (h < 120) [r, g, b] = [x, c, 0]
  else if (h < 180) [r, g, b] = [0, c, x]
  else if (h < 240) [r, g, b] = [0, x, c]
  else if (h < 300) [r, g, b] = [x, 0, c]
  else [r, g, b] = [c, 0, x]
  const toHex = (v: number) =>
    Math.round((v + m) * 255)
      .toString(16)
      .padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase()
}

export function shiftLuminance(hex: string, deltaPct: number): string {
  const [h, s, l] = hexToHsl(hex)
  const nextL = Math.min(95, Math.max(8, l + deltaPct))
  return hslToHex(h, s, nextL)
}

const NEUTRAL_BY_SKIN_TONE: Record<string, ColorSuggestion> = {
  fair: { name: 'Soft Oat', hex: '#E8DDC8', why: 'A soft, universally coordinating neutral that photographs warm against fair skin.' },
  medium: { name: 'Warm Stone', hex: '#C7B49A', why: 'Earthy, harmonious, lets every face in the frame be the focal point.' },
  deep: { name: 'Ivory', hex: '#F0E8D8', why: 'High-contrast and editorial. Photographs like film against deeper skin.' },
  unsure: { name: 'Warm Cream', hex: '#EFE4D2', why: 'A safe coordinating neutral that flatters every skin tone in a group.' },
}

export function deriveNeutral(skinTone: string): ColorSuggestion {
  return NEUTRAL_BY_SKIN_TONE[skinTone] || NEUTRAL_BY_SKIN_TONE.unsure
}

export function buildFamilyPalette(anchor: Person): FamilyPalette {
  const colors = colorMap[anchor.answers.skinTone] || colorMap.unsure
  const accentHex = shiftLuminance(colors.primary.hex, -22)
  return {
    dominant: colors.primary,
    complement: colors.secondary,
    neutral: deriveNeutral(anchor.answers.skinTone),
    accentTonal: {
      name: `Deep ${colors.primary.name}`,
      hex: accentHex,
      why: 'A deeper tonal of the family dominant — supports without competing. Photographs as a coordinated, intentional pairing.',
    },
  }
}

function assignSlot(role: PersonRole, addOrder: number, childCountSoFar: number): PaletteSlot {
  if (role === 'anchor') return 'dominant'
  if (role === 'partner') return 'accentTonal'
  if (role === 'grandparent') return 'neutral'
  if (role === 'teen') return 'complement'
  if (role === 'child') return childCountSoFar % 2 === 0 ? 'dominant' : 'neutral'
  const cycle: PaletteSlot[] = ['accentTonal', 'complement', 'neutral', 'dominant']
  return cycle[addOrder % cycle.length]
}

function paletteSlotToColor(slot: PaletteSlot, palette: FamilyPalette): ColorSuggestion {
  return palette[slot]
}

function fillMiniAnswersFromAnchor(person: Person, anchor: Person): Answers {
  return {
    sessionType: anchor.answers.sessionType,
    style: person.answers.style || anchor.answers.style,
    confidence: anchor.answers.confidence,
    vibe: anchor.answers.vibe,
    skinTone: person.answers.skinTone || anchor.answers.skinTone,
  }
}

function resolveAudience(person: Person): Audience {
  if (person.role === 'child') return 'kid'
  if (person.gender === 'man') return 'men'
  return 'women'
}

function resolveKidVariant(person: Person): 'boy' | 'girl' {
  // Kids get gender via mini-quiz. Default to 'girl' if unset.
  return person.gender === 'man' ? 'boy' : 'girl'
}

export function getGroupRecommendations(state: QuizState): GroupRecommendations | null {
  if (!state.anchor || !state.isGroup) return null
  const anchor = state.anchor
  const palette = buildFamilyPalette(anchor)

  const anchorEntry: PersonRecommendations = {
    person: anchor,
    recommendations: getRecommendations(anchor.answers, { audience: resolveAudience(anchor) }),
    paletteSlot: 'dominant',
    assignedPrimary: paletteSlotToColor('dominant', palette),
  }

  let childCount = 0
  const groupEntries: PersonRecommendations[] = state.group.map((person, idx) => {
    const isChild = person.role === 'child'
    if (isChild) childCount += 1
    const slot = assignSlot(person.role, idx, isChild ? childCount - 1 : 0)
    const personAnswers: Answers = isChild
      ? { ...person.answers, style: 'casual' }
      : person.answers
    const filled: Person = {
      ...person,
      answers: fillMiniAnswersFromAnchor({ ...person, answers: personAnswers }, anchor),
    }
    const audience = resolveAudience(filled)
    return {
      person: filled,
      recommendations: getRecommendations(filled.answers, {
        audience,
        kidVariant: audience === 'kid' ? resolveKidVariant(filled) : undefined,
      }),
      paletteSlot: slot,
      assignedPrimary: paletteSlotToColor(slot, palette),
    }
  })

  const allPeople = [anchorEntry, ...groupEntries]
  const sharedAvoid = Array.from(
    new Set(allPeople.flatMap((p) => p.recommendations.avoid)),
  ).slice(0, 5)
  const sharedTips = Array.from(
    new Set(allPeople.flatMap((p) => p.recommendations.tips)),
  ).slice(0, 5)

  return {
    familyPalette: palette,
    people: allPeople,
    sharedAvoid,
    sharedTips,
  }
}

// ── Stable outfit identity for cache keys ─────────────────────────────────────

export type StyleKeyPublic = 'casual' | 'classic' | 'trendy' | 'minimal' | 'eclectic'
export type SessionKeyPublic = 'headshots' | 'family' | 'couples' | 'branding'

export function resolveSessionKey(sessionType: string): SessionKeyPublic {
  if (sessionType === 'unsure') return 'branding'
  if (sessionType === 'seniors') return 'headshots'
  return sessionType as SessionKeyPublic
}

export function resolveStyleKey(style: string): StyleKeyPublic {
  return ((style as StyleKeyPublic) in outfitsBySession.headshots ? style : 'classic') as StyleKeyPublic
}

export function makeOutfitKey(
  sessionType: string,
  style: string,
  outfitIdx: number,
  modifier?: string,
): string {
  const session = resolveSessionKey(sessionType)
  const styleKey = resolveStyleKey(style)
  return modifier
    ? `${session}:${styleKey}:${outfitIdx}:${modifier}`
    : `${session}:${styleKey}:${outfitIdx}`
}

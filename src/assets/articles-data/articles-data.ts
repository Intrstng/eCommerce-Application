import type { ArticleItem } from '../../common/components/ArticleCard/interfaces';
import ringImage from '../articles/ring.png';
import broochImage from '../articles/brooch.png';
import earringImage from '../articles/earring.png';
import careImage from '../articles/care.png';

export const articlesContent: ArticleItem[] = [
    {
        id: 'earring',
        title: 'Elegant Adornments – Earrings',
        summary: 'Earrings are more than accessories — they are a refined expression of style and individuality.',
        text: 'From minimalist studs to statement dangles, earrings highlight facial features, complete your look, and boost confidence. Crafted from precious metals and adorned with gemstones, pearls, or crystals, they reflect your unique taste. Whether for everyday elegance or a special occasion, earrings tell your story without words.',
        picture: earringImage,
    },
    {
        id: 'ring',
        title: 'Timeless Elegance – Rings',
        summary: 'A ring is more than jewelry — it’s a symbol, a story, and a reflection of who you are.',
        text: 'Worn to mark life’s most meaningful moments — from declarations of love to personal milestones — rings carry deep significance. Whether minimal or ornate, with diamonds or detailed engravings, each ring tells a unique story. Crafted from gold, platinum, silver, and more, rings elevate style and express individuality. Slip on a ring, and wear your story with grace.',
        picture: ringImage,
    },
    {
        id: 'brooch',
        title: 'Charming Accents – Brooches',
        summary: 'A brooch is a refined accessory that can turn any outfit into a statement of elegance.',
        text: 'More than just a clasp, the brooch is a piece of wearable art. Whether vintage or modern, minimalist or ornate, each brooch tells its own story. Pinned to a dress, jacket, or scarf, it brings a touch of charm, sophistication, and individuality to your look. Crafted from fine metals and adorned with pearls, gemstones, or intricate details — brooches allow you to express yourself through timeless design.',
        picture: broochImage,
    },
    {
        id: 'care-guide',
        title: 'Care Guide for Handmade Jewelry',
        summary: 'Learn how to keep your handmade metal jewelry shining and beautiful for years to come.',
        text: `Handmade jewelry is more than just an accessory — it's a piece of art crafted with love and passion. Metal jewelry is especially cherished for its shine, strength, and durability, but it requires proper care to maintain its beauty over time.

<br/><br/><strong>Avoid Contact with Water</strong><br/><br/> 
Frequent exposure to water can cause corrosion or tarnishing, especially with certain metals. Remove your jewelry before showering, swimming, or doing dishes.

<br/><br/><strong>Beware of Chemicals</strong><br/><br/> 
Cleaning agents, perfumes, cosmetics, and even sweat can react with metal and cause damage. Always apply perfumes and lotions before putting on jewelry, and take it off before using household cleaners.

<br/><br/><strong>Store in a Dry Place</strong><br/><br/>
Humidity is harmful to metal. Keep your pieces in a dry jewelry box or pouch. You can also add silica gel packets to absorb moisture.

<br/><br/><strong>Regular Cleaning</strong><br/><br/>
Gently wipe your jewelry with a soft cloth to remove dust and oils. For deeper cleaning or polishing, consider professional care — especially for delicate or precious items.

<br/><br/><strong>Handle with Care</strong><br/><br/> 
Handmade pieces can be more delicate than mass-produced items. Avoid strong impacts or pulling on chains and treat each piece with care.

<br/><br/>With proper care, your handmade jewelry will retain its beauty and continue to tell its story for years to come.`,
        picture: careImage,
    },
];

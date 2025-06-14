import type { ArticleItem } from '../../common/components/ArticleCard/types';
import ringImage from '../articles/ring.png';
import broochImage from '../articles/brooch.png';
import earringImage from '../articles/earring.png';

export const articlesContent: ArticleItem[] = [
    {
        id: 'earring',
        title: 'AuthorPage #4 - Earring',
        summary:
            'Earring jewelry is designed to adorn the ear, typically attaching through a piercing in the earlobe or cartilage...',
        text: "They come in diverse styles, including studs, hoops, dangles, and cuffs, and are crafted from various materials like precious metals, gemstones, beads, and more. Earrings serve as a versatile form of self-expression, adding sparkle, color, or personality to one's appearance and complementing various outfits and occasions.",
        picture: earringImage,
    },
    {
        id: 'ring',
        title: 'AuthorPage #2 - Ring',
        summary: 'Ring jewelry is a circular band worn on a finger, serving as both adornment and symbol...',
        text: 'Ring jewelry is a circular band worn on a finger, serving as both adornment and symbol. Rings come in a vast array of materials, from precious metals like gold and platinum to more affordable options like silver and stainless steel. They can be simple bands or elaborately decorated with gemstones, engravings, and intricate designs. Rings often hold significant meaning, representing commitments like marriage or serving as symbols of status, membership, or personal expression.',
        picture: ringImage,
    },
    {
        id: 'brooch',
        title: 'AuthorPage #3 - Brooch',
        summary:
            'Brooch jewelry is a decorative pin or clasp, typically featuring a design or embellishment, that is fastened to clothing...',
        text: 'Brooch jewelry is a decorative pin or clasp, typically featuring a design or embellishment, that is fastened to clothing. Unlike other jewelry worn on the body, brooches are attached to garments, serving as both a functional fastener and a statement piece. They come in a wide variety of styles, materials, and sizes, ranging from simple and elegant to ornate and whimsical, and can be used to add personality, flair, or a touch of vintage charm to any outfit.',
        picture: broochImage,
    },
];

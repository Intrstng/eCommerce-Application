export interface TeamMember {
    name: string;
    githubUrl: string;
    githubImage: string;
    role: string;
    description: string;
}

export const teamMembers: TeamMember[] = [
    {
        name: 'Andrei Babich',
        githubUrl: 'https://github.com/Intrstng',
        githubImage: 'https://avatars.githubusercontent.com/u/107413715?v=4',
        role: 'Team Lead & Chief Refactorer',
        description:
            'Took charge of everything from setting up the repository and writing tests to deep refactoring sessions. If something broke — fixed it. If something wasn’t broken — improved it anyway. Played a key role in maintaining project architecture and code consistency. Thanks to strong leadership and clear communication, the team stayed focused and productive throughout the development process.',
    },
    {
        name: 'Liubou Levitskaya',
        githubUrl: 'https://github.com/L-Liubou',
        githubImage: 'https://avatars.githubusercontent.com/u/173590047?v=4',
        role: 'API Master & UI Perfectionist',
        description:
            'Connected the project with the mysterious world of Commercetools: products, carts, tokens — all neatly under control. Also made things look nice and tidy, because pretty code deserves a pretty UI. Contributed heavily to API integration, state management, and UI polishing. Collaboration and attention to detail helped elevate the overall user experience.',
    },
    {
        name: 'Egor Romenski',
        githubUrl: 'https://github.com/jakshazbi',
        githubImage: 'https://avatars.githubusercontent.com/u/10772524?v=4',
        role: 'Creative Spirit & Main Page Magician',
        description:
            'Came up with the original project idea, stumbled upon the perfect content, and built the main page. Offered invaluable moral support and motivational vibes. His encouragement and enthusiasm helped keep the team spirit high and the project moving forward.',
    },
];

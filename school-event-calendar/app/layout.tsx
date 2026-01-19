import * as React from 'react';
import type { Metadata } from 'next';
import ThemeRegistry from './components/ThemeRegistry';

export const metadata: Metadata = {
    title: 'School Event Calendar',
    description: 'A responsive school event calendar app',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ja">
            <body>
                <ThemeRegistry>{children}</ThemeRegistry>
            </body>
        </html>
    );
}

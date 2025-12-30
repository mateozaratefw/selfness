import type { Metadata } from "next";
import { Newsreader } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
	subsets: ["latin"],
	style: ["normal", "italic"],
	weight: ["400", "500"],
});

export const metadata: Metadata = {
	title: "writings",
};

export default function RootLayout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode;
	modal: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={newsreader.className}>
				{children}
				{modal}
			</body>
		</html>
	);
}

import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import MiniPlayer from "./components/MiniPlayer";

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
			<body>
				<header className="max-w-[640px] mx-auto px-8 pt-8">
					<Link href="/" className="block no-underline">
						<div className="font-semibold text-base text-(--fg) leading-tight">
							Mateo Zarate
						</div>
					</Link>
					<div className="text-base text-(--muted) leading-tight">
						Co-founder at{" "}
						<a
							href="https://melian.com"
							target="_blank"
							rel="noopener noreferrer"
							className="backlink hover:text-primary-dark transition-colors"
						>
							Melian
						</a>
					</div>
				</header>
				{children}
				{modal}
				<MiniPlayer />
			</body>
		</html>
	);
}

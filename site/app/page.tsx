import fs from "fs";
import Link from "next/link";
import path from "path";
import TextWithImage from "./components/TextWithImage";

const Section = ({ children }: { children: React.ReactNode }) => {
	return (
		<section className="flex flex-col gap-2 pb-[50px]">{children}</section>
	);
};

export default function Home() {
	const writingsDir = path.join(process.cwd(), "..", "writings");
	const files = fs.readdirSync(writingsDir).filter((f) => f.endsWith(".md"));

	const writings = files.map((file) => ({
		slug: file.replace(".md", ""),
		title: file.replace(".md", ""),
	}));

	return (
		<main className="flex flex-col gap-6">
			<Section>
				<p className="font-semibold ">About</p>
				<p>
					I co founded{"   "}
					{"   "}
					<TextWithImage
						src="/logo-melian.png"
						alt="Melian"
						href="https://melian.com"
					/>
					, a company that's building the best shopping experience ever made.
				</p>
			</Section>
			<Section>
				<p className="font-semibold ">Writing</p>
				{writings.map((w) => (
					<div key={w.slug}>
						<Link href={`/${w.slug}`}>
							{w.title.charAt(0).toUpperCase() + w.title.slice(1)}
						</Link>
					</div>
				))}
			</Section>
		</main>
	);
}

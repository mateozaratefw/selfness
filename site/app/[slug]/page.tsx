import fs from "fs";
import Link from "next/link";
import path from "path";
import Markdown from "react-markdown";

function getImageSlug(src: string | undefined | Blob): string | null {
	if (!src || typeof src !== "string") return null;
	// Extract filename from path like /images/filename.jpg
	const match = src.match(/\/images\/([^/]+)$/);
	if (!match) return null;
	const filename = match[1];
	const name = filename.substring(0, filename.lastIndexOf("."));
	return name
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)/g, "");
}

export async function generateStaticParams() {
	const writingsDir = path.join(process.cwd(), "..", "writings");
	const files = fs.readdirSync(writingsDir).filter((f) => f.endsWith(".md"));
	return files.map((file) => ({ slug: file.replace(".md", "") }));
}

export default async function Writing({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const filePath = path.join(process.cwd(), "..", "writings", `${slug}.md`);
	const content = fs.readFileSync(filePath, "utf-8");

	return (
		<main>
			<Markdown
				components={{
					h1: ({ children }) => <h1>{children}</h1>,
					h2: ({ children }) => <h2>{children}</h2>,
					p: ({ children }) => <p>{children}</p>,
					strong: ({ children }) => <strong>{children}</strong>,
					em: ({ children }) => <em>{children}</em>,
					img: ({ src, alt }) => {
						const imageSlug = getImageSlug(src);
						const imgSrc = typeof src === "string" ? src : undefined;
						return (
							<Link
								href={imageSlug ? `/images/${imageSlug}` : "#"}
								className="backlink"
							>
								<span className="backlink-thumb">
									<img src={imgSrc} alt="" className="thumb-img" />
								</span>
								{alt}
								<img
									src={imgSrc}
									alt={alt ?? ""}
									className="backlink-preview"
								/>
							</Link>
						);
					},
					a: ({ href, children }) => <a href={href}>{children}</a>,
					ul: ({ children }) => <ul>{children}</ul>,
					li: ({ children }) => <li>{children}</li>,
				}}
			>
				{content}
			</Markdown>
		</main>
	);
}

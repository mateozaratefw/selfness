import fs from "fs";
import path from "path";
import React from "react";
import Markdown from "react-markdown";
import ImageLink from "../components/ImageLink";
import MusicPlayer from "../components/MusicPlayer";

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

function stripFrontmatter(content: string) {
	return content.replace(/^---\n[\s\S]*?\n---\n/, "");
}

function processMusicLinks(children: React.ReactNode): React.ReactNode {
	const childArray = React.Children.toArray(children);
	const result: React.ReactNode[] = [];

	for (let i = 0; i < childArray.length; i++) {
		const child = childArray[i];
		const nextChild = childArray[i + 1];

		if (
			typeof child === "string" &&
			child.endsWith("▶") &&
			React.isValidElement(nextChild) &&
			typeof nextChild.props?.href === "string" &&
			nextChild.props.href.endsWith(".mp3")
		) {
			const textBefore = child.slice(0, -1);
			if (textBefore) result.push(textBefore);

			// Parse: Title|Album|Cover from link text
			const linkText = String(nextChild.props.children);
			const parts = linkText.split("|");
			const title = parts[0] || linkText;
			const album = parts[1] || "";
			const cover = parts[2] || "";

			result.push(
				<MusicPlayer
					key={`music-${i}`}
					src={nextChild.props.href}
					title={title}
					album={album}
					cover={cover}
				/>
			);
			i++;
		} else {
			result.push(child);
		}
	}
	return result;
}

export default async function Writing({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const filePath = path.join(process.cwd(), "..", "writings", `${slug}.md`);
	const rawContent = fs.readFileSync(filePath, "utf-8");
	const content = stripFrontmatter(rawContent);

	return (
		<main>
			<Markdown
				components={{
					h1: ({ children }) => <h1>{children}</h1>,
					h2: ({ children }) => <h2>{children}</h2>,
					p: ({ children }) => (
						<p className="mb-6">{processMusicLinks(children)}</p>
					),
					strong: ({ children }) => <strong>{children}</strong>,
					em: ({ children }) => <em>{children}</em>,
					img: ({ src, alt }) => {
						const imageSlug = getImageSlug(src);
						const imgSrc = typeof src === "string" ? src : undefined;
						if (!imageSlug || !imgSrc) {
							return <img src={imgSrc} alt={alt ?? ""} />;
						}
						return (
							<ImageLink
								href={`/images/${imageSlug}`}
								src={imgSrc}
								alt={alt ?? ""}
								slug={imageSlug}
							/>
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

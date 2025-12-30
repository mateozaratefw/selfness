interface TextWithImageProps {
	src: string | undefined;
	alt: string;
	href?: string;
	className?: string;
}

export default function TextWithImage({
	src,
	alt,
	href,
	className = "",
}: TextWithImageProps) {
	const content = (
		<>
			<span className="backlink-thumb">
				<img src={src} alt="" className="thumb-img" />
			</span>
			{alt}
		</>
	);

	if (href) {
		return (
			<a
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				className={`backlink no-underline ${className}`}
			>
				{content}
			</a>
		);
	}

	return <span className={`backlink ${className}`}>{content}</span>;
}

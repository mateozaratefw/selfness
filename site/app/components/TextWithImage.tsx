interface TextWithImageProps {
	src: string | undefined;
	alt: string;
	href?: string;
	className?: string;
	imgClassName?: string;
}

export default function TextWithImage({
	src,
	alt,
	href,
	className = "",
	imgClassName = "",
}: TextWithImageProps) {
	const content = (
		<>
			<span className="backlink-thumb">
				<img src={src} alt="" className={`thumb-img ${imgClassName}`} />
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

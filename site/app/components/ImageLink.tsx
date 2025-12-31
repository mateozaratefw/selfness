"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import TextWithImage from "./TextWithImage";

interface ImageLinkProps {
	href: string;
	src: string | undefined;
	alt: string;
	slug: string;
}

export default function ImageLink({ href, src, alt, slug }: ImageLinkProps) {
	const router = useRouter();

	const handleClick = useCallback(
		(e: React.MouseEvent) => {
			e.preventDefault();

			if (document.startViewTransition) {
				document.startViewTransition(() => {
					router.push(href);
				});
			} else {
				router.push(href);
			}
		},
		[href, router],
	);

	return (
		<Link href={href} className="backlink" onClick={handleClick}>
			<TextWithImage src={src} alt={alt} className="contents" />
			<img src={src} alt={alt} className="backlink-preview" />
		</Link>
	);
}

"use client";

import Image from "next/image";
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
		<Link
			href={href}
			className="group relative cursor-pointer text-primary hover:text-primary-dark transition-colors duration-150 whitespace-nowrap no-underline"
			onClick={handleClick}
		>
			<TextWithImage src={src} alt={alt} className="contents" />
			{src && (
				<span
					className="
						absolute left-1/2 -translate-x-1/2 top-full pt-4 z-100
						opacity-0 scale-[0.96] pointer-events-none origin-top
						transition-all duration-200 ease-out
						group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto
						group-hover:[transition-all duration-200 ease-in]
					"
				>
					<Image
						src={src}
						alt={alt}
						width={380}
						height={320}
						className="max-w-[380px] max-h-[320px] w-auto h-auto rounded-md shadow-[0_8px_32px_rgba(0,0,0,0.18),0_0_0_1px_rgba(0,0,0,0.06)]"
					/>
				</span>
			)}
		</Link>
	);
}

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface CarouselImage {
	src: string;
	title: string;
}

interface CarouselModalProps {
	images: CarouselImage[];
	initialIndex?: number;
}

export default function CarouselModal({
	images,
	initialIndex = 0,
}: CarouselModalProps) {
	const router = useRouter();
	const [currentIndex, setCurrentIndex] = useState(initialIndex);
	const [isLoading, setIsLoading] = useState(true);

	const currentImage = images[currentIndex];
	const hasPrev = currentIndex > 0;
	const hasNext = currentIndex < images.length - 1;

	const goToPrev = useCallback(() => {
		if (hasPrev) {
			setIsLoading(true);
			setCurrentIndex((i) => i - 1);
		}
	}, [hasPrev]);

	const goToNext = useCallback(() => {
		if (hasNext) {
			setIsLoading(true);
			setCurrentIndex((i) => i + 1);
		}
	}, [hasNext]);

	const onDismiss = useCallback(() => {
		router.back();
	}, [router]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onDismiss();
			} else if (e.key === "ArrowLeft") {
				e.preventDefault();
				goToPrev();
			} else if (e.key === "ArrowRight") {
				e.preventDefault();
				goToNext();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [onDismiss, goToPrev, goToNext]);

	const handleOverlayClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onDismiss();
		}
	};

	return (
		<div
			className="modal-overlay"
			onClick={handleOverlayClick}
			onKeyDown={(e) => {
				if (e.key === "Escape") onDismiss();
			}}
			role="dialog"
			aria-modal="true"
			tabIndex={-1}
		>
			{/* Left arrow */}
			{hasPrev && (
				<button
					type="button"
					onClick={goToPrev}
					className="fixed top-1/2 left-8 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-white/90 border border-black/15 rounded-full cursor-pointer text-fg transition-colors hover:bg-white hover:border-black/25 z-[1001]"
					aria-label="Previous image"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						aria-hidden="true"
					>
						<title>Previous</title>
						<path d="M15 18l-6-6 6-6" />
					</svg>
				</button>
			)}

			{/* Image content */}
			<div className="modal-content">
				<figure className="modal-image-container">
					{isLoading && (
						<div className="absolute inset-0 flex items-center justify-center">
							<div className="w-12 h-12 border-4 border-black/10 border-t-black/40 rounded-full animate-spin" />
						</div>
					)}
					<Image
						src={currentImage.src}
						alt={currentImage.title}
						className="modal-image max-h-[80vh] max-w-[85vw] h-auto w-auto"
						width={1200}
						height={800}
						onLoad={() => setIsLoading(false)}
					/>
					<figcaption className="modal-image-title">
						{currentImage.title}
						{images.length > 1 && (
							<span className="carousel-indicator">
								{currentIndex + 1} / {images.length}
							</span>
						)}
					</figcaption>
				</figure>
			</div>

			{/* Right arrow */}
			{hasNext && (
				<button
					type="button"
					onClick={goToNext}
					className="fixed top-1/2 right-8 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-white/90 border border-black/15 rounded-full cursor-pointer text-fg transition-colors hover:bg-white hover:border-black/25 z-[1001]"
					aria-label="Next image"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						aria-hidden="true"
					>
						<title>Next</title>
						<path d="M9 18l6-6-6-6" />
					</svg>
				</button>
			)}
		</div>
	);
}

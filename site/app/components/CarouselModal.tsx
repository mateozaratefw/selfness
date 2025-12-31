"use client";

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

	const currentImage = images[currentIndex];
	const hasPrev = currentIndex > 0;
	const hasNext = currentIndex < images.length - 1;

	const goToPrev = useCallback(() => {
		if (hasPrev) setCurrentIndex((i) => i - 1);
	}, [hasPrev]);

	const goToNext = useCallback(() => {
		if (hasNext) setCurrentIndex((i) => i + 1);
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
			role="dialog"
			aria-modal="true"
			tabIndex={-1}
		>
			{/* Left arrow */}
			{hasPrev && (
				<button
					type="button"
					onClick={goToPrev}
					className="carousel-arrow carousel-arrow-left"
					aria-label="Previous image"
				>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
						<path d="M15 18l-6-6 6-6" />
					</svg>
				</button>
			)}

			{/* Image content */}
			<div className="modal-content">
				<figure className="modal-image-container">
					<img
						src={currentImage.src}
						alt={currentImage.title}
						className="modal-image"
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
					className="carousel-arrow carousel-arrow-right"
					aria-label="Next image"
				>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
						<path d="M9 18l6-6-6-6" />
					</svg>
				</button>
			)}
		</div>
	);
}

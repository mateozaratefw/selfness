"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

export default function Modal({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const overlayRef = useRef<HTMLDivElement>(null);

	const onDismiss = useCallback(() => {
		router.back();
	}, [router]);

	const onKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onDismiss();
			}
		},
		[onDismiss]
	);

	useEffect(() => {
		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, [onKeyDown]);

	const handleOverlayClick = (e: React.MouseEvent) => {
		if (e.target === overlayRef.current) {
			onDismiss();
		}
	};

	return (
		<div
			className="modal-overlay"
			ref={overlayRef}
			onClick={handleOverlayClick}
			onKeyDown={(e) => e.key === "Escape" && onDismiss()}
			role="dialog"
			aria-modal="true"
			tabIndex={-1}
		>
			<button type="button" className="modal-close" onClick={onDismiss} aria-label="Close">
				×
			</button>
			<div className="modal-content">{children}</div>
		</div>
	);
}

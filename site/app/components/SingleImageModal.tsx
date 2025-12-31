"use client";

import Image from "next/image";
import { useState } from "react";
import Modal from "./Modal";

interface SingleImageModalProps {
	src: string;
	title: string;
}

export default function SingleImageModal({ src, title }: SingleImageModalProps) {
	const [isLoading, setIsLoading] = useState(true);

	return (
		<Modal>
			<figure className="modal-image-container">
				{isLoading && (
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="w-12 h-12 border-4 border-black/10 border-t-black/40 rounded-full animate-spin" />
					</div>
				)}
				<Image
					src={src}
					alt={title}
					width={1200}
					height={800}
					className="modal-image max-h-[80vh] max-w-[85vw] h-auto w-auto"
					onLoad={() => setIsLoading(false)}
				/>
				<figcaption className="modal-image-title">{title}</figcaption>
			</figure>
		</Modal>
	);
}

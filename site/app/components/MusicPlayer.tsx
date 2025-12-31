"use client";

import { useState, useEffect } from "react";
import { togglePlay, subscribe, isTrackPlaying } from "../lib/audioState";

export default function MusicPlayer({
	src,
	title,
	album,
	cover,
}: {
	src: string;
	title: string;
	album: string;
	cover: string;
}) {
	const [isPlaying, setIsPlaying] = useState(false);

	useEffect(() => {
		const update = () => setIsPlaying(isTrackPlaying(src));
		update();
		return subscribe(update);
	}, [src]);

	const handleClick = () => {
		togglePlay({ src, title, album, cover });
	};

	return (
		<button
			onClick={handleClick}
			className="inline bg-transparent border-none p-0 m-0 font-[inherit] cursor-pointer text-primary hover:text-primary-dark transition-colors duration-150"
		>
			<span className="mr-1 text-[0.85em]">{isPlaying ? "■" : "▶"}</span>
			{title}
		</button>
	);
}

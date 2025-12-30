import fs from "fs";
import path from "path";
import Modal from "../../../components/Modal";

const SUPPORTED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];

function getImages() {
	const imagesDir = path.join(process.cwd(), "public", "images");

	if (!fs.existsSync(imagesDir)) {
		return [];
	}

	return fs.readdirSync(imagesDir).filter((file) => {
		const ext = path.extname(file).toLowerCase();
		return SUPPORTED_EXTENSIONS.includes(ext);
	});
}

function slugify(filename: string): string {
	const name = filename.substring(0, filename.lastIndexOf("."));
	return name
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)/g, "");
}

function formatTitle(filename: string): string {
	const name = filename.substring(0, filename.lastIndexOf("."));
	return name.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default async function ImageModal({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const images = getImages();

	const imageFile = images.find((file) => slugify(file) === slug);

	if (!imageFile) {
		return (
			<Modal>
				<p>Image not found</p>
			</Modal>
		);
	}

	const title = formatTitle(imageFile);
	const imagePath = `/images/${imageFile}`;

	return (
		<Modal>
			<figure className="modal-image-container">
				<img src={imagePath} alt={title} className="modal-image" />
				<figcaption className="modal-image-title">{title}</figcaption>
			</figure>
		</Modal>
	);
}

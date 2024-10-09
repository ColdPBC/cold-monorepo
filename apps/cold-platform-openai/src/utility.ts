export function isImage(extension: string) {
	return ['png', 'jpg', 'gif', 'bmp', 'tiff', 'jpeg', 'heic'].includes(extension.toLowerCase());
}

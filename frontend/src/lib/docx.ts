import mammoth from "mammoth";

export async function parseDocx(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const { value } = await mammoth.extractRawText({ buffer });
  return value;
}

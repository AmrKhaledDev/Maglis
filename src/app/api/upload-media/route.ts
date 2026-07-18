import cloudinary from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";
// ===================================================
const allowedFileTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "video/mp4",
  "video/webm",
];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const MAX_VIDEO_SIZE = 100 * 1024 * 1024;
const ALLOWED_PATHNAMES = ["maglis-media"];
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const pathname = formData.get("pathname") as string;
    if (!file || !(file instanceof File))
      return NextResponse.json(
        { error: "برجاء رفع ملف صالح" },
        { status: 400 },
      );
    if (!pathname)
      return NextResponse.json(
        { error: "حدث خطأ غير متوقع أثناء رفع الملفات الخاصة بك" },
        { status: 500 },
      );
    if (!ALLOWED_PATHNAMES.includes(pathname))
      return NextResponse.json(
        { error: "حدث خطأ أثناء حفظ ملفاتك" },
        { status: 400 },
      );
    if (!allowedFileTypes.includes(file.type))
      return NextResponse.json(
        { error: "عذراً هناك ملف غير مدعوم" },
        { status: 400 },
      );
    const fileType = file.type.startsWith("video/") ? "video" : "image";
    if (fileType === "video" && file.size > MAX_VIDEO_SIZE)
      return NextResponse.json(
        {
          error: "لا يمكنك رفع فيديو يتخطى 100 ميجابايت",
        },
        { status: 400 },
      );
    if (fileType === "image" && file.size > MAX_IMAGE_SIZE)
      return NextResponse.json(
        {
          error: "لا يمكنك رفع صورة تتخطى حجم 5 ميجابايت",
        },
        { status: 400 },
      );
    const fileBuffer = await file.arrayBuffer();
    const base64Data = Buffer.from(fileBuffer).toString("base64");
    const fileUri = `data:${file.type};base64,${base64Data}`;
    const uploader = await cloudinary.uploader.upload(fileUri, {
      folder: pathname,
      resource_type: "auto",
    });
    return NextResponse.json(
      { url: uploader.secure_url, type: fileType.toUpperCase() },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء رفع الملفات الخاصه بك" },
      { status: 500 },
    );
  }
}

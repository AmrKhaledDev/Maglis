import cloudinary from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";
import fileValidation from "./fileValidation";
// ===================================================
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const result = fileValidation(file);
    if (!result.success || !result.fileType || !result.file)
      return NextResponse.json(
        {
          error: result.message || "حدث خطأ غير متوقع أثناء الرفع.",
        },
        { status: 400 },
      );
    const validFile = result.file;
    const fileType = result.fileType;
    const fileBuffer = await validFile.arrayBuffer();
    const base64Data = Buffer.from(fileBuffer).toString("base64");
    const fileUri = `data:${validFile.type};base64,${base64Data}`;
    const uploader = await cloudinary.uploader.upload(fileUri, {
      folder: "maglis-media",
      resource_type:
        fileType === "image"
          ? "image"
          : fileType === "video"
            ? "video"
            : "image",
      timeout: 120000,
      format: fileType === "pdf" ? "pdf" : undefined,
      flags: fileType === "pdf" ? "attachment" : undefined,
      use_filename: true,
      public_id: validFile.name.split(".")[0],
    });
    return NextResponse.json(
      {
        url: uploader.secure_url,
        type: fileType.toUpperCase(),
        name: validFile.name,
        size: validFile.size,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error:
          "حدث خطأ أثناء رفع الملفات الخاصه بك برجاء التأكد من الإتصال بالإنترنت أو التأكد من حجم الملف.",
      },
      { status: 500 },
    );
  }
}

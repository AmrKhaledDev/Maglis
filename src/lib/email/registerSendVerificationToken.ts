import nodemailer from "nodemailer";
export const registerSendVerificationToken = async (
  email: string,
  verificationToken: string,
  name: string,
): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const transporter = nodemailer.createTransport({
      secure: true,
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS,
      },
    });
    if (!email.trim() || !verificationToken.trim() || !name.trim())
      return {
        success: false,
        message: "حدث خطأ غير متوقع أثناء ارسال رابط التحقق",
      };
    const verificationLink = `${process.env.DOMAIN}/verify/${verificationToken}`;
    await transporter.sendMail({
      from: '" مَجلِس " <no-reply@maro.vip53@gmail.com>',
      to: email,
      subject: "🔑 تفعيل حسابك - خطوة واحدة وتبدأ رحلتك معنا",
      html: `
    <div dir="rtl" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 550px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);">
      <div style="background: linear-gradient(135deg, #2563eb, #1d4ed8); padding: 35px 20px; text-align: center;">
        <h2 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.5px;">تأكيد البريد الإلكتروني</h2>
      </div>
      
      <div style="padding: 30px 25px; text-align: right; color: #334155;">
        <p style="font-size: 16px; margin-bottom: 10px; color: #0f172a;">مرحباً <b>${name}</b>،</p>
        <p style="font-size: 14px; line-height: 1.6; color: #64748b; margin-bottom: 25px;">
          سعداء بانضمامك إلينا! لتفعيل حسابك والبدء في استخدام المنصة بشكل آمن، يرجى الضغط على زر التفعيل بالأسفل:
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationLink}" style="background-color: #2563eb; color: #ffffff; padding: 14px 35px; text-decoration: none; border-radius: 8px; font-size: 15px; font-weight: bold; display: inline-block; box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);">
            تفعيل الحساب الآن
          </a>
        </div>
        
        <hr style="border: 0; border-top: 1px solid #edf2f7; margin: 25px 0;" />
        <p style="font-size: 12px; line-height: 1.5; color: #94a3b8;">
          إذا واجهتك مشكلة في الضغط على الزر، يمكنك نسخ الرابط التالي ولصقه في متصفحك:
          <br />
          <a href="${verificationLink}" style="color: #2563eb; text-decoration: none; word-break: break-all; display: block; margin-top: 5px; font-family: monospace;">
            ${verificationLink}
          </a>
        </p>
      </div>
      
      <div style="background-color: #f8fafc; padding: 20px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #f1f5f9;">
        <p style="margin: 0 0 5px 0;">هذا الإيميل أُرسل إليك تلقائياً، يرجى عدم الرد عليه.</p>
        <p style="margin: 0;">© 2026 شركتك. جميع الحقوق محفوظة.</p>
      </div>
      
    </div>
  `,
    });
    return {
      success: true,
      message: "تم إرسال رابط تحقق إلى بريدك الإلكتروني",
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "حدث خطأ أثناء إرسال رابط التحقق" };
  }
};

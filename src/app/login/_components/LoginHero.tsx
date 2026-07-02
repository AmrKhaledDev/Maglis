import { Star } from "lucide-react";
import Image from "next/image";
// ========================================
function LoginHero() {
  return (
    <div className="space-y-10">
      <div className="flex items-center gap-2">
        <Image src={"/group_users.png"} alt="group" width={80} height={80} />
        <div className="space-y-1">
          <div className="flex items-center gap-px">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star
                  key={i}
                  className="fill-amber-400 text-transparent size-4.5"
                />
              ))}
          </div>
          <p className="text-sm text-gray-200">
            أكثر من 17,000 مغامر بالداخل بالفعل
          </p>
        </div>
      </div>
      <h1 className="text-5xl max-w-170 font-extrabold leading-normal">
        ادخل إلى عالمٍ تتلألأ فيه الروابط وتشرق فيه المحادثات.
      </h1>
      <p className="max-w-150 text-gray-200 font-normal">
        اخطُ عبر بوابة الخيال، والتقِ بالأرواح المتآلفة، واجعل رسائلك تتوهج
        بالحياة. كل قصة، كل همسة، وكل ضحكة تصبح شرارة في السماء الرقمية.
      </p>
    </div>
  );
}

export default LoginHero;

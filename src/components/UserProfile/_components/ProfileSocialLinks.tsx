import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebook, FaGithub, FaLinkedin, FaSquareXTwitter } from "react-icons/fa6";
// =====================================================================================
function ProfileSocialLinks() {
  return (
    <div className="w-full flex flex-col gap-7">
      <h2 className="font-bold text-xl text-gray-200">روابط التواصل</h2>
      <div className="grid grid-cols-5 gap-5 cursor-pointer">
        <div className="p-3 hover:bg-white/30 hover:scale-102 mytransition flex flex-col gap-2 items-center ring-1 ring-gray-50/10 bg-white/10 rounded-2xl shadow">
          <FaGithub className="text-xl" />
          <p className="font-bold text-shadow-2xs">Github</p>
        </div>
        <div className="p-3 hover:bg-white/30 hover:scale-102 mytransition flex flex-col gap-2 items-center ring-1 ring-gray-50/10 bg-white/10 rounded-2xl shadow">
          <FaFacebook className="text-xl" />
          <p className="font-bold text-shadow-2xs">Facebook</p>
        </div>
        <div className="p-3 hover:bg-white/30 hover:scale-102 mytransition flex flex-col gap-2 items-center ring-1 ring-gray-50/10 bg-white/10 rounded-2xl shadow">
          <FaSquareXTwitter className="text-xl" />
          <p className="font-bold text-shadow-2xs">X</p>
        </div>
        <div className="p-3 hover:bg-white/30 hover:scale-102 mytransition flex flex-col gap-2 items-center ring-1 ring-gray-50/10 bg-white/10 rounded-2xl shadow">
          <FaInstagramSquare className="text-xl" />
          <p className="font-bold text-shadow-2xs">Instagram</p>
        </div>
        <div className="p-3 hover:bg-white/30 hover:scale-102 mytransition flex flex-col gap-2 items-center ring-1 ring-gray-50/10 bg-white/10 rounded-2xl shadow">
          <FaLinkedin className="text-xl" />
          <p className="font-bold text-shadow-2xs">Linkedin</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileSocialLinks;

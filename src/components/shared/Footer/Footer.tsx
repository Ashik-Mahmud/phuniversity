// react icons
import { BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import { CgFacebook } from "react-icons/cg";
import { SlArrowUp } from "react-icons/sl";
import TextLogo from "../../ui/TextLogo";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="bg-primary/5 boxShadow rounded-xl w-full p-3 lg:p-4 relative">
      <div className="w-full flex items-center justify-center pt-[30px] flex-col gap-[20px] pb-[130px]">
        <TextLogo />

        <p className="text-[0.9rem] text-center sm:text-start text-gray-600">
          High level experience in web design and development knowledge,
          producing quality work.
        </p>

        <button className="py-3 px-6 rounded-full bg-primary text-white">
          Contact Us
        </button>

        <div className="flex gap-[15px] text-black mt-4">
          <a className="text-[1.3rem] p-1.5 cursor-pointer rounded-full bg-white text-text shadow">
            <CgFacebook />
          </a>
          <a className="text-[1.2rem] p-1.5 cursor-pointer rounded-full bg-white text-text shadow">
            <BsTwitter />
          </a>
          <a className="text-[1.2rem] p-1.5 cursor-pointer rounded-full bg-white text-text shadow">
            <BsInstagram />
          </a>
          <a className="text-[1.2rem] p-1.5 cursor-pointer rounded-full bg-white text-text shadow">
            <BsLinkedin />
          </a>
        </div>
      </div>

      <div className="z-30 absolute bottom-10 left-0 right-0 px-10 flex items-center justify-between w-full">
        <p className="text-[0.9rem] text-gray-400">
          © 2024 All Rights Reserved
        </p>

        <SlArrowUp className="p-2 rounded-full border border-gray-400 cursor-pointer text-[2rem] text-gray-400" />
      </div>
    </footer>
  );
};

export default Footer;

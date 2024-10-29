const HeroSection = () => {
  return (
    <div className="w-full bg-[#fff] rounded-md relative mb-20">
      {/* header */}
      <header className="flex lg:flex-row flex-col items-center gap-12 lg:gap-0 justify-between px-8 mt-10">
        <div className="w-full lg:w-[45%]">
          <p>Hi there!</p>
          <h1 className="text-[40px] sm:text-[60px] font-semibold leading-[45px] sm:leading-[70px]">
            <span className="text-[#DC0155]">Luxe</span> is here to be your
            assistance
          </h1>
          <p className="mt-2 text-[1rem]">
            I am here ready to help you in making creative digital products
          </p>
        </div>

        <div className="w-full lg:w-[55%]">
          <img
            src="https://i.ibb.co/syHFhNy/image.png"
            alt="image"
            className=""
          />
        </div>
      </header>

      <section className="px-8 pb-[30px]">
        <h1 className="text-[1.3rem] font-semibold">Our Service</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] mt-10 w-[70%]">
          <div>
            <img
              src="https://i.ibb.co/z721j8b/Vector.png"
              alt="Vector"
              className="w-[30px]"
            />
            <h4 className="text-[1.1rem] mt-3">Branding</h4>
            <p className="text-[0.9rem] text-gray-500 mt-1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div>
            <img
              src="https://i.ibb.co/Qn78BRJ/Ui-Design.png"
              alt="Vector"
              className="w-[30px]"
            />
            <h4 className="text-[1.1rem] mt-3">UI/UX</h4>
            <p className="text-[0.9rem] text-gray-500 mt-1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div>
            <img
              src="https://i.ibb.co/GcsvXxk/Product.png"
              alt="Vector"
              className="w-[30px]"
            />
            <h4 className="text-[1.1rem] mt-3">Product Design</h4>
            <p className="text-[0.9rem] text-gray-500 mt-1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
      </section>

      {/* right blur shadow */}
      <div className="w-[100px] h-[100px] bg-[#DC0155] blur-[90px] absolute bottom-[80px] right-[80px]"></div>
    </div>
  );
};

export default HeroSection;

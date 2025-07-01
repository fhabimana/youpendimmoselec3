import SearchForm from "./SearchForm";

const Hero = () => {
  return (
    <section className="relative h-[600px] bg-cover bg-center bg-no-repeat">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 max-w-4xl">
          TROUVEZ VOTRE MAISON & TERRAINS
          <br />
          <span className="text-brand-blue">PARTOUT EN RDC</span>
        </h1>

        {/* Search Form */}
        <div className="w-full max-w-4xl">
          <SearchForm />
        </div>
      </div>
    </section>
  );
};

export default Hero;

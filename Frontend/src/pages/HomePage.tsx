const HomePage = () => {
  return (
 <div 
  className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center relative overflow-hidden"
  style={{ backgroundImage: "url('/t.jpg.webp')" }}
>
  
 
  <p className="tennis-ball text-6xl">🎾</p>

  <section
    className="
      home-Box
      bg-black
      border border-[#68b8ce]
      rounded-xl 
      p-6 
      shadow-lg 
      text-white 
      w-130
      text-center
    "
  >
    <div className="relative w-full h-[150px]">
      <h3 className="text-2xl font-bold">Welcome to sportsworld!</h3>
      <p className="text-lg py-5">
        Please navigate to one of our pages to perform your task
      </p>
      <h2 className="text-lg font-bold text-[#68b8ce]">
        Build your dream sport event
      </h2>
    </div>
  </section>
</div>

  );
};

export default HomePage;

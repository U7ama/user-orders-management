import LoginForm from "./components/LoginForm";
import Header from "./components/Header";
import Register from "./components/Register";
function Home() {
  return (
    <>
     <Header />
    <section className="w-full min-h-screen hero-gradient loginWrapper">
        <img
          src="/corner-shape.svg"
          alt=""
          className="absolute left-0 top-0 w-[150px] z-[1]"
        />
    
     </section>
      {/* <Header />
      <Register /> */}
      {/* <Header />
      <div className="Home">
        <LoginForm />
      </div> */}
    </>
  );
}

export default Home;

import "./Navbar.css";

function Navbar() {
  return (
    <>
      <div
        id="navBar"
        className="flex items-center
                    w-screen h-12 p-3
                    top-0  left-0 sticky z-40 
                    bg-white border-b-2 border-black 
                    font-extrabold text-lg underline"
      >
        <a href="/" className="left-6 top-2 fixed ">
          Home(game selection)
        </a>
        <a href="/leaderboard" className="left-72 top-2 fixed">
          Leaderboard
        </a>
      </div>
    </>
  );
}

export default Navbar;

import Logo from "./_components/Logo";
import SearchBar from "./_components/SearchBar";
import NotificationLink from "./_components/NotificationLink";
// ========================================
function Header() {
  return (
    <header className="border-b sticky top-0 bg-linear-to-r from-slate-900 to-slate-800 z-10 border-b-white/5 py-1 mb-2">
      <div className="mycontainer flex items-center justify-between">
        <Logo />
        <SearchBar />
        <NotificationLink />
      </div>
    </header>
  );
}

export default Header;

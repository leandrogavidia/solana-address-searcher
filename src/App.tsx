import { Searcher } from "./components/searcher";
import { ShortcutToSearch } from "./components/shortcut-to-search";
import "./styles/global.css";

function App() {
  // Add docker file and docker compose
  // Add image on docker hub on the readme
  // How to add a env variable in github pages
  // How to add a env variable in Dcoker

  if (!import.meta.env.VITE_SOLANA_RPC) {
    throw new Error(
      "Solana RPC is not defined. Set your Solana RPC on your .env file."
    );
  }

  return (
    <main className="h-full w-full flex justify-center items-center flex-col relative">
      <Searcher />
      <ShortcutToSearch />
    </main>
  );
}

export { App };

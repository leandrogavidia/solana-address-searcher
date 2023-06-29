const ShortcutToSearch = () => {
  return (
    <p
      className="
      fixed top-5 right-5 shadow-lg bg-fourth px-4 py-3
      [&_kbd]:bg-gray-700 [&_kbd]:font-bold [&_kbd]:px-2 [&_kbd]:rounded-sm [&_kbd]:shadow-lg [&_kbd]:inline-block [&_kbd]:align-middle [&_kbd]:h-full"
    >
      <kbd>Alt</kbd> + <kbd>S</kbd> to search
    </p>
  );
};

export { ShortcutToSearch };

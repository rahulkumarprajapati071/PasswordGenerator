import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowd, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copyText,setCopyText] = useState("copy");
  //useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (characterAllowd) str += "!@#$%^&*-_=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }

    setPassword(pass);
  }, [length, numberAllowed, characterAllowd]);

  const copyPassswordToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    setCopyText("copied")
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,100)
  }) 

  useEffect(() => {
    passwordGenerator()
    setCopyText("copy")
  }, [length,numberAllowed,characterAllowd])

  return (
    <div className="bg-slate-700 p-3 mt-6 rounded-xl px-[10px] text-yellow-300">
      <h1 className="text-white text-center my-3">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none px-3 w-full py-1 md:w-[600px] sm:w-[400px] text-green-400 font-bold"
          placeholder="password"
          readOnly
          ref={passwordRef}
        />
        <button onClick={copyPassswordToClipboard} className="outline-none bg-blue-700 text-white px-3 py-1 hover:bg-blue-900">
          {copyText}
        </button>
      </div>
      <div className="flex text-sm gap-x-2 space-y-2 md:space-y-0 sm:space-y-0 flex-col md:flex-row sm:flex-row">
        <div className="flex items-center justify-center gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label className="mx-1 md:mx-0 sm:mx-0">Length: {length}</label>
        </div>

        <div className="flex gap-x-2 justify-center space-x-2 md:space-x-0 sm:space-x-0">
          <div className="flex items-center gap-x-1 space-x-1 md:space-x-0 sm:space-x-0">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label>Numbers</label>
          </div>
          <div className="flex items-center gap-x-1 space-x-1 md:space-x-0 sm:space-x-0">
            <input
              type="checkbox"
              defaultChecked={characterAllowd}
              id="characterInput"
              onChange={() => {
                setCharacterAllowed((prev) => !prev);
              }}
            />
            <label>Characters</label>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;

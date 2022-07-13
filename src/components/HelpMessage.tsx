const HelpMessage = () => {
  return (
    <div className="flex flex-col ml-auto mr-auto mt-10 w-6/12 justify-start">
      <h1 className="text-white bg-black p-4">
        {" "}
        Oh no! We can't find any tokens, Please make sure your wallet is synced
        and you have purchased the token
        <a
          className="underline ml-2"
          href="https://objkt.com/asset/KT1SGdop74rGobKAETcBPnz9yQkH38hZnpBh/1"
          target="_blank"
          rel="noreferrer"
        >
          here
        </a>
      </h1>
    </div>
  );
};

export default HelpMessage;

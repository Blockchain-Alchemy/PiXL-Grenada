import { ItemType } from "../types";
import { useSelector } from 'react-redux';

type EntryCoinProps = {
  sendCoin: (coin: ItemType) => void,
};

const EntryCoin = ({ sendCoin }: EntryCoinProps): JSX.Element => {
  const gameState = useSelector((state: any) => state.gameState);
  console.log('gameState.entryCoins', gameState.entryCoins)

  const handleSendCoin = (coin: ItemType) => {
    const element = document.getElementById(coin.alt);
    if (element) {
      element.className = 'card animate__animated animate__backOutUp';
    }
    sendCoin(coin);
  };

  return (
    <section className="card-list mt-2 ml-auto mr-auto items-center justify-center">
      {gameState.entryCoins.map((coin, index) => (
        <div
          key={index}
          id={coin.alt}
          onClick={(e) => handleSendCoin(coin)}
          className="card entry-card"
        >
          <img
            className="ml-auto mr-auto"
            src={coin.imageSrc}
            alt="this slowpoke moves"
            style={{
              height: "190px",
              width: "202px",
              marginTop: "10px",
            }}
          />
        </div>
      ))}
    </section>
  );
};

export default EntryCoin;

import { useSelector } from 'react-redux';

type GameItemsProps = {
  addCard: (
    id: string,
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    cardId: number | undefined
  ) => void;
};

const GameItems = ({ addCard }: GameItemsProps): JSX.Element => {
  const gameState = useSelector((state: any) => state.gameState);
  console.log('gameItems', gameState.gameItems)

  return (
    <section className="card-list mt-2 ml-auto mr-auto items-center justify-center">
      {gameState.gameItems.map((item, index) => (
        <div
          key={index}
          id={item.alt}
          onClick={(e) => addCard(item.alt, e, item.unityCardIdentifier)}
          className="card"
        >
          <img
            className="ml-auto mr-auto"
            src={item.imageSrc}
            alt="this slowpoke moves"
            style={{
              height: '202px',
              width: '202px',
            }}
          />
        </div>
      ))}
    </section>
  );
};

export default GameItems;

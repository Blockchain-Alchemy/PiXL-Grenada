import { useSelector } from 'react-redux';

type GameItemsProps = {
  consumeItem: (item: any) => void;
};

const GameItems = ({ consumeItem }: GameItemsProps): JSX.Element => {
  const gameState = useSelector((state: any) => state.gameState);
  console.log('gameItems', gameState.gameItems);

  // const handleItemClicked = (
  //   id: string,
  //   e: React.MouseEvent<HTMLElement, MouseEvent>,
  //   cardId: number | undefined
  // ) => {
  //   if (!isInventoryFull && cardId) {
  //     const element = document.getElementById(id);
  //     if (element) {
  //       element.className = 'card animate__animated animate__backOutUp';
  //     }
  //     sendGameController('AddItem', cardId);
  //     setSentItemId(id);
  //     setInventoryFull(true);
  //   } else {
  //     toast.error('Inventory is full could not complete request');
  //   }
  // };

  const handleItemClicked = (item: any) => {
    const element = document.getElementById(item.alt);
    if (element) {
      element.className = 'card animate__animated animate__backOutUp';
    }
    consumeItem(item);
  };

  return (
    <section className="card-list mt-2 ml-auto mr-auto items-center justify-center">
      {gameState.gameItems.map((item, index) => (
        <div
          key={index}
          id={item.alt}
          onClick={(e) => handleItemClicked(item)}
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

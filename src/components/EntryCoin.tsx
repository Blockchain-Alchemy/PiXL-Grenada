import { ItemType } from "../types";

type EntryCoinProps = {
  coin: ItemType[];
  sendCoin: (
    id: string,
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    cardId: string,
    cardNumber: number | undefined
  ) => void;
};

const EntryCoin = ({ coin, sendCoin }: EntryCoinProps): JSX.Element => {
  console.log("entrycoin", coin);
  return (
    <section className="card-list mt-2 ml-auto mr-auto items-center justify-center">
      {coin.map((data, index) => (
        <div key={index}>
          {data.id === 0 && (
            <div
              key={data.alt}
              id={data.alt}
              onClick={(e) => sendCoin(data.alt, e, data.alt, data.id)}
              className="card entry-card"
            >
              <img
                className="ml-auto mr-auto"
                src={data.imageSrc}
                alt="this slowpoke moves"
                style={{
                  height: "190px",
                  width: "202px",
                  marginTop: "10px",
                }}
              />
            </div>
          )}
          {data.id === 1 && (
            <div
              key={data.alt}
              id={data.alt}
              onClick={(e) => sendCoin(data.alt, e, data.alt, data.id)}
              className="card beets-card"
            >
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default EntryCoin;

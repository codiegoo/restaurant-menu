import Image from "next/image";
import './dishGrid.sass'

export default function DishGrid({ dishes }) {
  return (
    <div className="dishesContain">
      {dishes.map((dish, index) => (
        <div
          key={index}
          className="dishCard"
        >
          <Image className="dishImage" src={dish.image} width={200} height={160}/>
          <h3 className="dishTitle">{dish.name}</h3>
          <p className="disPrice">{dish.price}</p>
        </div>
      ))}
    </div>
  );
}

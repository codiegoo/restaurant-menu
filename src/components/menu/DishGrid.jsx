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
          <Image className="dishImage" src={dish.image} width={200} height={160} alt="imagen de una categoria del menu de la cafeteria ubicada en los mochis sinaloa"/>
          <h3 className="dishTitle">{dish.name}</h3>
          <p className="disPrice">{dish.price}$</p>
        </div>
      ))}
    </div>
  );
}

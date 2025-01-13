import './dishDetail.sass'

export default function DishDetail({ dish, onClose }) {
  return (
    <div className="dishDetailContain" onClick={onClose}>
      <div className="dishDetailInner">
        <div className="dishTextContain">
          <img src={dish.image} alt={`Imagen de ${dish.name}`} width={100} height={100} />
          <div className="dishTextInner">
            <h6>{dish.name}</h6>
            <p>{dish.description}</p>
            <p>Precio: {dish.price}$</p>
          </div>
        </div>
        <div className="extrasContain">
          <p>Extras:</p>
          {dish.extras.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

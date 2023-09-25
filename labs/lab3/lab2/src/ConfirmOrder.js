import { useParams, useOutletContext } from "react-router-dom";

export default function ConfirmOrder() {
  const { id } = useParams();
  const props = useOutletContext();

  const salad = props.shoppingCart.find(salad => salad.uuid === id);
  return (!salad) ?
    (
      <div className="mt-3 alert alert-danger alert-dismissible fade show" role="alert">
        <p>Vi hittade inte din beställning</p>
      </div>
    ) : (
      <div className="mt-3 alert alert-success alert-dismissible fade show" role="alert">
        <p>Din beställning är bekräftad!</p>
      </div>
    )
}

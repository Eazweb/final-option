import Container from "@/app/components/container";
import OrderDetails from "./order-details";
import getOrderById from "@/actions/got-order-by-id";
import NullData from "@/app/components/null-data";
import OrderGrid from "./order-grid";
import OrderReceipt from "./order-receipt";
import getCurrentUser from "@/actions/get-current-user";

interface ItemParams {
  orderId: string;
}

const Order = async ({ params }: { params: ItemParams }) => {
  const order = await getOrderById(params);
  const currentUser = await getCurrentUser();

  if (!order) return <NullData title="No order" />;
  if (!currentUser) return <NullData title="Unauthorized" />;

  return (
    <div className="p-1 sm:p-8">
      <Container>
        <OrderReceipt 
          order={order} 
          userEmail={currentUser.email || ""} 
          userName={currentUser.name || ""}
        />
        <OrderDetails order={order} />
        <OrderGrid order={order} />
      </Container>
    </div>
  );
};

export default Order;

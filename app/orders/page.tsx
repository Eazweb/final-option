import Container from "@/app/components/container";
import OrdersClient from "./orders-client";
import getCurrentUser from "@/actions/get-current-user";
import NullData from "@/app/components/null-data";
import getOrdersByUserId from "@/actions/get-orders-by-user-id";
import { Suspense } from "react";

export const dynamic = "force-dynamic";


const Orders = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <NullData title="Oops! Access denied" />;
  }

  const orders = await getOrdersByUserId(currentUser.id);

  if (!orders) {
    return <NullData title="No orders yet..." />;
  }

  return (
    <div className="pt-8 pb-8">
      <Container>
        <Suspense fallback={<div>Loading orders...</div>}>
          <OrdersClient orders={orders} />
        </Suspense>
      </Container>
    </div>
  );
};

export default Orders;

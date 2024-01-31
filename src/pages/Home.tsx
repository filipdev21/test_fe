import React, { ReactElement, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts, orderProduct, getOrders } from '@services';
import ProductCard from '@components/ProductCard';
import HistoryChart from '@components/HistoryChart';
import { AuthContext } from '../providers/AuthProvider';
import { Button } from '@material-tailwind/react';
import { toast } from 'react-toastify';

const Home = (): ReactElement => {
  const { data, isLoading } = useQuery({
    queryKey: ['getProducts'],
    queryFn: getProducts,
    retry: false
  });

  const { data: orderResponse } = useQuery({
    queryKey: ['getOrders'],
    queryFn: getOrders,
    retry: false
  });

  const { user, handleLogout } = useContext(AuthContext);

  const handleOrder = async (id: string) => {
    try {
      await orderProduct({
        productId: id,
        customerId: user?.id ?? ''
      });
      toast('Product is ordered successfully!', {
        type: 'success'
      });
    } catch (e: any) {
      toast(e.response?.data?.message ?? 'Internal Server error', {
        type: 'error'
      });
    }
  };

  return (
    <div className="h-full p-10">
      <div className="flex items-center justify-between gap-4 pb-10">
        <h1 className="text-4xl font-bold mb-6 flex-1">Products</h1>
        <span className="font-bold">{`${user?.name}, ${user?.email}`}</span>
        <Button variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <HistoryChart orders={orderResponse?.data.data ?? []} />

      <h2 className="font-bold text-lg text-gray-700 mb-6">Current products</h2>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7 3xl:grid-cols-8 gap-4">
        {!isLoading &&
          data?.data &&
          data.data?.data?.map((product, index) => (
            <ProductCard
              key={index}
              name={product.name}
              onOrder={() => handleOrder(product.id)}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;

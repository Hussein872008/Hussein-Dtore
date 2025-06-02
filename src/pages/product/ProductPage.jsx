import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById, clearProductDetails } from '../../redux/slices/productDetailsSlice';
import ProductDetails from './ProductDetails';
import EmptyState from '../../components/common/EmptyState';
import LoadingSpinner from '../../components/common/LoadingSpinner';

function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, status, error } = useSelector((state) => state.productDetails);

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      navigate('/not-found', { replace: true });
      return;
    }

    dispatch(fetchProductById(id));

    return () => {
      dispatch(clearProductDetails());
    };
  }, [dispatch, id, navigate]);

  if (status === 'loading') {
    return (
      <div className="bg-primaryBg min-h-screen flex items-center justify-center">
        <LoadingSpinner fullPage color="#C2B823" />
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="container mx-auto p-4 bg-primaryBg rounded-lg shadow-md">
        <EmptyState 
          title="Product not found"
          message={error || "The product you're looking for doesn't exist or may have been removed."}
          action={() => navigate('/products')}
          actionText="Browse Products"
          icon="❌"
          className="text-redAccent"  
          buttonClass="bg-yellowAccent hover:bg-darkGreen text-primaryBg"
        />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto p-4 bg-primaryBg rounded-lg shadow-md">
        <EmptyState 
          title="No product data"
          message="Unable to load product details at this time."
          action={() => window.location.reload()}
          actionText="Refresh Page"
          className="text-grayMedium"
          buttonClass="bg-yellowAccent hover:bg-darkGreen text-primaryBg"
        />
      </div>
    );
  }

  return <ProductDetails />;
}

export default ProductPage;

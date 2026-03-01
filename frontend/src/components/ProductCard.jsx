import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button
} from '@heroui/react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function ProductCard({ product }) {
  const { t } = useTranslation();

  return (
    <Card className="w-full rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900">
      <CardHeader className="flex cursor-pointer flex-col items-center justify-center gap-4 pb-1">
        <Image
          isZoomed
          src={product.image}
          alt={product.title}
          className="mx-auto h-48 w-full rounded-xl object-cover px-8"
        />
      </CardHeader>

      <CardBody className="space-y-2 p-4">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          {product.title}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          {product.shortDesc}
        </p>
        <p className="text-md font-bold text-sky-600 dark:text-sky-400">
          ${product.price}
        </p>
      </CardBody>

      <CardFooter className="p-4 pt-0">
        <Button
          as={Link}
          to={`/products/${product._id}`}
          className="rounded-xl bg-slate-900 px-8 py-3 text-white shadow-md transition-colors hover:bg-sky-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-sky-300"
          fullWidth
        >
          {t('product.viewDetails')}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;

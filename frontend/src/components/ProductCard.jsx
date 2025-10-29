import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button
} from '@heroui/react'
import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  return (
    <Card className="w-full bg-white/80 shadow-xl transition-shadow duration-200 hover:shadow-2xl dark:bg-gray-900/80">
      <CardHeader className="flex cursor-pointer flex-col items-center justify-center gap-4">
        <Image
          isZoomed
          src={product.image}
          alt={product.title}
          className="mx-auto h-48 w-full rounded-t object-cover px-10"
        />
      </CardHeader>

      <CardBody className="space-y-2 p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {product.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {product.shortDesc}
        </p>
        <p className="text-md font-bold text-indigo-600">${product.price}</p>
      </CardBody>

      <CardFooter className="p-4 pt-0">
        <Button
          as={Link}
          to={`/products/${product._id}`}
          className="rounded-lg bg-gray-950 from-cyan-600 to-indigo-600 px-8 py-3 text-white shadow-lg transition-transform hover:scale-105 dark:bg-gradient-to-r"
          fullWidth
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ProductCard

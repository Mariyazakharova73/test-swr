import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Heading,
  SimpleGrid,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import Product, { IProduct } from "./Product";
import { fetcher } from "../helpers/fetcher";
import useSWR from "swr/immutable";
import { BASE_URL_PRODUCTS } from "../utils/constants";

const ProductList = () => {
  const { data, error } = useSWR<IProduct[]>(
    BASE_URL_PRODUCTS,
    fetcher
  );

  return (
    <Stack>
      <Heading>In stock: </Heading>
      {!data ? (
        <Spinner />
      ) : (
        <SimpleGrid columns={3} spacing={4}>
          {data.map((product: IProduct) => (
            <Product {...product} key={product.id} />
          ))}
        </SimpleGrid>
      )}
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Failed to load data!</AlertTitle>
          <AlertDescription>Try later</AlertDescription>
        </Alert>
      )}
    </Stack>
  );
};

export default ProductList;


import React from "react";
import {
  Box,
  Divider,
  Flex,
  IconButton,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { IProduct } from "./Product";
import { fetcher } from "../helpers/fetcher";
import useSWR from "swr";
import { BASE_URL_CART } from "../utils/constants";

const deleteProduct = async (id: number) => {
  fetcher(`${BASE_URL_CART}/${id}`, { method: "DELETE" });
};

const Cart = () => {
  const { data, error, mutate } = useSWR<IProduct[]>(BASE_URL_CART, fetcher, {
    revalidateOnMount: false,
  });

  const totalSum = Array.isArray(data)
    ? data.reduce((total, el) => total + el.price, 0)
    : null;

  return (
    <Flex direction="column" justify="space-beetwen" h="full">
      {!data && !error && <Spinner />}
      {data && data.length > 0 ? (
        <Stack divider={<Divider />}>
          {data.map((el) => (
            <Flex key={el.id} justify="space-between">
              <Text>{el.title}</Text>
              <IconButton
                aria-label="remove from cart"
                icon={<DeleteIcon boxSize={2} />}
                size="xs"
                onClick={async () => {
                  await deleteProduct(el.id);
                  mutate(
                    data.filter((order) => order.id !== el.id),
                    { revalidate: false }
                  );
                }}
              />
            </Flex>
          ))}
        </Stack>
      ) : (
        <Text>Cart is empty</Text>
      )}
      <Box>
        <Divider />
        <Text fontWeight="bold">Total: {totalSum || 0}</Text>
      </Box>
    </Flex>
  );
};

export default Cart;

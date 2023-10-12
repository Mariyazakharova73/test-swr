import React, { FC } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useSWRConfig } from "swr";
import { BASE_URL_CART } from "../utils/constants";
import { fetcher } from "../helpers/fetcher";

export interface IProduct {
  id: number;
  title: string;
  price: number;
}

const Product: FC<IProduct> = ({ id, price, title }) => {
  const { mutate } = useSWRConfig();

  const handleAddToCart = () => {
    mutate(
      BASE_URL_CART,
      fetcher(BASE_URL_CART, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ id, title, price }),
      })
    );
  };

  return (
    <Card>
      <CardHeader>
        <Heading size="md">{title}</Heading>
      </CardHeader>
      <CardBody>
        <Text>Price: {price}</Text>
      </CardBody>
      <Divider />
      <CardFooter>
        <Button onClick={handleAddToCart}>+</Button>
      </CardFooter>
    </Card>
  );
};

export default Product;

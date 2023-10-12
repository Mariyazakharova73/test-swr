import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import Cart from "./Cart";
import { fetcher } from "../helpers/fetcher";
import useSWR from "swr";
import { BASE_URL_CART } from "../utils/constants";
import { IProduct } from "./Product";

const CartIcon = () => {
  const { data } = useSWR<IProduct[]>(BASE_URL_CART, fetcher);
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <IconButton
        position="absolute"
        right="2"
        top="2"
        colorScheme="blue"
        aria-label="open cart"
        onClick={onOpen}
        icon={<HamburgerIcon />}
        _after={{
          content: `"${data?.length || 0}"`,
          position: "absolute",
          bottom: .5,
          right: .5,
          color: "red.700",
        }}
      />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Cart</DrawerHeader>
          <DrawerBody>
            <Cart />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartIcon;

import { Container, Flex } from '@chakra-ui/react';
import CartIcon from './components/CartIcon';
import ProductList from './components/ProductList';

function App() {
  return (
    <Flex justify="center" w='full'>
      <Container>
        <CartIcon/>
        <ProductList/>
      </Container>
    </Flex>
  );
}

export default App;

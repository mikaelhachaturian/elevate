import {
  Button,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import { MdGetApp } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { Offer } from '../../pages/MortgageOffer';
import BackendAPIClient from '../../services/api-client';
import useAuth from '../../stores/auth';

interface Props {
  offer: Offer;
}

const apiClient = new BackendAPIClient('/api/offers');

const OfferInfo = ({ offer }: Props) => {
  const navigate = useNavigate();
  const userEmail = useAuth((state) => state.session?.data.email);

  const acceptOffer = async () => {
    await apiClient.post({ offer, email: userEmail });
    navigate('/');
  };
  return (
    <VStack spacing={4}>
      <HStack spacing={4}>
        <Text fontSize={'xl'}>Offer From {offer.bank}</Text>
        <TableContainer>
          <Table
            variant="simple"
            size={'lg'}
            borderWidth={1}
            borderRadius={8}
            boxShadow="lg"
          >
            <Thead>
              <Tr>
                <Th>Path</Th>
                <Th>Interest</Th>
                <Th>Monthly Fee</Th>
                <Th>Sum</Th>
                <Th>Years</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr key={'prime'}>
                <Td>Prime</Td>
                <Td>{offer.prime?.interest}</Td>
                <Td>{offer.prime?.monthlyFee}</Td>
                <Td>{offer.prime?.sum}</Td>
                <Td>{offer.prime?.years}</Td>
              </Tr>
              <Tr key={'fixed'}>
                <Td>Fixed</Td>
                <Td>{offer.fixed?.interest}</Td>
                <Td>{offer.fixed?.monthlyFee}</Td>
                <Td>{offer.fixed?.sum}</Td>
                <Td>{offer.fixed?.years}</Td>
              </Tr>
              <Tr key={'changes_every_5_years_offer'}>
                <Td>Changes Every 5 Years</Td>
                <Td>{offer.changes_every_5_years_offer?.interest}</Td>
                <Td>{offer.changes_every_5_years_offer?.monthlyFee}</Td>
                <Td>{offer.changes_every_5_years_offer?.sum}</Td>
                <Td>{offer.changes_every_5_years_offer?.years}</Td>
              </Tr>
              <Tr key={'total'}>
                <Td>
                  <Text as="b">Total</Text>
                </Td>
                <Td>-</Td>
                <Td>
                  {offer.changes_every_5_years_offer.monthlyFee +
                    offer.prime.monthlyFee +
                    offer.fixed.monthlyFee}
                </Td>
                <Td>
                  {offer.changes_every_5_years_offer?.sum +
                    offer.fixed?.sum +
                    offer.prime?.sum}
                </Td>
                <Td>-</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
        <HStack>
          <Button
            size="sm"
            bg={'#DDD8C3'}
            color={'#3E373D'}
            rightIcon={<MdGetApp />}
            onClick={acceptOffer}
          >
            Accept
          </Button>
        </HStack>
      </HStack>
    </VStack>
  );
};

export default OfferInfo;

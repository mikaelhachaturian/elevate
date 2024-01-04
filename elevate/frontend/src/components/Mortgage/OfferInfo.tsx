import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { Offer } from '../../pages/MortgageOffer';

interface Props {
  offer: Offer;
}

const OfferInfo = ({ offer }: Props) => {
  return (
    <TableContainer>
      <Table
        variant="simple"
        size={'lg'}
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
      >
        <TableCaption>Offer from {offer.bank_name}</TableCaption>
        <Thead>
          <Tr>
            <Th>Line</Th>
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
            <Td>{offer.total_years}</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default OfferInfo;

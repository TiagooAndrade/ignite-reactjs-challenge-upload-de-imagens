import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [imageUrl, setImageUrl] = useState('');

  const handleViewImage = (imgUrl: string): void => {
    setImageUrl(imgUrl);
    onOpen();
  };

  return (
    <>
      <SimpleGrid columns={3} gap="40px">
        {cards &&
          cards.map(card => (
            <Card
              viewImage={() => handleViewImage(card.url)}
              key={card.id}
              data={card}
            />
          ))}
      </SimpleGrid>

      <ModalViewImage imgUrl={imageUrl} isOpen={isOpen} onClose={onClose} />
    </>
  );
}

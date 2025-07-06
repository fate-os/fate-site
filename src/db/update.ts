import { PrismaClient } from '@prisma/client';
import moment from 'moment';

const prismaClient = new PrismaClient();

const seedQuote = async () => {
  try {
    const quoteParam7 = await prismaClient.quote_parameter.create({
      data: {
        shine: 'up',
      },
    });
    const quoteParam8 = await prismaClient.quote_parameter.create({
      data: {
        straight_left: 'down',
      },
    });

    // Then create the fate quotes with references to the quote parameters
    const fateQuotes = await prismaClient.fate_quote.createMany({
      data: [
        {
          date: moment.utc('1986-04-21 13:30:00').toDate(),
          gender: 'female',
          year_count: 60,
          quote_parameter_id: quoteParam7.id,
        },
        {
          date: moment.utc('1935-07-03 13:30:00').toDate(),
          gender: 'male',
          year_count: 1,
          quote_parameter_id: quoteParam8.id,
        },
      ],
    });

    console.log('Fate quotes created:', fateQuotes.count);
  } catch (error: any) {
    console.error('Error seeding data:', error);
    throw new Error(error);
  } finally {
    await prismaClient.$disconnect();
  }
};

seedQuote();

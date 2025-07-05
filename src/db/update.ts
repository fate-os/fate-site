import { PrismaClient } from '@prisma/client';
import moment from 'moment';

const prismaClient = new PrismaClient();

const seedQuote = async () => {
  try {
    const quoteParam1 = await prismaClient.quote_parameter.create({
      data: {
        straight_left: 'up',
        straight_right: 'up',
      },
    });

    // Then create the fate quotes with references to the quote parameters
    const fateQuotes = await prismaClient.fate_quote.createMany({
      data: [
        // {
        //   date: moment.utc('1962-10-29 00:00:00').toDate(), // October 29, 1962 UTC
        //   gender: 'male',
        //   year_count: 60,
        //   quote_parameter_id: quoteParam1.id,
        // },
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

import { PrismaClient } from '@prisma/client';
import moment from 'moment';

const prismaClient = new PrismaClient();

const updateQuote = async () => {
  try {
    const quoteParam9 = await prismaClient.quote_parameter.create({
      data: {
       has_circle:true,
       straight_left:"down"
      },
    });
    const quoteParam10 = await prismaClient.quote_parameter.create({
      data: {
        straight_left: 'up',
        has_circle:true,
      },
    });

    const quoteParam11 = await prismaClient.quote_parameter.create({
      data: {
        perpendicular: 'up',
      },
    });

    // Then create the fate quotes with references to the quote parameters
    const fateQuotes = await prismaClient.fate_quote.createMany({
      data: [
        {
          date: moment.utc('1962-10-29 13:30:00').toDate(),
          gender: 'male',
          year_count: 1,
          quote_parameter_id: quoteParam9.id,
        },
        {
          date: moment.utc('1840-05-10 11:30:00').toDate(),
          gender: 'male',
          year_count: 1,
          quote_parameter_id: quoteParam10.id,
        },
        {
          date: moment.utc('1900-04-07 01:10:00').toDate(),
          gender: 'female',
          year_count: 1,
          quote_parameter_id: quoteParam11.id,
        },
      ],
    });

    console.log('Fate quotes created:', fateQuotes.count);
  } catch (error) {
    console.error('Error seeding data:', error);
    throw new Error(error);
  } finally {
    await prismaClient.$disconnect();
  }
};

updateQuote();
